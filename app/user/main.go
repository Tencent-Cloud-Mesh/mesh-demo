package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
)

type User struct{
	UserID int64
	Vip bool
	Name string
	Info []Meshinfo
}

type Meshinfo struct {
	Service string
	Pod string
	Region string
}

var vips = map[int64]bool{1:true, 2:true, 3:true, 4:false, 5:false}
var names = map[int64]string{1:"Kevin", 2:"James", 3:"Steve", 4:"David", 5:"John"}

func main() {
	http.HandleFunc("/user", userController)
	fmt.Println("starting user service on port 7000")
	http.ListenAndServe(":7000", nil)
}

func userController(w http.ResponseWriter, r *http.Request) {
	headers := getForwardHeaders(r)

	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", headers["Origin"])
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "UserID")
		return
	}

	user := getUser(headers)

	js, err := json.Marshal(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", headers["Origin"])
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "UserID")
	w.Header().Set("Content-Type", "application/json")

	var value string
	if user.Vip == true {
		value = "vip=true"
	} else {
		value = "vip=false"
	}
	w.Header().Set("Set-Cookie", value)

	w.Write(js)
}

func getUser(headers map[string]string) User{
	userid, err := strconv.ParseInt(headers["UserID"], 10, 64)
	if err != nil {
		userid = -1
	}

	meshinfo := Meshinfo{
		Service: "user-v1",
		Pod: os.Getenv("POD_NAME"),
		Region: os.Getenv("REGION"),
	}

	user := User{
		UserID: userid,
		Vip: vips[userid],
		Name: names[userid],
		Info: []Meshinfo{meshinfo},
	}

	return user
}

func getForwardHeaders(r *http.Request) map[string]string {
	headers := make(map[string]string)
	forwardHeaders := []string{
		"UserID",
		"Origin",
	}

	for _, h := range forwardHeaders {
		if v := r.Header.Get(h); v != "" {
			headers[h] = v
		}
	}

	return headers
}
