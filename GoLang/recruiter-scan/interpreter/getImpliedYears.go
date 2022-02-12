package interpreter

import "strings"

// Checks key phrases for year implications
// Required: the current word, the next, and a string | following word
func getImpliedYears(curWord string, nextWord string, followingWord string) int {
	// Adds 5 years to the req experience if it contains "senior"
	if(wordIsSenior(curWord)) {
		if(wordIsProgrammer(nextWord) || followingWord != "" && wordIsProgrammer(followingWord)) {
			return 5
		}
	}
	// Get words like "junior"
	if(wordIsJunior(curWord)) {
		if(wordIsProgrammer(nextWord) || followingWord != "" && wordIsProgrammer(followingWord)) {
			// Honestly three years might be too lenient in 2022
			return 3
		}		
	}
	// Recruiters like to use "strong" in lieu of naming years, 3 is forgiving
	if(strings.Contains(curWord, "strong") || strings.Contains(curWord, "proven")){
		if(strings.Contains(nextWord, "experience")) {
			return 3
		}
	}
	// Get words like "entry level"
	if(strings.Contains(curWord, "entry") || strings.Contains(curWord, "beginner")) {
		if(strings.Contains(nextWord, "level")){
			return 1
		}
	}

	return 0
}
