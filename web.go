package main

import (
  "fmt"
  "net/http"
  "os"
)

func main() {
  http.HandleFunc("/", handler)
  fmt.Println("listening @port:" + os.Getenv("PORT"))
  err := http.ListenAndServe(":"+os.Getenv("PORT"), nil)
  if err != nil {
    panic(err)
  }
}

func handler(res http.ResponseWriter, req *http.Request) {
  fmt.Fprintln(res, "Screen Capture Service!!")
}
