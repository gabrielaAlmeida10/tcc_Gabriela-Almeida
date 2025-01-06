# Bookmark Server

Um servidor em Node.js usando Express e Firebase para gerenciamento de livros e leituras.

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)


## Tecnologias Utilizadas

- Node.js
- Express
- Firebase (Firestore e Storage)
- dotenv
## Instalação

1. Clone o repositório com `git clone https://github.com/gabrielaAlmeida10/bookMark-server.git`;
2. Acesse o diretório com `cd bookMark-server`;
3. Instale as dependências com `npm install`.

## Configuração do Ambiente

1. Crie um arquivo `.env` com as variáveis do Firebase:
 -  `FIREBASE_API_KEY`;
 -  `FIREBASE_AUTH_DOMAIN`;
 -  `FIREBASE_PROJECT_ID`;
 -  `FIREBASE_STORAGE_BUCKET`;
 -  `FIREBASE_MESSAGING_SENDER_ID`;
 -  `FIREBASE_APP_ID`. 
As informações podem ser obtidas no console do Firebase.

## Executando o Projeto

1. Inicie o servidor com `npm start`.

## Estrutura do Projeto

O projeto segue a arquitetura MVC e está organizado da seguinte forma:

- `src/controllers`: Controladores que lidam com a lógica do aplicativo.
- `src/models`: Modelos que interagem diretamente com o Firebase.
- `src/routes`: Rotas para os endpoints da API.
- `src/test`: Testes automatizados do projeto.

## Funcionalidades

A API fornece endpoints para:

- Gerenciamento de usuários (registro, login, atualização de perfil e exclusão).
- Upload de arquivos e imagens para Firebase Storage.
- Gerenciamento de livros e leituras, incluindo avaliações.

## Testes Automatizados

Os testes foram configurados com Jest. Para executá-los, use o comando `npm test`.
