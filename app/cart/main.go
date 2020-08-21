package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

type CartManager struct {
	Products map[int64]map[int64]*Product
}

type Cart struct {
	Products []*Product
	Info []Meshinfo
}

type Product struct {
	Pid        int64
	Num     int64
	Stock     int64
}

type Stock struct {
	Quantity map[int64]int64
	Info []Meshinfo
}

type Meshinfo struct {
	Service string
	Pod string
	Region string
}

type Flag struct {
	Success string
}

var cartManager = CartManager{map[int64]map[int64]*Product{}}
var client = &http.Client{Timeout: 10 * time.Second}
var tracingHeaders = []string{
	"x-request-id",
	"x-b3-traceid",
	"x-b3-spanid",
	"x-b3-parentspanid",
	"x-b3-sampled",
	"x-b3-flags",
	"x-ot-span-context",
}

func main() {
	http.HandleFunc("/list", listController)
	http.HandleFunc("/clear", clearController)
	http.HandleFunc("/cart", cartController)
	fmt.Println("starting cart service on port 7000")
	http.ListenAndServe(":7000", nil)
}

func listController(w http.ResponseWriter, r *http.Request) {
	headers := getForwardHeaders(r)

	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", headers["Origin"])
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "UserID")
		return
	}

	pids := []int64{1}

	stock, err := getStock(pids, headers)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	cart := getList(r, stock)

	js, err := json.Marshal(cart)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", headers["Origin"])
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "UserID,Pid,Num")
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func getList(r *http.Request, stock Stock) Cart{
	userid := r.Header.Get("UserID")
	id, err := strconv.ParseInt(userid, 10, 64)
	if err != nil {
		id = 9
	}

	meshinfo := Meshinfo {
		Service: "cart-v1",
		Pod: os.Getenv("POD_NAME"),
		Region: os.Getenv("REGION"),
	}

	stock.Info = append(stock.Info, meshinfo)

	products := []*Product{}
	for _, value := range cartManager.Products[id] {
		products = append(products, value)
	}

	cart := Cart{
		Products: products,
		Info: stock.Info,
	}

	return cart
}

func clearController(w http.ResponseWriter, r *http.Request) {
	origin := r.Header.Get("Origin")

	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "UserID")
		return
	}

	success := "true"

	err := clearCart(r)
	if err != nil {
		success = "false"
	}

	flag := Flag{
		success,
	}

	js, err := json.Marshal(flag)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", origin)
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "UserID")
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func clearCart(r *http.Request) error {
	userid := r.Header.Get("UserID")
	id, err := strconv.ParseInt(userid, 10, 64)
	if err != nil {
		return err
	}
	delete(cartManager.Products, id)

	return nil
}

func cartController(w http.ResponseWriter, r *http.Request) {
	headers := getForwardHeaders(r)

	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", headers["Origin"])
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "UserID,Pid,Num")
		return
	}

	pid, err := strconv.ParseInt(headers["Pid"], 10, 64)
	if err != nil {
		pid = 9
	}

	pids := []int64{pid}

	stock, err := getStock(pids, headers)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	cart := getCart(headers, stock)

	js, err := json.Marshal(cart)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", headers["Origin"])
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "UserID,Pid,Num")
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func getCart(headers map[string]string, stock Stock) Cart{
	id, err := strconv.ParseInt(headers["UserID"], 10, 64)
	if err != nil {
		id = 9
	}

	pid, err := strconv.ParseInt(headers["Pid"], 10, 64)
	if err != nil {
		pid = 9
	}

	num, err := strconv.ParseInt(headers["Num"], 10, 64)
	if err != nil {
		num = 9
	}

	products := []*Product{}

	if 1 <= id && id <= 5 && 1 <= pid && pid <= 8 {
		product := Product{
			Pid: pid,
			Num: num,
			Stock: stock.Quantity[pid],
		}

		if cartManager.Products == nil {
			cartManager.Products = make(map[int64]map[int64]*Product)
		}

		if cartManager.Products[id] == nil {
			cartManager.Products[id] = make(map[int64]*Product)
		}

		cartManager.Products[id][pid] = &product

		for _, value := range cartManager.Products[id] {
			products = append(products, value)
		}
	}

	meshinfo := Meshinfo {
		Service: "cart-v1",
		Pod: os.Getenv("POD_NAME"),
		Region: os.Getenv("REGION"),
	}

	stock.Info = append(stock.Info, meshinfo)

	cart := Cart{
		Products: products,
		Info: stock.Info,
	}

	return cart
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

	reqest.Header.Add("Pids", query)
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
		"UserID",
		"Pid",
		"Num",
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