package main

import "fmt"

func main() {
	// var greetingText string = "Hello World!"
	// var greetingText = "Hello World!"
	greetingText := "Hello World!" 
	luckyNumber := 21

	evenLuckierNumber := luckyNumber + 5

	fmt.Println(luckyNumber)
	fmt.Println(greetingText)
	fmt.Println(evenLuckierNumber)

	var newNumber float64 = float64(luckyNumber) / 3

	fmt.Println(newNumber)
}
