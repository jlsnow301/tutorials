package main

import "fmt"

func main() {
	firstName := "Jerm"
	lastName := "Snow"
	fmt.Println(firstName + " " + lastName) 

	currentYear := 2021
	birthYear := 1988

	age := currentYear - birthYear
	fmt.Println(age)
}