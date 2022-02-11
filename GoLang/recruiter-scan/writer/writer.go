package writer

import (
	"encoding/csv"
	"fmt"
	"os"
)

func WriteData(data [][]string, experience_req []int) {
	// Open file
	writeFile, error := os.Create("data-amended.csv")
	if error != nil {
		panic(error)
	}
	writer := csv.NewWriter(writeFile)
	defer writer.Flush()
	
	for index, row := range data {
		appendedRow := []string{fmt.Sprint(index), row[0], row[1], row[2], fmt.Sprint(experience_req[index]), row[3]}
		writer.Write(appendedRow)
	}
}