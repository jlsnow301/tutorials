package interpreter

import (
	"math"
	"strings"
)

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