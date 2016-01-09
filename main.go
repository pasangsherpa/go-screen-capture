package main

import (
  "fmt"
  "net/http"
  "os"
)

func main() {
  http.HandleFunc("/", handler)
  err := http.ListenAndServe(":"+os.Getenv("PORT"), nil)
  if err != nil {
    panic(err)
  }
}

func handler(res http.ResponseWriter, req *http.Request) {
  fmt.Fprintln(res, "screen capture service!!")
}
