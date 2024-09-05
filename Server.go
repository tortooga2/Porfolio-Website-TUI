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

	e.GET("/", home)

	e.Logger.Fatal(e.Start(":5501"))

}

func home(c echo.Context) error {
	html, err := os.ReadFile("./index.html")
	if err != nil {
		return c.String(http.StatusNotFound, "Sorry, could not finish, someone here fucked up big time")
	}
	return c.HTML(http.StatusOK, string(html))
}
