package main

import (
	"net/http"
	"os"

	"github.com/pasangsherpa/go-screen-capture/Godeps/_workspace/src/github.com/gin-gonic/gin"
)

/**
 * Handler to handle request to index route
 */
func index(c *gin.Context) {
	url := c.Request.URL.Query().Get("url")
	c.String(http.StatusOK, "URL: %s", url)
}

/**
 * Handler to handle service healthcheck
 */
func pong(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

/**
 * Main function
 */
func main() {

	app := gin.Default()

	/**
	 * Setup routes
	 */
	app.GET("/", index)
	app.GET("/ping", pong)

	/**
	 * Start application
	 */
	app.Run(":" + os.Getenv("PORT"))
}
