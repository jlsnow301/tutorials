package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var reader = bufio.NewReader(os.Stdin)

func main() {
	selectedChoice, error := getUserChoice()
	if error != nil {
		fmt.Println("Invalid choice!")
	}
	if selectedChoice == "1" {
		calculateSumUpToNumber()
	} else if selectedChoice == "2" {
		calculateFactorial()
	} else if selectedChoice == "3" {
		calculateSumManually()
	} else {
		calculateListSum()
	}
}

func getUserChoice() (string, error) {
	fmt.Println("Please enter your choice")
	fmt.Println("1) Add up all numbers to the number X")
	fmt.Println("2) Build the factorial to the number X")
	fmt.Println("3) Sum up manually entered numbers")
	fmt.Println("4) Sum up a list of entered numbers")
	userInput, error := reader.ReadString('\n')
	if error != nil {
		return "", error
	}
	fmt.Print("Enter your number")
	userInput = strings.Replace(userInput, "\r\n", "", -2)
	if userInput == "1" ||
		userInput == "2" ||
		userInput == "3" ||
		userInput == "4" {
		return userInput, nil
	} else {
		return "", errors.New("invalid input")
	}

}

func getInputNumber() (int, error) {
	inputNumber, error := reader.ReadString('\n')
	if error != nil {
		return 0, error
	}
	inputNumber = strings.Replace(inputNumber, "\r\n", "", -2)
	chosenNumber, error := strconv.ParseInt(inputNumber, 0, 64)
	if error != nil {
		return 0, error
	}
	return int(chosenNumber), nil
}

func getInputNumberList() {
	fmt.Println("Please enter a comma separated list of numbers")
	inputNumberList, error := reader.ReadString('\n')
	if error != nil {
		fmt.Println("Invalid input!")
	}
	inputNumberList = strings.Replace(inputNumberList, "\n", "", -1)
	inputNumbers := strings.Split(inputNumberList, ",")
	sum := 0
	for index, value := range inputNumbers {
		fmt.Printf("Index: %v, Value %v\n", index, value)
		number, _ := strconv.ParseInt(value, 0, 64)
		if error != nil {
			continue
		}
		sum += int(number)
	}
	fmt.Printf("Result: %v\n", sum)
}

func calculateSumUpToNumber() {
	fmt.Print("Please enter your number")
	chosenNumber, error := getInputNumber()
	if error != nil {
		fmt.Println("invalid number input!")
		return
	}
	sum := 0
	for index := 1; index <= chosenNumber; index++ {
		sum = sum + index
	}
	fmt.Printf("Result: %v", sum)
}

func calculateFactorial() {
	fmt.Print("Please enter your number")
	chosenNumber, error := getInputNumber()

	if error != nil {
		fmt.Println("invalid number input!")
		return
	}
	factorial := 1

	for index := 1; index <= chosenNumber; index++ {
		factorial = factorial * index
	}
	fmt.Printf("Result: %v", factorial)
}

func calculateSumManually() {
	addingNumbers := true
	sum := 0
	fmt.Println("Enter your numbers.\nAny non integers will exit.")
	for addingNumbers {

		chosenNumber, error := getInputNumber()
		sum += chosenNumber

		addingNumbers = error == nil
	}
	fmt.Printf("Result: %v", sum)
}

func calculateListSum() {

}
