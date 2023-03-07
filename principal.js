Pontuacao = 0;//A pontuação vai ser usado para saber se usuario acertou as respostas ou não
fase = 0;//qual fazer usuario está

function apagar(a, valor){//função para apagar a messagem ao usuario
    document.querySelector(`.${a}`).remove();//apagar a div de messagem
    document.querySelector("#respostas").value = "";//apagar o que está na aréa digitavel
    document.querySelector("#imagem").style.backgroundImage = "none";//apagar a imagem de fundo
    document.querySelector(".confete") == null ? '' : document.querySelector(".confete").remove() ;//remover os confetes caso eles existam
    valor == 'undefined' ? (Pontuacao = 0, lerArquivo('introducao'), document.querySelector("#titulo").innerHTML = 'Epilogo') : document.querySelector("#titulo").innerHTML = fase;//Alterando o titulo ou irá renciar o jogo, pois o jogador ganhou
    document.querySelector("#dialogos") = "";//limpar o que está no dialogos
    lerArquivo(`questao${Pontuacao}`);//chama a função lerAquivo para continuar o jogo
}

function lerArquivo(a){//Essa função tem como objetivo ler o arquivo json e escrever ele na tela
    let escrita = document.querySelector("#dialogos");//pega a parte onde vai ser introduzido os textos
    fetch("Epilogo.json").then((resposta) => {//Passa o json para variavel resposta
        resposta.json().then((dados) => {//Passa o json resposta para um array dados
            dados[a].map((a) => {//pega o valor dentro array que tem valor de a e passa o map que pecorrer o array
                escrita.innerHTML += `<p class="texto"> ${a} </p>`;//escrive na tela o que está dentro do array
            })
        })
    })
} 

function resposta(){//Essa função tem como objetivo verificar se a resposta do usuarios está certa ou não
    let r = document.querySelector("#respostas").value.toLowerCase();//pega a resposta do usuario e passa para que todas as letras fiquem minusculas
    let valor = `resposta${Pontuacao}`;//variavel para poder pegar o calor no array
    let compara = Pontuacao;//variavel que vai se utilizada para compara se usuario acertou a resposta

    fetch("Epilogo.json").then((resposta) => {//Passa o json para variavel resposta
        resposta.json().then((dados) => {//Passa o json resposta para um array dados
            dados[valor].map((resposta) => {//pega o valor dentro array que tem valor de valor e passa o map que pecorrer o array
                if(r == resposta){//Caso a resposta do usuario esteja correta
                    Pontuacao += 1;//a pontuação vai aumentar mostrando que acertou a resposta 
                    fase = dados[`titulo${Pontuacao}`];//variavel que amargena a fase que está o jogador
                    document.querySelector("#dialogos").innerHTML = "";//Apagando os dialos antigos
                }
            })

            if (Pontuacao == 0) {//caso o usuario não queira começar a jogar
                let msg_alerta = '<div class="alert-box" style="color: rgb(193, 250, 36);">'//variavel formata a mensagem que ira ser exibida ao usuario
                +'<h1>HAHAHA</h1>'
                +'<p><h2>Você é um covarde!</h2> </h3>Os covardes devem morrer<h3> <br>Da proxima tente aceitar o meu desavio</p>'
                +'<input style="padding:5px 10px;" type="button" value="OK" onclick="apagar(\'alert-box\',0)"/>'
                +'</div>';
                document.querySelector("#imagem").style.backgroundImage = "url('imagens/sangues.gif')";
                document.querySelector("#dialogos").innerHTML += msg_alerta;//A mensagem que ira ser exibida ao usuario
            } 
            else if (Pontuacao == compara && Pontuacao > 0) {//caso usuario erre a resposta
                let msg_alerta = '<div class="alert-box" style="color: red;">'//variavel formata a mensagem que ira ser exibida ao usuario
                +'<h1>Já era esperdo que você fosse errar</h1>'
                +'<h2>Agora será minha janta</h2>'
                +'<input style="padding:5px 10px;" type="button" value="OK" onclick="apagar(\'alert-box\',\''+fase+'\')"/>'
                +'<audio controls autoplay style="visibility: hidden; display:none;"> <source src="musica/morte.mp3" type="audio/mpeg">'
                +'</div>';
                document.querySelector("#imagem").style.backgroundImage = "url('imagens/sangues.gif')";
                document.querySelector("#dialogos").innerHTML += msg_alerta;//A mensagem que ira ser exibida ao usuario
            }
            else if (Pontuacao == 1){//Caso usuario aceite iniciar o jogo
                let msg_alerta = '<div class="alert-box" style="color: #fc782b;">'//variavel formata a mensagem que ira ser exibida ao usuario
                +'<h1>Parece que você tem um pouco de coragem ou deseja morrer mesmo</h1>'
                +'<h2>Que os jogos comecem!!!</h2>'
                +'<input style="padding:5px 10px;" type="button" value="OK" onclick="apagar(\'alert-box\',\''+fase+'\')"/>'
                +'<audio controls autoplay style="visibility: hidden; display:none;"> <source src="musica/inicio.mp3" type="audio/mpeg">'
                +'</div>';
                document.querySelector("#dialogos").innerHTML += msg_alerta;//A mensagem que ira ser exibida ao usuario
            }
            else if(Pontuacao > 1 && fase != undefined) {//caso usuario acerte
                let msg_alerta = '<div class="alert-box" style="color: rgba(75, 253, 229, 0.993);">'//variavel formata a mensagem que ira ser exibida ao usuario
                +'<h1>A certou</h1>'
                +'<h2>É que esse era fácil, o próximo será mais difícil</h2>'
                +'<input style="padding:5px 10px;" type="button" value="OK" onclick="apagar(\'alert-box\',\''+valor+'\')"/>'
                +'<audio controls autoplay style="visibility: hidden; display:none;"> <source src="musica/vitoria.mp3" type="audio/mpeg">'
                +'</div>';

                document.querySelector("#imagem").innerHTML +='<div class="confete">' //adicionar um efeito de confete
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'</div>'
                document.querySelector("#dialogos").innerHTML += msg_alerta;//A mensagem que ira ser exibida ao usuario               
            }
            else{//quando usuario acabar o jogo
                let msg_alerta = '<div class="alert-box" style="color: 04ad1bab;">'//variavel formata a mensagem que ira ser exibida ao usuario
                +'<h1>Você me ganhou</h1>'
                +'<h2>aceito minha derota, para você humano</h2>'
                +'<input style="padding:5px 10px;" type="button" value="jogar novamente" onclick="apagar(\'alert-box\',\''+fase+'\')"/>'
                +'<audio controls autoplay style="visibility: hidden; display:none;"> <source src="musica/vitoria.mp3" type="audio/mpeg">'
                +'</div>';

                document.querySelector("#imagem").innerHTML +='<div class="confete">' //adicionar um efeito de confete
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'<div class="confetti"></div>'
                +'</div>'
                document.querySelector("#dialogos").innerHTML += msg_alerta;//A mensagem que ira ser exibida ao usuario 
            }

        })
    })
}

function botao(a){//Botão de inciar o jogo ou não
    document.querySelector("#respostas").value = a;
    resposta();
}