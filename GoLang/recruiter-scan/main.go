package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"os"
	"strings"

	"github.com/jlsnow301/tutorials/recruiter-scan/v2/interpreter"
	"github.com/jlsnow301/tutorials/recruiter-scan/v2/writer"
)

func main() {
	// Open file
	file, error := os.Open("data.csv")
	if error != nil {
		panic(error)
	}
	// Close at the end
	defer file.Close()
	reader := csv.NewReader(file)
	data, error := reader.ReadAll()
	if error != nil {
		panic(error)
	}
	// Read data
	results := interpreter.ReadData(&data) 
	fmt.Println("Processed", len(*results.Experience_req), "rows")
	fmt.Println("Could not retrieve year:", len(*results.NoExp), "rows")
	fmt.Println("The max is:", interpreter.GetMax(*results.Experience_req))
	fmt.Println("The mean is:", interpreter.GetMean(*results.Experience_req))	
	// Append the years exp to a csv
	if getUserInput("Do you wish to reprint the data? (y/n)") == "y" {
		writer.WriteData(&data, *results.Experience_req)
	}
}

// Gets the user input
func getUserInput(prompt string) string {	
	promptReader := bufio.NewReader(os.Stdin)
	fmt.Print("Do you wish to reprint the data? (y/n) ")
	writePrompt, error := promptReader.ReadString('\n')
	if error != nil {
		fmt.Println("Error reading input")
		return ""
	}

	return strings.ToLower(writePrompt)
}