use dotenv::dotenv;
use dotenv_codegen::dotenv;

pub async fn get_conn() {
    dotenv().ok();

    let url = dotenv!("DB_URL");
}
