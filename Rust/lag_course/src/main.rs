pub fn bubble_sort<T: Ord>(values: &mut [T]) {
    let mut n = values.len();
    let mut swapped;
    loop {
        swapped = false;
        for i in 1..n {
            if values[i - 1] > values[i] {
                values.swap(i - 1, i);
                swapped = true;
            }
        }
        n -= 1;
        if !swapped {
            break;
        }
    }
}

fn main() {
    let mut nums = vec![1, 3, 7, 4, 2];

    println!("{:?}", nums);
    bubble_sort(&mut nums);

    println!("nums {:?}", nums);
}
