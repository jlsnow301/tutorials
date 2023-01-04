#![allow(unused)]

use rand::Rng;
use std::cmp::Ordering;
use std::fs::File;
use std::io;
use std::io::{BufRead, BufReader, ErrorKind, Write};

fn main() {
    let mut str1 = String::new();

    str1.push('A');

    str1.push_str(" word");

    for word in str1.split_whitespace() {
        println!("{}", word);
    }

    let str2 = str1.replace("A", "Another");
    println!("{}", str2);
}
