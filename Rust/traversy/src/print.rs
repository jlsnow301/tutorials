pub fn run() {
    // Prints to console
    println!("Hello, world");

    println!("Number: {}", 1);
    println!("{} is from {}", "Jerm", "Wheeling");

    println!(
        "{0} is from {1} and {0} likes to {2}",
        "Jerm", "Wheeling", "code"
    );

    println!("{name} is from {place}", name = "Jerm", place = "Wheeling");

    // Traits
    println!("Binary {:b} Hex {:x} Octal {:o}", 10, 10, 10);

    println!("{:?}", (12, true, "Hello"));

    println!("10 + 10 = {}", 10 + 10);
}
