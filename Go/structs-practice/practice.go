package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type product struct {
	id          string
	title       string
	description string
	price       float64
}

func (product *product) store() {
	file, _ := os.Create(product.id)

	content := fmt.Sprintf(`ID: %v\nTitle: %v\nDescription: %v\nPrice: %v`,
	product.id, 
	product.title, 
	product.description, 
	product.price,
)

	file.WriteString(content)

	file.Close()
}

func NewProduct(id string, title string, description string, price float64) *product {
	return &product{id, title, description, price}
}

func (product *product) printData() {
	fmt.Printf("ID: %v\n", product.id)
	fmt.Printf("Title: %v\n", product.title)
	fmt.Printf("Description: %v\n", product.description)
	fmt.Printf("Proce: USD %.2f\n", product.price)
}

func main() {
	createdProduct := getProduct()

	createdProduct.printData()

	createdProduct.store()
}

func getProduct() *product {
	fmt.Println("Please enter the product data")
	fmt.Println("-----------------------------")

	reader := bufio.NewReader(os.Stdin)

	idInput := readUserInput(reader, "Product ID: ")
	titleInput := readUserInput(reader, "Product Title: ")
	descriptionInput := readUserInput(reader, "Product Description: ")
	priceInput := readUserInput(reader, "Product Price: ")
	priceValue, _ := strconv.ParseFloat(priceInput, 64)

	product := NewProduct(idInput, titleInput, descriptionInput, priceValue)

	return product

}

func readUserInput(reader *bufio.Reader, promptText string) string {
	fmt.Print(promptText)
	userInput, _  := reader.ReadString('n')
	userInput = strings.Replace(userInput, "\n", "", -1)

	return userInput
}