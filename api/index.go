package main

import (
	"fmt"

	initialize "CrypticHunt/Backend/Sandhu-Sahil/init"
)

func init() {
	initialize.InitializeSetup()
}

func main() {
	fmt.Println("Hello world")
	initialize.StartServer()
}
