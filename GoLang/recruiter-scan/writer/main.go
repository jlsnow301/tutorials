package writer

import (
	"encoding/csv"
	"fmt"
	"os"
)

/**
 * Writes the data to a csv file.
 * This adds in the values found in experience_req.
 * The format is index/date/name/email/experience_req/message
 */
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