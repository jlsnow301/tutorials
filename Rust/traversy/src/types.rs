pub fn run() {
    let x: i32 = 1;

    let y: f64 = 2.5;

    let z: i64 = 454545454545;

    println!("max i32: {}", std::i32::MAX);
    println!("max i64: {}", std::i64::MAX);

    let is_active: bool = true;

    let is_greater: bool = 10 > 5;

    println!("{:?}", (x, y, z, is_active, is_greater));
}
