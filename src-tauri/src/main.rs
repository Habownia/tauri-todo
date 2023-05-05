// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;
use std::io::Write;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn save_file(text: Vec<&str>){
    // for()
    //! nauczyć się tablic w ruscie
    let text = "";
    let mut file = File::create("example.txt").expect("Nie można utworzyć pliku");
    file.write_all(text.as_bytes()).expect("Nie można zapisać do pliku");
    println!("Tekst został zapisany do pliku!");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![save_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
