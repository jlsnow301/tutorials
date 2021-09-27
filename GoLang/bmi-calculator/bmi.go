package main

import (
	"fmt"

	"github.com/jermsnow/bmi/info"
)


func main() {
	info.PrintWelcome()

	// Get user input
	weight := getUserInput(info.WeightPrompt)
	height := getUserInput(info.HeightPrompt)

	// Calculate BMI
	bmi := calculateBMI(weight, height)

	// Output the calculated BMI
	fmt.Printf("Your BMI: %.2f", bmi)
}


func calculateBMI(weight float64, height float64) (float64){
	// Calculate BMI
	return weight / (height * height)
}
