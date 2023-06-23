package main

import (
	"encoding/csv"
	"fmt"
	"os"

	"github.com/jlsnow301/tutorials/golang/follower-scan/interpreter"
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
	fmt.Println("Processed", results, "numbered names")

}