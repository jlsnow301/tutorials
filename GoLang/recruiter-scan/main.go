package main

import (
	"os"

	"github.com/jlsnow301/tutorials/recruiter-scan/v2/interpreter"
)

func main() {
	// Open file
	file, error := os.Open("data.csv")
	if error != nil {
		panic(error)
	}

	// Close at the end
	defer file.Close()

	interpreter.ReadCsv(file)
}