#![allow(unused)]

use rand::Rng;
use std::cmp::Ordering;
use std::fs::File;
use std::io;
use std::io::{BufRead, BufReader, ErrorKind, Write};
use std::sync::Arc;

fn main() {
    let str3 = String::from("x r t b giogjiro ss");

    let mut v1: Vec<char> = str3.chars().collect();

    v1.sort();
    v1.dedup();

    for char in v1 {
        println!("{}", char);
    }

    let str4: &str = "Random string";

    let mut str5: String = str4.to_string();

    println!("{}", str5);

    let byte_arr = str5.as_bytes();
    let st6 = &str5[0..6];

    println!("String length: {}", st6.len());

    str5.clear();

    let str6 = String::from("Just some");
    let str7 = String::from(" words");
    let str8 = str6 + &str7;

    println!("{}", str8);

    for char in str8.bytes() {
        println!("{}", char);
    }
}
