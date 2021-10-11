package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	
	//isOldEnough := userAge >= 18
	userAge, error := getUserAge()

	if(error != nil) {
		fmt.Println("Invalid age!")
	}

	if (userAge >= 30 && userAge < 50)  || userAge >= 60{
		fmt.Println("You're eligible for our senior jobs!")
	} else if userAge >= 50 {
		fmt.Println("The best age!")
	} else if userAge >= 18 {
		fmt.Println("Welcome to the club!") 
	} else {
		fmt.Println("You're too inexperienced!")
	}
	
}

func getUserAge() (int, error) {
	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Please enter your age: ")
	userAgeInput, _ := reader.ReadString('\n')
	userAgeInput = strings.Replace(userAgeInput, "\r\n", "", -2)
	userAge, error := strconv.ParseInt(userAgeInput, 0, 64)

	return int(userAge), error

}