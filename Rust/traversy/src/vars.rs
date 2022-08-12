// Vars are immutable by default
// Rust is a block scoped language

pub fn run() {
    let name = "Jerm";
    let mut age = 33;
    println!("{} is {} years old", name, age);

    age = 34;

    println!("{} is {} years old", name, age);

    // Define constant
    const ID: i32 = 001;

    println!("ID: {}", ID);

    let (my_name, my_age) = ("Jerm", 33);

    println!("{} is {} years old", my_name, my_age);
}
