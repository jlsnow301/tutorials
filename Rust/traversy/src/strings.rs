// Primitive strings are immutable fixed length strings in memory.
// Strings are growable, meaning they can be extended with more characters.

pub fn run() {
    let mut hello = String::from("Hello ");

    println!("Length: {}", hello.len());

    hello.push('W');

    hello.push_str("orld");

    println!("Capacity: {}", hello.capacity());
    println!("{}", hello);
}
