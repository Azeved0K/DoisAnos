let perguntasFeitas = [];

const perguntas = [

    // Pergunta 1
    {
        pergunta: "Qual desses empregos eu nunca trabalhei?",
        respostas: ["Montador de Sofás", "Estampador de Serigrafia", "Programador", "Designer Gráfico"],
        correta: "resp3",
        imagem: "./_imgs/4-Designer.png",
        texto: "Barman é o profissional do ramo da coquetelaria, que trabalha em estabelecimentos comerciais servindo coquetéis (misturados com bebidas alcoólicas ou não) aos clientes, mais frequentemente em bares."
    },
    // Pergunta 2
    {
        pergunta: "O que comemos no nosso primeiro encontro?",
        respostas: ["Pizza", "Sanduíche do Subway", "Hamburguer do Giraffas", "Poke"],
        correta: "resp2",
        imagem: "./_imgs/3-HamburguerGiraffas.png",
        texto: "E eu tava morrendo de vergonha, minha nossa..."
    },
    // Pergunta 3
    {
        pergunta: "Que dia e mês demos o nosso primeiro beijo?",
        respostas: ["24 de Junho", "24 de Abril", "24 de Maio", "25 de Maio"],
        correta: "resp1",
        imagem: "./_imgs/3-Beijo.png",
        texto: "ato ou efeito de tocar, pressionando, os lábios sobre pessoa, animal ou objeto querido ou com valor simbólico, ger. para demonstrar carinho, afeto etc."
    },
    // Pergunta 4
    {
        pergunta: "Qual o primeiro presente que te dei?",
        respostas: ["Saia de Brilho", "Jantar", "Cesta de Chocolate", "Tenis"],
        correta: "resp2",
        imagem: "./_imgs/4-Chocolate.png",
        texto: "Se tiver dúvidas, olha pro dia 23 de junho de 2023 na tua galeria"
    },
    // Pergunta 5
    {
        pergunta: "Qual o meu filme favorito?",
        respostas: ["Tropa de Elite", "O Lutador", "Jobs", "A Rede Social"],
        correta: "resp3",
        imagem: "./_imgs/5-Rede-Social.png",
        texto: "Em uma noite de outono em 2003, o estudante de Harvard e gênio da computação Mark Zuckerberg se senta em seu computador e começa a trabalhar em um novo conceito que acaba se transformando em uma rede social global."
    },
    // Pergunta 6
    {
        pergunta: "Qual foi o meu primeiro carro?",
        respostas: ["Astra", "Polo", "Gol", "Tiida"],
        correta: "resp0",
        imagem: "./_imgs/0-Astra.jpg",
        texto: "Com toda certeza, andava muito mais que o golzinho..."
    },
    // Pergunta 7
    {
        pergunta: "Qual meu maior medo?",
        respostas: ["Aranha", "Escuro", "Altura", "Gato"],
        correta: "resp2",
        imagem: "./_imgs/7-Altura.png",
        texto: "A fobia de altura pode não ter só fundo emocional: um novo estudo sugere que as pessoas com esse medo, chamado acrofobia, também têm alterações no equilíbrio postural."
    },
    // Pergunta 8
    {
        pergunta: "Qual o meu maior idolo?",
        respostas: ["Mark Zuckenberg", "Michael Jackson", "Neymar Jr", "Steve Jobs"],
        correta: "resp3",
        imagem: "./_imgs/8-Jobs.png",
        texto: "Steven Paul Jobs foi um inventor, empresário e magnata americano no setor da informática. Notabilizou-se como co-fundador, presidente e diretor executivo da Apple Inc. e por revolucionar seis indústrias: computadores pessoais, filmes de animação, música, telefones, tablets e publicações digitais."
    },
    // Pergunta 10
    {
        pergunta: "Qual meu jogo de PC favorito?",
        respostas: ["League of Legends", "CS:GO", "Tibia", "Dota"],
        correta: "resp2",
        imagem: "./_imgs/10-Tibia.png",
        texto: "Tibia é um jogo eletrônico de RPG multijogador gratuito, desenvolvido pela CipSoft. Criado em 1997, é um dos jogos mais antigos do gênero."
    },
    // Pergunta 11
    {
        pergunta: "",
        respostas: ["League of Legends", "CS:GO", "Tibia", "Dota"],
        correta: "resp2",
        imagem: "./_imgs/10-Tibia.png",
        texto: "hidxqs sshdc iuhwschhisiwsdhgciuh idgciwdhg digwugdcwuh ivefjipjveufi"
    }
]

var qtdPergunta = perguntas.length - 1;

