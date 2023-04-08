package main

import (
	"fmt"

	initialize "CrypticHunt/Backend/Sandhu-Sahil/init"
)

func init() {
	initialize.InitializeSetup()
}

func main() {
	initialize.StartServer()
	fmt.Println("hello world")
}
