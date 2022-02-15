package interpreter

type Results struct {
	Experience_req *[]int
	NoExp          *[]int
}

/**
 * Main function for the interpreter.
 * Assuming it gets a csv file,
 * returns three arrays:
 * 		1. experience_req: an array of ints, where each int is the experience required for the corresponding row
 * 		2. noExp: an array of ints, where each int is the index of the row that could not be processed
 * 		3. listsExp: an array of ints, where each int is the index of the row that lists "experience" but could not be processed
 */
func ReadData(data *[][]string) Results {
	experience_req := []int{}
	noExp := []int{}

	// Starts scanning over the data
	for index, row := range *data {
		yearsExp := readRow(row)
		if yearsExp == 0 {
			noExp = append(noExp, index)
		}
		experience_req = append(experience_req, yearsExp)
	}

	return Results{&experience_req, &noExp}
}
