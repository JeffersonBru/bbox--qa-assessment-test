# Projeto Desafio BossaBox

### Instalar a dependências do projeto, executar o comando na raiz do projeto

```sh
  npm install
```
Obs: Necessário ter instalado o node: https://nodejs.org/en/download/

### Executar Testes

 - Testes WEB E2E

```sh
  npm run cy:e2e electron
```
 - Testes API

```sh
  npm run cy:api electron
```
 - Todos os testes

```sh
  npm run cy:all electron
```

- Para executar utilizando chrome:

```sh
  npm run cy:e2e chrome
  npm run cy:api chrome
  npm run cy:all chrome
```
Obs: No chrome é possível visualizar as interações no navegador em tempo de execução.

### 🛠️ Ferramentas Utilizadas

- cypress 7.4.0
- chance 1.1.7
