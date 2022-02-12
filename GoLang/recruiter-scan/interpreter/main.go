package interpreter

type Results struct {
	Experience_req   *[]int
	NoExp            *[]int
	Name_mispellings *[]string
	React_errors     *[]int
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
	name_mispellings := []string{}
	react_errors := []int{}

	// Starts scanning over the data
	for index, row := range *data {
		yearsExp, misspelling, reactNative := readRow(row)
		if yearsExp == 0 {
			noExp = append(noExp, index)
		}
		if yearsExp >= 7 && reactNative {
			react_errors = append(react_errors, index)
		}
		experience_req = append(experience_req, yearsExp)

		if misspelling != "" {
			name_mispellings = append(name_mispellings, misspelling)
		}
	}
	
	return Results{&experience_req, &noExp, &name_mispellings, &react_errors}
}
