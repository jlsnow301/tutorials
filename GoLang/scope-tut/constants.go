package main

import "fmt"

const myName = "Jerm"
const age = 64 / 2 // allowed
// const random = rand.Int() // not allowed

const (
	inputAttack  = iota
	inputSpecial
	inputHeal
)

func Constants() {
	fmt.Println(myName)
	fmt.Println(inputAttack, inputSpecial, inputHeal, age)
}