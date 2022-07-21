use std::env;
use std::process;

use file_reader::Config;

fn main() {
    // --snip--
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {}", err);
        process::exit(1);
    });

    if let Err(e) = file_reader::run(config) {
        // --snip--
        println!("Application error: {}", e);

        process::exit(1);
    }
}
