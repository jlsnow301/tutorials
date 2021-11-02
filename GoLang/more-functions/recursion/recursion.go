package main

import "fmt"

func main() {
	fact := factorial(3)
	fmt.Println(fact)
}

func factorial(number int) int {
	if number == 0 {return 1};
	return number * factorial(number - 1)
	// result := 1

	// for index := 1; index <= number; index++ {
	// 	result = result * index
	// }

	// return result
}