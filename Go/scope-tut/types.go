package main

import "fmt"

type person struct {
	name string
	age  int
}

type customNumber int

type personData map[string]person

func (number customNumber) power(power int) customNumber {
	result := number

	for index := 1; index < power; index++  {
		result = result * number
	}
 return result
}

func CustomType() {
	var people personData = personData{
		"p1": {"Max", 32},
	}
	fmt.Println(people)
	var dummyNumber customNumber = 5
	poweredNumber := dummyNumber.power(3)
	fmt.Println(poweredNumber)
}