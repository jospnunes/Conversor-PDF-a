// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use std::path::Path;
use tauri::{command, generate_handler};

#[command]
fn convert_pdfs_to_pdfa(input_pdfs: Vec<String>, output_directory: String) -> Result<(), String> {
    for input_pdf in input_pdfs.iter() {
        let input_path = Path::new(input_pdf);
        let file_name = match input_path.file_name() {
            Some(name) => name.to_str().unwrap_or("output"),
            None => "output",
        };

        let output_pdf = format!("{}/{}.pdf", output_directory, file_name);

        let gs_command = Command::new("gswin64c")
            .args(&[
                "-dNOPAUSE",
                "-dBATCH",
                "-sDEVICE=pdfwrite",
                "-dPDFA=1",
                "-dPDFACompatibilityPolicy=1",
                "-sColorConversionStrategy=UseDeviceIndependentColor",
                "-sColorConversionStrategyForImages=UseDeviceIndependentColor",
                &format!("-sOutputFile={}", output_pdf),
                input_pdf,
            ])
            .output();

        match gs_command {
            Ok(output) => {
                if !output.status.success() {
                    let error_message = String::from_utf8_lossy(&output.stderr).to_string();
                    println!("Falha ao converter {}: {}", input_pdf, error_message);
                    return Err(format!("Falha ao converter {}: {}", input_pdf, error_message));
                }
            }
            Err(e) => return Err(format!("Falha ao iniciar GhostScript para {}: {}", input_pdf, e)),
        }
    }
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![convert_pdfs_to_pdfa])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
