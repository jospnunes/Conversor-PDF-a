import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import "./App.css";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [outputDirectory, setOutputDirectory] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const selectPdfFiles = async () => {
    try {
      const selected = await open({
        filters: [{ name: 'PDF', extensions: ['pdf'] }],
        multiple: true,
        title: 'Selecione arquivos PDF',
      });
      if (selected) {
        setSelectedFiles(Array.isArray(selected) ? selected : [selected]);
      }
    } catch (error) {
      alert('Erro ao selecionar arquivos: ' + error);
    }
  };

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      await invoke('convert_pdfs_to_pdfa', { inputPdfs: selectedFiles, outputDirectory });
      alert('Conversão completa');
    } catch (error) {
      alert('Erro ao converter os arquivos: ' + error);
    } finally {
      setIsConverting(false);
    }
  };

  const selectOutputDirectory = async () => {
    const selected = await open({
      directory: true,
      multiple: false,
      title: 'Selecione o diretório de saída',
    });
    if (selected) {
      setOutputDirectory(selected);
    }
  };

  return (
    <div className="container">
      <h1>Conversor de PDF para PDF/A</h1>
      <div className="input-group">
        <button onClick={selectPdfFiles} disabled={isConverting}>
          {selectedFiles.length > 0 ? "Alterar Arquivos PDF" : "Escolher Arquivos PDF"}
        </button>
        <div className="file-list">
          {selectedFiles.length > 0 && (
            <>
              <h3>Arquivos selecionados:</h3>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      
      <div className="output-group">
        <button onClick={selectOutputDirectory} disabled={isConverting}>
          Selecionar Diretório de Saída
        </button>
        <p>{outputDirectory ? `Diretório de saída: ${outputDirectory}` : "Nenhum diretório selecionado"}</p>
      </div>

      <button className="convert-button" onClick={handleConvert} disabled={isConverting || !selectedFiles.length || !outputDirectory}>
        {isConverting ? "Convertendo..." : "Converter PDFs para PDF-A"}
      </button>
    </div>
  );
}

export default App;
