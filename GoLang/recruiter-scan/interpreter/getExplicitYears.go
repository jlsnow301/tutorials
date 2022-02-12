package interpreter

import (
	"fmt"
	"strconv"
	"strings"
)

// Checks phrases for typed out "number" + "year/s" combo
func getExplicitYears(curWord string, nextWord string) int {
	// No need for "5+ year" values here. We read them as 5.
	curWord = strings.Replace(curWord, "+", "", -1)
	// If the word is a range, gets the middle number
	if(strings.Contains(curWord, "-")) {				
		split := strings.Split(curWord, "-")
		num1, _ := strconv.Atoi(split[0])
		num2, _ := strconv.Atoi(split[1])
		if(num2 == 0) {
			// We can actually take 0-number as a range
			fmt.Println(curWord, nextWord)
			panic("Error: Invalid number range")
		}
		return getAverage(num1, num2)
	// If it's just a number followed by year
	} else {
		num, _ := strconv.Atoi(curWord)
		if(num == 0) {
			fmt.Println(curWord, nextWord)
			panic("Word couldn't be converted to a number")
		}
		return num
	}
}		
