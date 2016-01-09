package main

import (
	"fmt"
	"net/http"
)

func main() {
	// redirect all request to handler function
	http.HandleFunc("/", handler)
	// listen for connection at port 9000
	http.ListenAndServe(":9000", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Screen Capture Service")
}
