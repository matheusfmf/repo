# Projeto React + GitHub API

Este é um projeto simples desenvolvido com **React** puro (sem frameworks como Next.js), com o objetivo de **aprofundar os conhecimentos na biblioteca React**.  
A aplicação consome a **API do GitHub** e utiliza **Styled Components** para estilização dos componentes.

## 🚀 Tecnologias Utilizadas

- React (Create React App)
- Styled Components
- Axios (para requisições HTTP)
- GitHub REST API

## 📦 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git

2. Acesse o projeto e instale as dependências:

bash
Copiar
Editar

3. Inicie o servidor de desenvolvimento:

bash
Copiar
Editar
npm start

🌐 Acesso
Após iniciar, abra o navegador em:
http://localhost:3000

⚠️ Requisições para a API do GitHub
A API do GitHub possui limite de requisições não autenticadas. Para evitar erros como 403 Forbidden, é recomendado usar um token de autenticação:

🔑 Como configurar
1. Gere um token pessoal (PAT) em:
https://github.com/settings/tokens

2. Crie um arquivo .env na raiz do projeto e adicione:

env
Copiar
Editar
REACT_APP_GITHUB_TOKEN=seu_token_aqui

3. Certifique-se de que o .env está no .gitignore para evitar subir o token para o GitHub.

4. O token será utilizado automaticamente nas requisições via Axios.