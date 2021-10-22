package interaction

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

var reader = bufio.NewReader(os.Stdin)

func GetPlayerChoice(isSpecialRound bool) string {
	for {
		playerChoice, _ := getPlayerInput()
		if playerChoice == "1" {
			return "ATTACK"
		} else if playerChoice == "2" {
			return "HEAL"
		} else if playerChoice == "3" && isSpecialRound {
			return "SPECIAL"
		}
		fmt.Println("Fetching user input failed. Please try again")
	}
}

func getPlayerInput() (string, error) {
	fmt.Print("Your choice: ")
	userInput, error := reader.ReadString('\n')
	if error != nil {
		return "", error
	}
	userInput = strings.Replace(userInput, "\r\n", "", -2)
	return userInput, error
}
