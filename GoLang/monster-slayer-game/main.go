package main

import (
	"github.com/jlsnow301/monsterslayer/interaction"
)

var currentRound = 0

func main() {
	startGame()

	/** Player || Monster */
	winner := ""

	for winner == "" {
		executeRound()
	}

	endGame()
}

func startGame() {
	interaction.PrintGreeting()
}

func executeRound() string {
	currentRound++
	
	interaction.ShowActions(currentRound % 3 == 0)

	return ""
}

func endGame() {

}