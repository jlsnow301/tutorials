package main

import (
	"bufio"
	"fmt"
	"os"
)

var reader = bufio.NewReader(os.Stdin)

func main() {
	fmt.Println("** BMI Calculator **")
	fmt.Println("--------------------")
	// Prompt user input
	fmt.Print("Please enter your weight (kg): ")
	weightInputText, _ := reader.ReadString('\n')
	fmt.Print("Please enter your height (m): ")
	heightInputText, _ := reader.ReadString('\n')

	fmt.Print(weightInputText)
	fmt.Print(heightInputText)
}

