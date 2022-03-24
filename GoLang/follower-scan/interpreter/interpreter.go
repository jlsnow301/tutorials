package interpreter

func ReadData(data *[][]string) int {
	numberedName := 0

	// Starts scanning over the data
	for _, row := range *data {
		numberedName += readRow(row)
	}

	return numberedName
}