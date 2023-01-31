use std::{io, ops::Add};

fn main() {
    println!("Type a word to reverse:");

    let mut input = String::new();

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    let mut reverse = String::new();
    for index in input.chars() {
        reverse.add(input.chars().nth(input.len() - index));
    }
}
