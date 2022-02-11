package interpreter

import (
	"fmt"
	"math"
	"regexp"
	"strconv"
	"strings"
)

func ReadData(data [][]string) ([]int, []int, []int) {
	// Get the years of experience required
	experience_req := []int{}
	noExp := []int{}
	for index, row := range data {
		number := getYearsExp(row)
		if(number == 0) {
			noExp = append(noExp, index)
		}
		experience_req = append(experience_req, number)
	}
	// Scans over noExp and detects if it mentions experience
	// Find some missing values?
	listsExp := []int{}
	for _, index := range noExp {
		if(getExpWord(data[index])) {
			listsExp = append(listsExp, index)
		}
	}

	return experience_req, noExp, listsExp
}

/** 
 * Long winded way of extracting years of experience.
 * The guts of the interpreter.
 * Handled cases: 
 * Implications like "senior developer", "junior developer", "entry level"
 * strong|proven experience", "junior react developer".
 * Explicit years like "5+ years", "3-5 years", "3 years"
 * Returns a number of years of experience or 0 if it couldn't be found
*/
func getYearsExp(row []string) int {
	detections := []int{}
	words := row[3]
	wordArray := strings.Fields(words)
	regex := regexp.MustCompile("[0-9]+[+]?")	

	for index, word := range wordArray {
		// Short words and real messages only
		if(index == 0){
			continue
		} 
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
		// Next to number only experience range. Short words only.
		if(len(curWord) > 6){
			continue
		}
		// That contain numbers		
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
	if(len(detections) == 0) {
		return 0
	} else if (len(detections) == 1) {
		return detections[0]
	} else {
		return getMax(detections)
	}	
}

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


// Returns true if the row contains the word "experience"
func getExpWord(row []string) bool {
	words := row[3]
	wordArray := strings.Fields(words)
	for _, word := range wordArray {
		if(strings.Contains(word, "experience")) {
			return true
		}
	}
	return false
}

// Returns true if the word contains "year"
func nextIsYear(word string) bool {
	return strings.Contains(word, "year")
}

// Averages two numbers
func getAverage(num1 int, num2 int) int {
	return int(math.Ceil((float64(num1) + float64(num2)) / 2))
}

// Returns the largest number in the array
func getMax(nums []int) int {
	max := 0
	for _, num := range nums {
		if(num > max) {
			max = num
		}
	}
	return max
}

// Word helpers: Returns bool if word is about programming
func wordIsProgrammer(word string) bool {
	if(strings.Contains(word, "developer")){
		return true
	} else if (strings.Contains(word, "engineer")) {
		return true
	} else if (strings.Contains(word, "programmer")) {
		return true
	} else if (word == "lead"){
		return true
	}
	return false
}

// Word helpers: Returns bool if word refers to senior position
func wordIsSenior(word string) bool {
	if(strings.Contains(word, "senior")){
		return true
	} else if (word == "sr.") {
		return true
	} else if (word == "sr") {
		return true
	} else if (word == "lead"){
		return true
	}
	return false
}

// Word helpers: Returns bool if word refers to junior position
func wordIsJunior(word string) bool {
	return strings.Contains(word, "junior") || word == "jr." || word == "jr"
}