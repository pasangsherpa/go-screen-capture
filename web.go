package main

import (
	"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"
	"os"
)

func Index(res http.ResponseWriter, r *http.Request, _ httprouter.Params) {

}

func Pong(res http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	data := map[string]interface{}{
		"response": "pong",
	}
	js, _ := json.Marshal(data)
	res.Header().Set("Content-Type", "application/json")
	res.Write(js)
}

func main() {
	router := httprouter.New()
	router.GET("/", Index)
	router.GET("/ping", Pong)

	fmt.Println("listening @port:" + os.Getenv("PORT"))
	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), router))
}
