#![allow(unused)]

use rand::Rng;
use std::cmp::Ordering;
use std::fs::File;
use std::io;
use std::io::{BufRead, BufReader, ErrorKind, Write};
use std::sync::Arc;

fn get_sum(x: i32) -> (i32, i32) {
    return (x + 1, x + 2);
}

fn sum_list(list: &[i32]) -> i32 {
    let mut sum = 0;
    for &val in list.iter() {
        sum += &val;
    }

    return sum;
}

fn main() {
    // Functions

    let (val_1, val_2) = get_sum(3);

    let num_list = vec![1, 2, 3, 4, 5];

    println!("Numbers: {}, {}", val_1, val_2);
    println!("Sum of list = {}", sum_list(&num_list));
}
