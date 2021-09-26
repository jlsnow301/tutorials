package main

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/jermsnow/bmi/info"
)


func main() {
	fmt.Println(info.MainTitle)
	fmt.Println(info.Separator)
	// Prompt user input
	fmt.Print(info.WeightPrompt)
	weightInput, _ := reader.ReadString('\n')
	fmt.Print(info.HeightPrompt)
	heightInput, _ := reader.ReadString('\n')

	// Clean input
	weightInput = strings.Replace(weightInput, "\n", "", -1)
	heightInput = strings.Replace(heightInput, "\n", "", -1)

	weight, _ := strconv.ParseFloat(weightInput, 64)
	height, _ := strconv.ParseFloat(heightInput, 64)

	// Calculate BMI
	fmt.Println(weight)
	fmt.Println(height)
	bmi := weight / (height * height)

	// Output the calculated BMI
	fmt.Printf("Your BMI: %.2f", bmi)
}

