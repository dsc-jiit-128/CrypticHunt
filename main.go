package main

import (
	"fmt"

	initialize "CrypticHunt/Backend/Sandhu-Sahil/init"
	_ "github.com/heroku/x/hmetrics/onload"
)

func init() {
	initialize.InitializeSetup()
}

func main() {
	fmt.Println("Hello world")
	initialize.StartServer()
}
