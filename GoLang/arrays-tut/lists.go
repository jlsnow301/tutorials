package main

import "fmt"

// type Product struct {
// 	title string
// 	id    string
// 	price float64
// }

// Static lists
// func main() {
// 	var productNames [4]string = [4]string{"A book"}

// 	prices := [4]float64{10.99, 9.99, 45.99, 20.0}

// 	fmt.Println(prices)

// 	productNames[2] = "A carpet"
// 	fmt.Println(productNames)

// 	fmt.Println(prices[0])

// 	featuredPrices := prices[1:]
// 	featuredPrices[0] = 199.99
// 	highlightedPrices := featuredPrices[:1]

// 	fmt.Println(highlightedPrices)
// 	fmt.Println(len(featuredPrices), cap(featuredPrices))
// }

// Dynamic lists
func main() {
	prices := []float64{10.99, 8.99}

	fmt.Println(prices[0:1])

	prices[1] = 9.99
	//prices[2] = 11.99

	prices = append(prices, 5.99)
	fmt.Println(prices)
}