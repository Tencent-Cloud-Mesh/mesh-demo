package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"
)

type Order struct {
	Subtotal float64
	Shopping float64
	Point float64
	Total float64
	Success bool
	Info []Meshinfo
	Products []Product
}

type Stock struct {
	Quantity map[int64]int64
	Info []Meshinfo
}

type Cart struct {
	Products []*Product
}

type Product struct {
	Pid        int64
	Price     float64
	Num     int64
}

type Meshinfo struct {
	Service string
	Pod string
	Region string
}

var tracingHeaders = []string{
	"x-request-id",
	"x-b3-traceid",
	"x-b3-spanid",
	"x-b3-parentspanid",
	"x-b3-sampled",
	"x-b3-flags",
	"x-ot-span-context",
}

const (
	SHOPPINT = 10.0
	POINT = 10.0
)

var client = &http.Client{Timeout: 10 * time.Second}

func main(){
	http.HandleFunc("/order", orderController)
	fmt.Println("starting order-v2 service on port 7000")
	http.ListenAndServe(":7000", nil)
}

func orderController(w http.ResponseWriter, r *http.Request) {
	headers := getForwardHeaders(r)

	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", headers["Origin"])
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Cookie,Content-Type")
		return
	}

	var cart Cart
	json.NewDecoder(r.Body).Decode(&cart)

	var pids []int64
	for _, product := range cart.Products {
		pids = append(pids, product.Pid)
	}

	stock, err := getStock(pids, headers)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	order := getOrder(cart, stock)

	js, err := json.Marshal(order)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", headers["Origin"])
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Cookie,Content-Type")
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func getOrder(cart Cart, stock Stock) Order {
	success := true
	for _, product := range cart.Products {
		if product.Num > stock.Quantity[product.Pid] {
			success = false
		}
	}

	products := []Product{}
	subtotal := 0.0
	for _, product := range cart.Products {
		subtotal = subtotal + product.Price * float64(product.Num)
		products = append(products, *product)
	}

	point := POINT

	total := subtotal + SHOPPINT - point

	meshinfo := Meshinfo {
		Service: "order-v2",
		Pod: os.Getenv("POD_NAME"),
		Region: os.Getenv("REGION"),
	}

	stock.Info = append(stock.Info, meshinfo)

	return Order{
		Subtotal: subtotal,
		Shopping: SHOPPINT,
		Point: point,
		Total: total,
		Success: success,
		Info: stock.Info,
		Products: products,
	}
}

func getStock(pids []int64, headers map[string]string) (Stock, error) {
	url := fmt.Sprintf("http://stock.base.svc.cluster.local:7000/stock")
	query := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(pids)), ","), "[]")

	stock := Stock{}
	err := getJson(url, &stock, query, headers)
	return stock, err
}

func getJson(url string, target interface{}, query string, headers map[string]string) error {
	reqest, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return err
	}

	reqest.Header.Add("pids", query)
	for _, h := range tracingHeaders {
		if v := headers[h]; v != "" {
			reqest.Header.Add(h, v)
		}
	}

	response, err := client.Do(reqest)
	if err != nil {
		return err
	}

	defer response.Body.Close()

	return json.NewDecoder(response.Body).Decode(target)
}

func getForwardHeaders(r *http.Request) map[string]string {
	headers := make(map[string]string)
	forwardHeaders := []string{
		"Origin",
		"x-request-id",
		"x-b3-traceid",
		"x-b3-spanid",
		"x-b3-parentspanid",
		"x-b3-sampled",
		"x-b3-flags",
		"x-ot-span-context",
	}

	for _, h := range forwardHeaders {
		if v := r.Header.Get(h); v != "" {
			headers[h] = v
		}
	}

	return headers
}