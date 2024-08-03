# Enigmas

O projeto "Enigmas" é um jogo interativo baseado em um enigma, onde os jogadores devem responder a perguntas para avançar pelas fases do jogo. O jogo exibe mensagens e interações dinâmicas com o usuário, dependendo das respostas fornecidas.

## Tecnologias Utilizadas

- **HTML**: Estrutura da página e layout do jogo.
- **CSS**: Estilização e design responsivo da interface.
- **JavaScript**: Lógica do jogo e interatividade.

## Estrutura do Projeto

- `index.html`: Arquivo principal HTML do jogo.
- `estilo.css`: Arquivo de estilo CSS para a interface do jogo.
- `principal.js`: Arquivo JavaScript que contém a lógica do jogo.
- `Epilogo.json`: Arquivo JSON que contém os dados do jogo, como diálogos e respostas.

### Interações

- **Campo de Respostas**: Digite suas respostas no campo de texto e clique no botão "->" para enviá-las.
- **Botão de Enviar**: Habilita a resposta e a navegação entre as fases do jogo.
- **Mensagens**: O jogo exibe mensagens baseadas nas respostas fornecidas e na fase atual.

## Arquivo `Epilogo.json`

O arquivo `Epilogo.json` deve ter a seguinte estrutura:

```json
{
    "introducao": [
        "Bem-vindo ao jogo de enigmas!",
        "Prepare-se para começar."
    ],
    "resposta0": [
        "resposta1",
        "resposta2"
    ],
    "titulo1": "Primeira Fase",
    "questao1": [
        "Qual é a resposta para a segunda pergunta?"
    ],
    "resposta1": [
        "resposta1",
        "resposta2"
    ]
    // Adicione mais perguntas e respostas conforme necessário
}
