package interpreter

import (
	"regexp"
)

func getMispellings(word string) bool {
	// Regex filters for mispelled name
	re_eremiah := regexp.MustCompile("[^j]eremiah")
	re_jiremiah := regexp.MustCompile("j[^e]remiah")
	re_jerimiah := regexp.MustCompile("jer[^e]?miah")
	re_jeremeah := regexp.MustCompile("jerem[^i]ah")
	re_jeremieh := regexp.MustCompile("jeremi[^a]?h")
	re_jeremia := regexp.MustCompile("jeremia[^h]")
	re_jerimia := regexp.MustCompile("jer[^e]mia[^h]")
		
	// It's ugly but it's more performant than a loop of regex strings
	if(re_eremiah.FindAll([]byte(word), -1) != nil) {
		return true
	} else if(re_jiremiah.FindAll([]byte(word), -1) != nil) {
		return true
	} else if(re_jerimiah.FindAll([]byte(word), -1) != nil) {
		return true
	} else if(re_jeremeah.FindAll([]byte(word), -1) != nil) {
		return true
	} else if(re_jeremieh.FindAll([]byte(word), -1) != nil) {
		return true
	} else if(re_jeremia.FindAll([]byte(word), -1) != nil) {
		return true
	} else if(re_jerimia.FindAll([]byte(word), -1) != nil) {
		return true
	}

	return false
}