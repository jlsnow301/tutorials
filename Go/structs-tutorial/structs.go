package main

import (
	"bufio"
	"fmt"
	"os"
	"runtime"
	"strings"
	"time"
)

type User struct {
	firstName string
	lastName string
	birthDate string
	createdDate time.Time
}

func (user *User) outputUserDetails() {
	fmt.Printf("My name is %v %v (born on %v)", user.firstName, user.lastName, user.birthDate)
}

func NewUser(first string, last string, bday string) *User {
	user := User{
		first,
		last,
		bday,
		time.Now(),
	}
	return &user
}

var reader = bufio.NewReader(os.Stdin)

func main() {
	var newUser User

	firstName := getUserData("Please enter your first name: ")
	lastName := getUserData("Please enter your last name: ")
	birthdate := getUserData("Please enter your birthdate (MM/DD/YYYY): ")
	//created := time.Now()

	// newUser = User{
	// 	firstName: firstName, 
	// 	lastName: lastName, 
	// 	birthDate: birthdate, 
	// 	createdDate: created,
	// }

	// newUser = User{
	// 	firstName, 
	// 	lastName, 
	// 	birthdate, 
	// 	created,
	// }

	newUser = *NewUser(firstName, lastName, birthdate)

	// ... do something awesome with that gathered data!

	// outputUserDetails(&newUser)

	newUser.outputUserDetails()
	
}

func getUserData(promptText string) string {
	fmt.Print(promptText)
	userInput, _ := reader.ReadString('\n')

	var cleanedInput string;

	if runtime.GOOS == "windows" {
		cleanedInput = strings.Replace(userInput, "\r\n", "", -1)
	} else {
		cleanedInput = strings.Replace(userInput, "\n", "", -1)
	}
	return cleanedInput

}