#![allow(unused)]

use rand::Rng;
use std::cmp::Ordering;
use std::fs::File;
use std::io;
use std::io::{BufRead, BufReader, ErrorKind, Write};

fn main() {
    let my_tuple: (u8, String, f64) = (34, "Jerm".to_string(), 50_000.00);

    println!("Name: {}", my_tuple.1);

    let (v1, v2, v3) = my_tuple;

    println!("Age: {}", v1);
}
