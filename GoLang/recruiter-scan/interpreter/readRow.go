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
func readRow(row []string) int {
	detections := []int{}
	regex := regexp.MustCompile("[0-9]+")
	words := row[3]	
	yearsExp := 0
	
	// Regex filter all special characters
	filter := regexp.MustCompile("[^a-zA-Z0-9-]+")
	processedString := filter.ReplaceAllString(words, " ")
	wordArray := strings.Fields(processedString)
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
		// Start checking explicit years
		if(len(curWord) >= 6){
			continue
		}
		if(regex.FindAll([]byte(curWord), -1) == nil) {
			continue
		}
		// And are followed by the word year/s
		if(!nextIsYear(nextWord)) {
			continue
		}
		// If it's a match, extract it
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
		yearsExp = GetMax(detections)
	}

	return yearsExp
}