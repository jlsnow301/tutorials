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

	var defaultFloat float64 = 1.2345678912345678912345678
	var smallFloat float32 = 1.2345678912345678912345678

	fmt.Println(defaultFloat)
	fmt.Println(smallFloat)

	var firstRune rune = '$'
	fmt.Println(firstRune)
	fmt.Println(string(firstRune))

	var firstByte byte = '$'
	fmt.Println(firstByte)

	firstName := "Jerm"
	lastName := "Snow"
	fullName := fmt.Sprintf("%v %v", firstName, lastName)
	// Cannot mix types or parse natively?
	//fmt.Println("9" + 1)
	age := 33

	fmt.Printf("Hi, I am %v and I am %v (TYPE: %T) years old.", fullName, age, age)

}
