// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::OnceLock;
use service::KafkaClient;

mod service;

static CLIENT: OnceLock<KafkaClient> = OnceLock::new();

#[derive(Debug, Clone, serde::Serialize)]
struct MyData {
    topics: Vec<String>,
}

#[tauri::command]
fn list_topics(bootstrap: &str, configs: &str) -> Result<Vec<String>, String> {
    CLIENT.get().unwrap().list_topics(bootstrap, configs)
}

#[tauri::command]
fn login_ping(bootstrap: &str, configs: &str) -> Result<bool, String> {
    CLIENT.get().unwrap().ping(bootstrap, configs)
}


fn init_client() {
    CLIENT.set(KafkaClient::new()).unwrap();
}

fn main() {
    init_client();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login_ping, list_topics])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
