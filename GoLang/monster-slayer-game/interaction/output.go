package interaction

import "fmt"

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