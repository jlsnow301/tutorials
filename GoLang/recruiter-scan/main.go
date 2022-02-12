package main

import (
	"encoding/csv"
	"fmt"
	"os"

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
	fmt.Println("Mispells 'Jeremiah':", len(*results.Name_mispellings), "rows")
	fmt.Println("Questionable React Native Requirements:", len(*results.React_errors), "rows")

	writer.WriteData(&data, *results.Experience_req)
}