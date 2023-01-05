#![allow(unused)]

use rand::Rng;
use std::cmp::Ordering;
use std::fs::File;
use std::io;
use std::io::{BufRead, BufReader, ErrorKind, Write};
use std::process::Output;
use std::sync::Arc;

use std::ops::Add;

fn get_sum_gen<Tnum: Add<Output = Tnum>>(x: Tnum, y: Tnum) -> Tnum {
    return x + y;
}

fn main() {
    // generic basics

    println!("5 + 4 = {}", get_sum_gen(5, 4));
    println!("5.2 + 4.6 = {}", get_sum_gen(5.2, 4.6));
}
