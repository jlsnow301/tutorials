package main

import "fmt"

// type Product struct {
// 	id string
// 	title string
// 	price float64
// }

func main() {
	//websites := []string{"https://www.google.com", "https://www.aws.com"}

	websites := map[string]string{
		"Google": "https://www.google.com",
		"Amazon": "https://www.aws.com",
	}

	fmt.Println(websites)
	fmt.Println(websites["Amazon"])

	websites["LinkedIn"] = "https://www.linkedin.com"
	fmt.Println(websites)

	delete(websites, "Google")
	fmt.Println(websites)
}