use std::{ops::Deref, sync::Mutex};

use rocket::State;

mod db;

struct DatabaseConn();

#[macro_use]
extern crate rocket;

#[get("/")]
async fn index(conn: &State<DatabaseConn>) -> &'static str {
    let _conn = conn.inner().deref();
    "Hello world"
}

#[launch]
fn rocket() -> _ {}
