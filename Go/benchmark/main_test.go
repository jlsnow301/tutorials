package main

import "testing"
func BenchmarkIterators(benchmark *testing.B) {
	for index := 0; index < benchmark.N; index++ {
		forLoopIterator()
	}
}


func BenchmarkRange(benchmark *testing.B) {
	
	for index := 0; index < benchmark.N; index++ {
		rangeIterator()
	}
}