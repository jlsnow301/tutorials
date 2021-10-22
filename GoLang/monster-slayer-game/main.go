package main

import (
	"github.com/jlsnow301/monsterslayer/actions"
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
	endGame(winner)
}

func startGame() {
	interaction.PrintGreeting()
}

func executeRound() string {
	currentRound++
	isSpecialRound := currentRound%3 == 0
	interaction.ShowActions(currentRound%3 == 0)
	userChoice := interaction.GetPlayerChoice(isSpecialRound)
	var playerAttackDamage int
	var playerHealValue int
	var monsterAttackDamage int
	if userChoice == "ATTACK" {
		playerAttackDamage = actions.AttackMonster(false)
	} else if userChoice == "HEAL" {
		playerHealValue = actions.HealPlayer()
	} else {
		playerAttackDamage = actions.AttackMonster(true)
	}
	monsterAttackDamage = actions.AttackPlayer()
	playerHealth, monsterHealth := actions.GetHealthAmounts()
	roundData := interaction.RoundData{
		Action:              userChoice,
		PlayerHealth:        playerHealth,
		MonsterHealth:       monsterHealth,
		PlayerAttackDamage:  playerAttackDamage,
		PlayerHealValue:     playerHealValue,
		MonsterAttackDamage: monsterAttackDamage,
	}
	interaction.PrintRoundStatistics(&roundData)
	if playerHealth <= 0 {
		return "Monster"
	} else if monsterHealth <= 0 {
		return "Player"
	}
	return ""
}

func endGame(winner string) {
	interaction.DeclareWinner(winner)
}
