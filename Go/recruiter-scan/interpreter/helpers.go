package interpreter

import (
	"math"
	"strings"
)

// Returns true if the word contains "year"
func nextIsYear(word string) bool {
	return strings.Contains(word, "year")
}

// Averages two numbers
func getAverage(num1 int, num2 int) int {
	return int(math.Ceil((float64(num1) + float64(num2)) / 2))
}

// Returns the largest number in the array
func GetMax(nums []int) int {
	max := 0
	for _, num := range nums {
		if(num > max) {
			max = num
		}
	}
	return max
}

// Returns the mean of the array
func GetMean(nums []int) int {
	sum := 0
	intCount := 0
	for _, num := range nums {
		if(num != 0) {
			intCount++
		}
		sum += num
	}
	return int(math.Ceil(float64(sum) / float64(intCount)))
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