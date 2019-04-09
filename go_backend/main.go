package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"./handler"
)

func main(){
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/github_oauth", handler.RedirectOAuthPage)

	e.Logger.Fatal(e.Start(":9000"))
}