function gerarPergunta(maxPerguntas) {
    // Numero Aleatório
    let numAleatorio = Number(Math.random() * maxPerguntas).toFixed()

    if (!perguntasFeitas.includes(numAleatorio)) {

        //Colocar como pergunta feita
        perguntasFeitas.push(numAleatorio)

        //preencher html com os dados da questão    
        var p_sele = perguntas[numAleatorio].pergunta

        //alimentar pergunta vinda do sorteio
        $('#pergunta').html(p_sele);
        $('#pergunta').attr('data-index', numAleatorio);


        for (let i = 0; i < perguntas[numAleatorio].respostas.length; i++) {
            $('#resp' + i).html(perguntas[numAleatorio].respostas[i]);
        }

        $('#pergunta').html(p_sele);

        //Embaralhar Respostas
        let container = $('#respostas');
        var options = container.children();

        for (let i = 0; i < options.length; i++) {
            container.append(options.eq(Math.floor(Math.random() * options.length)));
        }

    } else { //Se a perguntab ja foi feita!!!
        console.log('pergunta ja foi feita!!')
        if (perguntasFeitas.length < qtdPergunta + 1) {
            return gerarPergunta(maxPerguntas)
        } else {
            $('main').addClass('hidden');
            $('#status h2#game-over').remove();
            $('#status').removeClass('hidden');
            $('#game-over').html('Parabéns! Você venceu!');
        }
    }
}

$(".resp").click(function () {
    if ($('#quiz').attr('data-status') !== 'travado') {
        //Percorrer Respostas e Desmarcar a Classe
        $(".resp").each(function () {
            if ($(this).hasClass('selecionada')) {
                $(this).removeClass('selecionada');
            }
        });

        // Adicionar Classe Selecionada
        $(this).addClass('selecionada');
    }

});

$('#confirmar').click(function (e) {
    e.preventDefault();

    //Pegar indice da pergunta
    let indX = $('#pergunta').attr('data-index');

    //Qual a resposta certa
    let respCorreta = perguntas[indX].correta;
    let imgCerta = `<img src="${perguntas[indX].imagem}" alt="Imagem Barman resposta 1">`
    let textoCerto = perguntas[indX].texto

    //Qual a resposta que o usuario selecionou
    $('.resp').each(function () {
        if ($(this).hasClass('selecionada')) {
            let respEscolhida = $(this).attr('id');

            //Resultado da seleção

            // Correta
            if (respCorreta == respEscolhida) {
                console.log('Certa Resposta!!!')
                $('#' + respEscolhida).addClass('correta');
                $('div#imgCorreta').prepend(imgCerta)
                $('div#imgCorreta').removeClass('hidden')
                $('div#textoCorreta').removeClass('hidden')
                $('div#textoCorreta').prepend(`<p>${textoCerto}<p>`)
                $('#quizContainer').addClass('hidden')
                $('#proxPergunta').removeClass('hidden');
                resetaBotoes()

                // Errada    
            } else {
                console.log('Errrrrrrooouuuu')
                $('#quiz').attr('data-status', 'travado');
                $('#' + respCorreta).addClass('correta');
                $('#' + respEscolhida).removeClass('selecionada');
                $('#' + respEscolhida).addClass('errada');
                $('#confirmar').addClass('hidden');
                setTimeout(function () {
                    gameOver()
                }, 3500)
            }
        }
    });
});

function newGame() {
    $('#quiz').attr('data-status', 'ok')
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdPergunta);
    $('main').removeClass('hidden');
    $('div#status').addClass('hidden');
    $('div#confirmar').removeClass('hidden')
}
function resetaBotoes() {
    $(".resp").each(function () {
        if ($(this).hasClass('selecionada')) {
            $(this).removeClass('selecionada');
        }
        if ($(this).hasClass('correta')) {
            $(this).removeClass('correta');
        }
        if ($(this).hasClass('errada')) {
            $(this).removeClass('errada');
        }
    });
    nextQuestion(qtdPergunta)
}
function nextQuestion(numPerguntas) {
    $('#confirm-next-question').click(function (e) {
        e.preventDefault();
        console.log(perguntasFeitas.length, qtdPergunta + 1)
        gerarPergunta(numPerguntas)
        $('#quizContainer').removeClass('hidden')
        $('#imgCorreta').addClass('hidden')
        $("#imgCorreta img:last-child").remove()
        $("#textoCorreta p").remove()
        $('#textoCorreta').addClass('hidden');
        $('#proxPergunta').addClass('hidden')
    });
}
function gameOver() {
    $('#status').removeClass('hidden');
    $('main').addClass('hidden');
    $('button#confirmar').removeClass('hidden');
}
$('#confirm-new-game').click(function () {
    newGame();
});

$(document).ready(function () {
    gerarPergunta(qtdPergunta)
});

