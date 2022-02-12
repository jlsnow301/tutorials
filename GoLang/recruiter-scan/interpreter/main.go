package interpreter

/**
 * Main function for the interpreter.
 * Assuming it gets a csv file,
 * returns three arrays:
 * 		1. experience_req: an array of ints, where each int is the experience required for the corresponding row
 * 		2. noExp: an array of ints, where each int is the index of the row that could not be processed
 * 		3. listsExp: an array of ints, where each int is the index of the row that lists "experience" but could not be processed
 */
func ReadData(data [][]string) ([]int, []int, []int, []string) {
	experience_req := []int{}
	noExp := []int{}
	listsExp := []int{}
	name_mispellings := []string{}
	// Starts scanning over the data
	for index, row := range data {
		if(index == 0) {
			continue
		}
		yearsExp, misspelling := readRow(row)
		if yearsExp == 0 {
			noExp = append(noExp, index)
		}
		experience_req = append(experience_req, yearsExp)

		if misspelling != "" {
			name_mispellings = append(name_mispellings, misspelling)
		}

	}
	// Scans over noExp and detects if it mentions experience	
	for _, index := range noExp {
		if getExpWord(data[index]) {
			listsExp = append(listsExp, index)
		}
	}

	return experience_req, noExp, listsExp, name_mispellings
}
