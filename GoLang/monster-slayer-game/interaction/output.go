package interaction

import (
	"fmt"
	"os"
)

type RoundData struct {
	Action              string
	PlayerAttackDamage  int
	PlayerHealValue     int
	MonsterAttackDamage int
	PlayerHealth        int
	MonsterHealth       int
}

func PrintGreeting() {
	fmt.Println("MONSTER SLAYER")
	fmt.Println("Starting a new game...")
	fmt.Println("Good luck!")
}

func ShowActions(isSpecialRound bool) {
	fmt.Println("Please choose your action")
	fmt.Println("*************************")
	fmt.Println("1) Attack")
	fmt.Println("2) Heal")
	if isSpecialRound {
		fmt.Println("3) Special Attack")
	}
}

func PrintRoundStatistics(roundData *RoundData) {
	if roundData.Action == "ATTACK" {
		fmt.Printf("Player attacked monster for %v damage\n", roundData.PlayerAttackDamage)
	} else if roundData.Action == "SPECIAL_ATTACK" {
		fmt.Printf("Player used a strong attack against monster for %v damage\n", roundData.PlayerAttackDamage)
	} else {
		fmt.Printf("Player healed for %v\n", roundData.PlayerHealValue)
	}
	fmt.Printf("Monster attacked player  for %v damage\n", roundData.MonsterAttackDamage)
	fmt.Printf("Player Health: %v\n", roundData.PlayerHealth)
	fmt.Printf("Monster Health: %v\n", roundData.MonsterHealth)
}

func DeclareWinner(winner string) {
	fmt.Println("*************************")
	fmt.Println("GAME OVER!")
	fmt.Println("*************************")
	fmt.Printf("%v won!\n", winner)
}

func WriteLogFile(rounds *[]RoundData) {
	file, error := os.Create("gamelog.txt")
	if error != nil {
		fmt.Println("Saving log file failed. Exiting.")
	}
	for index, value := range *rounds {
		logEntry := map[string]string{
			"Round":                 fmt.Sprint(index + 1),
			"Action":                value.Action,
			"Player Attack Damage":  fmt.Sprint(value.PlayerAttackDamage),
			"Player Heal Value":     fmt.Sprint(value.PlayerHealValue),
			"Monster Attack Damage": fmt.Sprint(value.MonsterAttackDamage),
			"Player Health":         fmt.Sprint(value.PlayerHealth),
			"Monster Health":        fmt.Sprint(value.MonsterHealth),
		}
		logLine := fmt.Sprintln(logEntry)
		_, error = file.WriteString(logLine)
		if error != nil {
			fmt.Println("Writing into log file failed. Exiting.")
			continue
		}
		file.Close()
		fmt.Println("Wrote data to log.")
	}
}
