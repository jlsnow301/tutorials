package interpreter

import (
	"encoding/csv"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func ReadCsv(file *os.File) ([]int, []int, []int) {
	// Read using csv reader
	reader := csv.NewReader(file)
	data, error := reader.ReadAll()
	if error != nil {
		panic(error)
	}

	experience_req := []int{}
	noExp := []int{}
	for index, row := range data {
		number := getYearsExp(row)
		if(number == 0) {
			noExp = append(noExp, index)
		}
		experience_req = append(experience_req, number)
	}

	fmt.Println("Processed", len(experience_req), "rows")
	fmt.Println("Could not retrieve year:", len(noExp), "rows")

	// Scans over noExp and detects if it mentions experience
	// Find some missing values?
	listsExp := []int{}
	for _, index := range noExp {
		if(getExpWord(data[index])) {
			listsExp = append(listsExp, index)
		}
	}

	fmt.Println("Lists 'experience' but could not retrieve year:", len(listsExp), "rows")

	return experience_req, noExp, listsExp
}

// Long winded way of extracting years of experience
func getYearsExp(row []string) int {
	detections := []int{}
	words := row[3]
	wordArray := strings.Fields(words)
	regex := regexp.MustCompile("[0-9]")	

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
		// Adds 5 years to the req experience if it contains "senior"
		if(curWord == "senior" || curWord == "sr." || curWord == "sr" || curWord == "lead") {
			if(nextWord == "developer" || nextWord == "programming" || nextWord == "programmer") {
				detections = append(detections, 5)
				continue
			}
			// Don't want any out of bounds issues
			if(index < len(wordArray) - 2) {
				followingWord := strings.ToLower(wordArray[index + 2])
				if(followingWord == "developer" || followingWord == "programming" || followingWord == "programmer") {
					detections = append(detections, 5)
					continue
				}
			}
		}
		// Recruiters like to use "strong" in lieu of naming years, 3 is forgiving
		if(curWord == "strong" || curWord == "proven"){
			if(nextWord == "experience" || nextWord == "exp") {
				detections = append(detections, 3)
				continue
			}
		}
		// Finds short words
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
		// No need for "5+ year" values here. We read them as 5.
		curWord = strings.Replace(curWord, "+", "", -1)
		// If the word is a range, gets the middle number
		if(strings.Contains(curWord, "-")) {				
			split := strings.Split(curWord, "-")
			num1, _ := strconv.Atoi(split[0])
			num2, _ := strconv.Atoi(split[1])
			detections = append(detections, getAverage(num1, num2))
		// If it's just a number followed by year
		} else {
			num, _ := strconv.Atoi(curWord)
			if(num > 0) {
				detections = append(detections, num)
			} else {
				panic("Word couldn't be converted to a number")
			}
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
	return (num1 + num2) / 2
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

