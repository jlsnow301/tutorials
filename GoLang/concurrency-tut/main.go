package main

import (
	"math/rand"
	"time"
)

var source = rand.NewSource(time.Now().Unix())
var randN = rand.New(source)

func main() {
	channelX := make(chan int)
	channelY := make(chan int)

	limiter := make(chan int, 3)

	go generateValue(channelX, limiter)
	go generateValue(channelY, limiter)

	select {
	case result := <- channelX:
		println("X: ", result)
	case result := <- channelY:
		println("Y: ", result)
	}
	// go generateValue(channel, limiter)
	// go generateValue(channel, limiter)

	// x := <- channel
	// y := <- channel
	// sum := x + y

	// sum := 0
	// index := 0

	// for num := range channel {
	// 	sum += num
	// 	index++
	// 	if(index == 4) {
	// 		close(channel)
	// 	}
	// }

	// fmt.Println(sum)
}

func generateValue(channel chan int, limit chan int) int {
	limit <- 1
	sleepTime := randN.Intn(3)
	time.Sleep(time.Duration(sleepTime) * time.Second)

	result := randN.Intn(10)
	channel <- result
	<- limit
	// close(channel)
	return result
}

// func main() {
// 	greet()
// 	storeData("This is some dummy data!", "dummy-data.txt")

// 	channel := make(chan int)

// 	go storeMoreData(50000, "50000_1.txt", channel)
// 	go storeMoreData(50000, "50000_2.txt", channel)

// 	<-channel
// 	<-channel
// }

// func greet() {
// 	fmt.Println("Hi there!")
// }

// func storeData(storableText string, fileName string) {
// 	file, err := os.OpenFile(fileName,
// 		os.O_CREATE|os.O_APPEND|os.O_WRONLY,
// 		0666,
// 	)

// 	if err != nil {
// 		fmt.Println("Creating the file failed. Exiting.")
// 		return
// 	}

// 	defer file.Close()

// 	_, err = file.WriteString(storableText)

// 	if err != nil {
// 		fmt.Println("Writing to the file failed.")
// 	}
// }

// func storeMoreData(lines int, fileName string, c chan int) {
// 	for i := 0; i < lines; i++ {
// 		text := fmt.Sprintf("Line %v - Dummy Data\n", i)
// 		storeData(text, fileName)
// 	}

// 	fmt.Printf("-- Done storing %v lines of text --\n", lines)
// 	c <- 1
// }