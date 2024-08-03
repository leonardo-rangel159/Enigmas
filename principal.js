Pontuacao = 0; // A pontuação será usada para saber se o usuário acertou as respostas ou não
fase = 0; // Indica em qual fase o usuário está

function apagar(valor) {
    // Função para apagar as mensagens ao usuário e reiniciar o jogo, se necessário
    document.querySelector("#respostas").value = ""; // Apaga o que está na área de entrada de texto
    document.querySelector("body").style.backgroundImage = "none"; // Remove a imagem de fundo
    document.querySelector(".confete") == null ? '' : document.querySelector(".confete").remove(); // Remove os confetes, caso existam
    document.querySelector("#dialogos").innerHTML = ""; // Limpa o que está nos diálogos

    // Alterando o título ou reiniciando o jogo, se o jogador ganhou
    if (valor == 'undefined' || valor == 0) {
        lerArquivo('introducao');
        document.querySelector("#titulo").innerHTML = 'Epilogo';
    } else {
        document.querySelector("#titulo").innerHTML = fase;
        lerArquivo(`questao${Pontuacao}`); // Chama a função lerArquivo para continuar o jogo
        document.querySelector("#respostas").disabled = false;
        document.querySelector("#enviar").disabled = false;
    }
}

function lerArquivo(a) {
    // Essa função tem como objetivo ler o arquivo JSON e exibir o conteúdo na tela
    let escrita = document.querySelector("#dialogos"); // Seleciona a área onde os textos serão introduzidos
    fetch("Epilogo.json").then((resposta) => { // Obtém o arquivo JSON
        resposta.json().then((dados) => { // Converte a resposta em JSON
            dados[a].map((a) => { // Percorre o array correspondente a 'a'
                escrita.innerHTML += `<p class="texto"> ${a} </p>`; // Escreve na tela o conteúdo do array
            });
        });
    });
}

function resposta() {
    // Função para verificar se a resposta do usuário está correta ou não
    let r = document.querySelector("#respostas").value.toLowerCase(); // Obtém a resposta do usuário em letras minúsculas
    let valor = `resposta${Pontuacao}`; // Variável para acessar o valor no array
    let compara = Pontuacao; // Variável para comparar se o usuário acertou a resposta

    fetch("Epilogo.json").then((resposta) => { // Obtém o arquivo JSON
        resposta.json().then((dados) => { // Converte a resposta em JSON
            dados[valor].map((resposta) => { // Percorre o array correspondente a 'valor'
                if (r == resposta) { // Se a resposta do usuário estiver correta
                    Pontuacao += 1; // Incrementa a pontuação
                    fase = dados[`titulo${Pontuacao}`]; // Armazena a fase atual do jogador
                    document.querySelector("#dialogos").innerHTML = ""; // Limpa os diálogos antigos
                }
            });

            // Verifica a pontuação e exibe mensagens apropriadas
            if (Pontuacao === 0) {
                document.querySelector("#dialogos").innerHTML = "";
                mostrarMensagemNaoIncio(); // Mostra mensagem de erro se a pontuação for 0
            } else if (Pontuacao === compara && Pontuacao > 0) {
                document.querySelector("#dialogos").innerHTML = "";
                mostrarMensagemErro(); // Mostra mensagem de erro se a pontuação não mudou
                document.querySelector("#respostas").disabled = true;
                document.querySelector("#enviar").disabled = true;
            } else if (Pontuacao === 1) {
                mostrarMensagemInicio(); // Mostra mensagem de início se a pontuação for 1
            } else if (Pontuacao > 1 && fase !== undefined) {
                mostrarMensagemAcerto(); // Mostra mensagem de acerto se a pontuação for maior que 1 e a fase não for indefinida
            }

            // Verifica se o jogador ganhou
            if (fase === undefined) {
                mostrarMensagemGanhou(); // Mostra mensagem de vitória
            }
        });
    });

    document.querySelector("#respostas").value = ""; // Limpa a área de entrada de texto
}

function botao(a) {
    // Botão para iniciar o jogo ou não
    document.querySelector("#respostas").value = a;
    resposta();
}

function mostrarMensagemErro() {
    // Função para mostrar mensagem de erro
    let msg_alerta = `
        <div class="alert-box" style="color: red;">
            <h1 class="ti">Já era esperado que você fosse errar</h1>
            <h2 class="subT">Agora será minha janta</h2>
            <input id="nao" style="padding:5px 10px;" type="button" value="Acerte na proxima" onclick="apagar('${fase}')"/>
            <audio controls autoplay style="visibility: hidden; display:none;">
                <source src="musica/morte.mp3" type="audio/mpeg">
            </audio>
        </div>`;
    
    sangue(); // Chama a função sangue para exibir o efeito
    document.querySelector("#dialogos").innerHTML += msg_alerta;
}

function mostrarMensagemNaoIncio() {
    // Função para mostrar mensagem de erro no início
    let msg_alerta = `
        <div class="alert-box" style="color: red;">
            <h1 class="ti">Para os covardes só a morte</h1>
            <input id="nao" style="padding:5px 10px;" type="button" value="Tente novamente" onclick="apagar('${fase}')"/>
            <audio controls autoplay style="visibility: hidden; display:none;">
                <source src="musica/morte.mp3" type="audio/mpeg">
            </audio>
        </div>`;

    sangue(); // Chama a função sangue para exibir o efeito
    document.querySelector("#dialogos").innerHTML += msg_alerta;
}

function mostrarMensagemInicio() {
    // Função para mostrar mensagem de início
    let msg_alerta = `
        <div class="alert-box" style="color: #FF4500;">
            <h1 class="ti">Parece que você tem um pouco de coragem ou deseja morrer mesmo</h1>
            <h2 class="subT">Que o jogo comece!!!</h2>
            <input id="ok" type="button" value="OK" onclick="apagar('${fase}')"/>
            <audio controls autoplay style="visibility: hidden; display:none;">
                <source src="musica/inicio.mp3" type="audio/mpeg">
            </audio>
        </div>`;
    document.querySelector("#dialogos").innerHTML += msg_alerta;
}

function mostrarMensagemAcerto() {
    // Função para mostrar mensagem de acerto
    let msg_alerta = `
        <div class="alert-box" style="color: #00FF00;">
            <h1 class="ti">Acertou</h1>
            <h2 class="subT">É que esse era fácil, o próximo será mais difícil</h2>
            <input id="acertou" type="button" value="OK" onclick="apagar('resposta${Pontuacao}')"/>
        </div>`;
    document.querySelector("#dialogos").innerHTML += msg_alerta;
}

function mostrarMensagemGanhou() {
    // Função para mostrar mensagem de vitória
    let msg_alerta = `
        <div class="alert-box" style="color: #04ad1bab;">
            <h1 class="ti" style="text-shadow: 2px 4px #026102;">Você me ganhou</h1>
            <h2 class="subT">Aceito minha derrota, humano</h2>
            <input id="fim" type="button" value="jogar novamente" onclick="apagar(0)"/>
            <audio controls autoplay style="visibility: hidden; display:none;">
                <source src="musica/vitoria.mp3" type="audio/mpeg">
            </audio>
        </div>`;
    
    document.querySelector("#dialogos").innerHTML += msg_alerta;
    document.querySelector("#respostas").disabled = true;
    document.querySelector("#enviar").disabled = true;
    Pontuacao = 0; // Reseta a pontuação
}

function sangue() {
    // Função para exibir o efeito de sangue
    let body = document.querySelector("body");
    body.style.backgroundImage = "url('imagens/sangues.gif')";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";
    body.style.width = "100%";
}
