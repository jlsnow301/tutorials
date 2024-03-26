use std::{
    io::{self, Read},
    ops::Add,
};

fn main() {
    println!("Type a word to reverse:");

    let input = prompt_user_input().unwrap_or("".to_string());

    let reverse = reverse(&input);

    println!("Reversed: {}", reverse.trim())
}

fn prompt_user_input() -> Result<String, String> {
    let mut input = String::new();

    // Read input from user or empty string if error
    io::stdin()
        .read_line(&mut input)
        .map(|_| input.trim().to_string())
        .or_else(|_| Ok("".to_string()))
}

fn reverse(input: &str) -> String {
    let mut reversed = String::new();

    for (index, _ch) in input.chars().enumerate() {
        reversed = input.chars().nth(index).unwrap().to_string().add(&reversed);
    }

    reversed
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_reverse() {
        assert_eq!("olleH", reverse("Hello"));
    }

    #[test]
    fn test_input() {
        assert_eq!("Hello", prompt_user_input().unwrap());
    }
}
