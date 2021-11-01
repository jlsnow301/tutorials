package main

import "fmt"

var userName = "Jerm"

func main() {
	shouldContinue := true
	userName = "Jeremiah" // Shadow higher level variable
	if shouldContinue {
		userAge := 33
		fmt.Printf("Name: %v, Age: %v", userName, userAge)
	}
	// fmt.Println(userAge) scope issue

	printData()
	makeVars()

	CustomType()
	Constants()
}

func printData() {
	fmt.Println(userName)
	// fmt.Println(shouldContinue) scope issue
}

func makeVars() {
	// New and make
	number := new(int)
	fmt.Println(number)
	fmt.Println(*number)
	anotherNumber := 0
	numberAddress := &anotherNumber
	fmt.Println(numberAddress)
	// hobbies := []string{"Sports", "Reading"}
	hobbies := make([]string, 2, 10)
	moreHobbies := new([]string)
	// evenMoreHobbies := []string{} // make([]string)
	// aMap := make(map[string]int, 5)
	hobbies[0] = "Sports"
	hobbies[1] = "Reading"
	// hobbies[2] = "Cooking" only initialized 2
	*moreHobbies = append(*moreHobbies, "Sports")
	//hobbies = append(hobbies, "Cooking", "Dancing")
	fmt.Println(hobbies)
	// fmt.Println(moreHobbies) Gets reference
	fmt.Println(*moreHobbies)
}