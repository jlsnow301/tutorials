package main

func main() {

	maxNums := [5000]int{}
	for num := 0; num < 5000; num++ {
		maxNums[num] = num
	}
}

func forLoopIterator(maxNum int) int {
	final := 0
	for index := 0; index < maxNum; index++ {
		final = index
	}
	return final
}

func rangeIterator(maxNum [5000]int) int {
	final := 0
	for _, value := range maxNum {
		final = value
	}
	return final
}