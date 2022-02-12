package interpreter

import (
	"regexp"
	"strings"
)

/**
 * Long winded way of extracting years of experience.
 * The guts of the interpreter.
 * Handled cases:
 * Implications like "senior developer", "junior developer", "entry level"
 * strong|proven experience", "junior react developer".
 * Explicit years like "5+ years", "3-5 years", "3 years"
 * Returns a number of years of experience or 0 if it couldn't be found
 */
func readRow(row []string) (int, string, bool) {
	detections := []int{}
	mispelling := ""
	reactNative := false
	words := row[3]
	wordArray := strings.Fields(words)
	regex := regexp.MustCompile("[0-9]+[+]?")
	yearsExp := 0

	// Start scanning over the words in the row
	for index, word := range wordArray {
		if(index == len(wordArray) - 1) {
			break
		}
		curWord := strings.ToLower(word)
		nextWord := strings.ToLower(wordArray[index + 1])
		followingWord := ""
		if(index < len(wordArray) - 2) {
			followingWord = strings.ToLower(wordArray[index + 2])
		}
		// Start checking implied years. A little political, but lenient
		matchPhrase := getImpliedYears(curWord, nextWord, followingWord)
		if(matchPhrase != 0) {
			detections = append(detections, matchPhrase)
			continue
		}

		if(len(curWord) >= 10){
			continue
		}
		// Get mispellings
		if(len(curWord) > 6 && len(curWord) < 10) {
			if(getMispellings(curWord)) {
				mispelling = curWord
			}
			continue
		}
		if(strings.Contains(curWord, "react")) {
			if(strings.Contains(nextWord, "native")) {
				reactNative = true
			}
		}
		if(regex.FindAll([]byte(curWord), -1) == nil) {
			continue
		}
		// And are followed by the word year/s
		if(!nextIsYear(nextWord)) {
			continue
		}
		// Start checking numbered years.
		matchNumbers := getExplicitYears(curWord, nextWord)
		if(matchNumbers != 0) {
			detections = append(detections, matchNumbers)
			continue
		}

	}

	// Returns the experience required.
	if (len(detections) == 1) {
		yearsExp = detections[0]
	} else {
		yearsExp = getMax(detections)
	}
	return yearsExp, mispelling, reactNative
}