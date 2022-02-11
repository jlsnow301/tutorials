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

	experience_req, noExp, listsExp := interpreter.ReadData(data)

	fmt.Println("Processed", len(experience_req), "rows")
	fmt.Println("Could not retrieve year:", len(noExp), "rows")
	fmt.Println("Lists 'experience' but could not retrieve year:", len(listsExp), "rows")

	writer.WriteData(data, experience_req)
}