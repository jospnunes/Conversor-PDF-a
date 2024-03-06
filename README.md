
# Conversor de PDF para PDF-A

Este projeto é um simples aplicativo desktop construído com [Tauri](https://tauri.app/), Ele permite converter arquivos PDF para o formato PDF/A, que é um formato otimizado para arquivamento de longo prazo. Este aplicativo utiliza o [Ghostscript](https://www.ghostscript.com/) para a conversão de arquivos.

## Recursos

- Conversão de múltiplos arquivos PDF para PDF/A.

## Pré-requisitos

Antes de executar este aplicativo, você precisa ter o Ghostscript instalado em sua máquina. O Ghostscript é usado para a conversão real dos arquivos PDF.

### Instalação do Ghostscript

- **Windows:** Baixe o instalador do [site oficial do Ghostscript](https://www.ghostscript.com/download/gsdnld.html) e siga as instruções de instalação.
- **macOS:** Você pode instalar o Ghostscript usando [Homebrew](https://brew.sh/) com o comando `brew install ghostscript`.
- **Linux:** Use o gerenciador de pacotes da sua distribuição, por exemplo, `sudo apt-get install ghostscript` para sistemas baseados em Debian/Ubuntu.

## Como Rodar o Projeto

Para executar este projeto em sua máquina local, siga os passos abaixo:

1. **Clone o Repositório**


2. **Instale as Dependências**

   Certifique-se de que você tem [Node.js](https://nodejs.org/), [Yarn](https://yarnpkg.com/) (ou npm) e todos os requisitos definidos aqui(https://tauri.app/v1/guides/getting-started/prerequisites) na sua máquina. Em seguida, execute dentro do diretorio da aplicação:

   ```bash
   yarn install
   ```

   ou se você estiver usando npm:

   ```bash
   npm install
   ```

3. **Execute o Aplicativo**

   Com o Tauri instalado e configurado no seu projeto, você pode iniciar o aplicativo em modo de desenvolvimento com o seguinte comando:

   ```bash
   yarn tauri dev
   ```

   ou, se estiver usando npm:

   ```bash
   npm run tauri dev
   ```

## Construindo o Aplicativo para Produção

Para construir uma versão de produção do aplicativo, que você pode distribuir para outros usuários, execute:

```bash
yarn tauri build
```

ou, usando npm:

```bash
npm run tauri build
```

Isso criará um pacote do aplicativo em sua plataforma atual, que pode ser encontrado no diretório `src-tauri/target/release`.


