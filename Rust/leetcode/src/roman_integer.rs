pub struct Solution;

impl Solution {
    pub fn roman_to_int(s: String) -> i32 {
        let mut number = 0;
        let chars: Vec<char> = s.chars().collect();

        let mut i = 0;
        while i < chars.len() {
            match chars[i] {
                'I' if chars.get(i + 1) == Some(&'V') => {
                    number += 4;
                    i += 2;
                }
                'I' if chars.get(i + 1) == Some(&'X') => {
                    number += 9;
                    i += 2;
                }
                'X' if chars.get(i + 1) == Some(&'L') => {
                    number += 40;
                    i += 2;
                }
                'X' if chars.get(i + 1) == Some(&'C') => {
                    number += 90;
                    i += 2;
                }
                'C' if chars.get(i + 1) == Some(&'D') => {
                    number += 400;
                    i += 2;
                }
                'C' if chars.get(i + 1) == Some(&'M') => {
                    number += 900;
                    i += 2;
                }
                'I' => {
                    number += 1;
                    i += 1;
                }
                'V' => {
                    number += 5;
                    i += 1;
                }
                'X' => {
                    number += 10;
                    i += 1;
                }
                'L' => {
                    number += 50;
                    i += 1;
                }
                'C' => {
                    number += 100;
                    i += 1;
                }
                'D' => {
                    number += 500;
                    i += 1;
                }
                'M' => {
                    number += 1000;
                    i += 1;
                }
                _ => {
                    i += 1;
                }
            }
        }
        number
    }
}

pub fn roman_integer() {
    assert_eq!(Solution::roman_to_int(String::from("XXVII")), 27)
}
