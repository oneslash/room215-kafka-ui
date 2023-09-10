// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use service::{KafkaClient, Topic};
use std::{collections::HashMap, sync::OnceLock};
use tauri::Manager;
use tokio::sync::{mpsc, Mutex};
use tracing::warn;

mod service;

static CLIENT: OnceLock<KafkaClient> = OnceLock::new();

#[derive(Debug, Clone, serde::Serialize)]
struct MyData {
    topics: Vec<String>,
}

#[tauri::command]
async fn list_topics(bootstrap: &str, configs: &str) -> Result<Vec<Topic>, String> {
    CLIENT.get().unwrap().list_topics(bootstrap, configs)
}

#[tauri::command]
fn login_ping(bootstrap: &str, configs: &str) -> Result<bool, String> {
    CLIENT.get().unwrap().ping(bootstrap, configs)
}

#[tauri::command]
async fn get_events(
    bootstrap: &str,
    configs: &str,
    topic: &str,
    state: tauri::State<'_, AsyncProcInputTx>,
) -> Result<(), String> {
    warn!("get_events");
    let asynx_proc_input_tx = state.inner.lock().await;
    let event = AppEvent {
        name: "get_events".to_string(),
        data: [
            ("bootstrap".to_string(), bootstrap.to_string()),
            ("configs".to_string(), configs.to_string()),
            ("topic".to_string(), topic.to_string()),
        ]
        .iter()
        .cloned()
        .collect(),
    };
    let event_string = serde_json::to_string(&event).unwrap();
    asynx_proc_input_tx
        .send(event_string)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

fn init_client() {
    CLIENT.set(KafkaClient::new()).unwrap();
}

async fn send_events<R: tauri::Runtime>(
    data: HashMap<String, String>,
    app_handle: tauri::AppHandle<R>,
) {
    let bootstrap = data.get("bootstrap").unwrap();
    let configs = data.get("configs").unwrap();
    let topic = data.get("topic").unwrap();

    loop {
        let topic = CLIENT
            .get()
            .unwrap()
            .get_events(bootstrap, configs, topic)
            .await
            .unwrap();
        warn!("topic: {:?}", topic);

        app_handle
            .emit_all("topics", topic)
            .expect("failed to emit event");
    }
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct AppEvent {
    name: String,
    #[serde(flatten)]
    data: HashMap<String, String>,
}

async fn match_event<R: tauri::Runtime>(input: String, app_handle: tauri::AppHandle<R>) {
    let event: AppEvent = serde_json::from_str(&input).unwrap();
    match event.name.as_str() {
        "get_events" => send_events(event.data, app_handle).await,
        _ => {}
    }
}

/// The input type for the async process.
/// inner is basically a json but in string
struct AsyncProcInputTx {
    inner: Mutex<mpsc::Sender<String>>,
}

fn main() {
    init_client();
    tracing_subscriber::fmt::init();
    let (async_proc_input_tx, async_proc_input_rx) = mpsc::channel(1);
    let (async_proc_output_tx, mut async_proc_output_rx) = mpsc::channel(1);

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            login_ping,
            list_topics,
            get_events
        ])
        .manage(AsyncProcInputTx {
            inner: Mutex::new(async_proc_input_tx),
        })
        .setup(|app| {
            let app_handle = app.handle();
            tauri::async_runtime::spawn(async move {
                let _ = async_process_model(async_proc_input_rx, async_proc_output_tx).await;
            });

            tauri::async_runtime::spawn(async move {
                loop {
                    if let Some(output) = async_proc_output_rx.recv().await {
                        match_event(output, app_handle.clone()).await;
                    }
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn async_process_model(
    mut input_rx: mpsc::Receiver<String>,
    output_tx: mpsc::Sender<String>,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    while let Some(input) = input_rx.recv().await {
        let output = input;
        output_tx.send(output).await?;
    }

    Ok(())
}
