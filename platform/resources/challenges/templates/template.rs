#![allow(dead_code,unused_variables)]

use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    %%_INSERTVALUES_%%

    // write your solution here
}
