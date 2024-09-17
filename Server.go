package main

import (
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())

	e.Static("/", "./static")

	e.Use(setNoCacheHeaders)

	e.GET("/", home)

	e.Logger.Fatal(e.Start(":5501"))

}

// Custom middleware to set cache headers
func setNoCacheHeaders(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Set no-cache headers
		c.Response().Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0")
		c.Response().Header().Set("Pragma", "no-cache")
		c.Response().Header().Set("Expires", "0")

		return next(c)
	}
}

//Some new stuff

func home(c echo.Context) error {
	html, err := os.ReadFile("./index.html")
	if err != nil {
		return c.String(http.StatusNotFound, "Sorry, could not finish, someone here fucked up big time")
	}
	return c.HTML(http.StatusOK, string(html))
}
