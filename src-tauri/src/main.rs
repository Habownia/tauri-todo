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
fn save_file(data: Vec<&str>) -> &str {
    let mut text = String::new();
    // tworzymy iterator na wektorze i enumerujemy go robiąc destrukturyzację tworząc "i" i "elem"
    for (i, elem) in data.iter().enumerate() {
        let index_of_line = i + 1;
        // formatujemy na styl "1. Foo bar"
        let mut line = format!("{index_of_line}. {elem}");
        // Jeśli to ostania linijka to nie dodajemy \n
        line += if i != data.len() - 1 {"\n"} else {""};
        // sklejamy wszystko w kupę
        text += &line
    }

    // tworzy plik/nadpisuje w dir /src-tauri
    let mut file =
                File::create("example.txt")
                // dodajemy expect żeby obsłużyć błąd i z typu Result<File, Error> wyciągnąć Error
                .expect("Nie można utworzyć pliku");

    file
    // write_all() -> zapisuje ciąg bajtów (ASCII, UTF8) do pliku
    // as_bytes() -> konwertuje string  
        .write_all(text.as_bytes())
        .expect("Nie można zapisać do pliku");

    return "Zapisano!"
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![save_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
