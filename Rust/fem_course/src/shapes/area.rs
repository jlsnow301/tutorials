pub trait Area {
    fn area(&self) -> f64;
}

impl Area for f64 {
    fn area(&self) -> f64 {
        self * self
    }
}
