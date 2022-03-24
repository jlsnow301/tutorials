package interpreter

import (
	"fmt"
	"regexp"
)

func readRow(row []string) int {
	
	letterNumber := regexp.MustCompile(`[0-9]{3,}$`)
	username := row[1]
	if letterNumber.MatchString(username) {
		fmt.Println(username)
		return 1
	}
	return 0
}