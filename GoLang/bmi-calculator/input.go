package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var reader = bufio.NewReader(os.Stdin)

func getUserInput(promptText string) (value float64) {
	fmt.Print(promptText)

	userInput, _ := reader.ReadString('\n')
	userInput = strings.Replace(userInput, "\n", "", -1)	
	value, _ = strconv.ParseFloat(userInput, 64)

	return
}