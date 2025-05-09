let perguntasFeitas = [];

const perguntas = [
    // Pergunta 1
    {
        pergunta: "O que comemos no nosso primeiro encontro?",
        respostas: ["Pizza", "Sanduíche do Subway", "Hamburguer do Giraffas", "Poke"],
        correta: "resp2",
        imagem: "quiz/_imgs/3-HamburguerGiraffas.png",
        texto: "E eu tava morrendo de vergonha, minha nossa..."
    },
    // Pergunta 3
    {
        pergunta: "Que dia e mês demos o nosso primeiro beijo?",
        respostas: ["27 de Abril", "24 de Abril", "24 de Maio", "27 de Maio"],
        correta: "resp3",
        imagem: "quiz/_imgs/fritsch.jpg",
        texto: "Consigo me lembrar da timidez que a gente tava..."
    },
    // Pergunta 4
    {
        pergunta: "Qual o primeiro presente que te dei?",
        respostas: ["Saia de Brilho", "Jantar", "Cesta de Chocolate", "Tenis"],
        correta: "resp2",
        imagem: "quiz/_imgs/chocolates.jpg",
        texto: "Se tiver dúvidas, olha pro dia 23 de junho de 2023 na tua galeria"
    },
    // Pergunta 5
    {
        pergunta: "Qual filme não assistimos no cinema?",
        respostas: ["Deadpool e Wolverine", "Five Nights at Freddys", "Barbie", "Homem Aranha no Aranhaverso 3"],
        correta: "resp3",
        imagem: "quiz/_imgs/filme.jpg",
        texto: "O 3 ainda nem saiu no cinema! Mas já assistimos o 1 e o 2 juntos."
    },
    // Pergunta 6
    {
        pergunta: "Qual foi a nossa série do inverno passado?",
        respostas: ["Game of Thrones", "Jovem Sheldon", "Big Bang Theory", "Supernatural"],
        correta: "resp0",
        imagem: "quiz/_imgs/serie.jpg",
        texto: "Um vinho, GOT, cobertor e a gente abraçadinhos na minha casa..."
    },
    // Pergunta 7
    {
        pergunta: "Qual meu maior medo?",
        respostas: ["Gusttavo Lima", "Perder você", "Altura", "Cobra"],
        correta: "resp1",
        imagem: "quiz/_imgs/us.jpg",
        texto: "Nada me assusta mais do que imaginar o meu futuro sem você."
    },
];

var qtdPergunta = perguntas.length;

function gerarPergunta() {
    // Verifica se todas as perguntas já foram feitas
    if (perguntasFeitas.length >= qtdPergunta) {
        $('main').addClass('hidden');
        $('#status h2#game-over').remove();
        $('#status').removeClass('hidden');
        $('#game-over').html('Parabéns! Você venceu!');
        return;
    }

    // Gera número aleatório até encontrar uma pergunta não feita
    let numAleatorio;
    do {
        numAleatorio = Math.floor(Math.random() * qtdPergunta);
    } while (perguntasFeitas.includes(numAleatorio));

    // Colocar como pergunta feita
    perguntasFeitas.push(numAleatorio);

    // Preencher html com os dados da questão    
    var p_sele = perguntas[numAleatorio].pergunta;

    // Alimentar pergunta vinda do sorteio
    $('#pergunta').html(p_sele);
    $('#pergunta').attr('data-index', numAleatorio);

    for (let i = 0; i < perguntas[numAleatorio].respostas.length; i++) {
        $('#resp' + i).html(perguntas[numAleatorio].respostas[i]);
    }

    // Embaralhar Respostas
    let container = $('#respostas');
    var options = container.children();

    for (let i = 0; i < options.length; i++) {
        container.append(options.eq(Math.floor(Math.random() * options.length)));
    }
}

$(".resp").click(function () {
    if ($('#quiz').attr('data-status') !== 'travado') {
        // Percorrer Respostas e Desmarcar a Classe
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

    // Pegar indice da pergunta
    let indX = $('#pergunta').attr('data-index');

    // Qual a resposta certa
    let respCorreta = perguntas[indX].correta;
    let imgCerta = `<img src="${perguntas[indX].imagem}">`;
    let textoCerto = perguntas[indX].texto;

    // Verificar se alguma resposta foi selecionada
    let respSelecionada = $('.resp.selecionada');
    if (respSelecionada.length === 0) {
        alert('Por favor, selecione uma resposta!');
        return;
    }

    let respEscolhida = respSelecionada.attr('id');

    // Resultado da seleção
    if (respCorreta == respEscolhida) {
        console.log('Certa Resposta!!!');
        $('#' + respEscolhida).addClass('correta');
        $('div#imgCorreta').prepend(imgCerta);
        $('div#imgCorreta').removeClass('hidden');
        $('div#textoCorreta').removeClass('hidden');
        $('div#textoCorreta').prepend(`<p>${textoCerto}<p>`);
        $('#quizContainer').addClass('hidden');
        $('#proxPergunta').removeClass('hidden');
        resetaBotoes();
    } else {
        console.log('Errrrrrrooouuuu');
        $('#quiz').attr('data-status', 'travado');
        $('#' + respCorreta).addClass('correta');
        $('#' + respEscolhida).removeClass('selecionada');
        $('#' + respEscolhida).addClass('errada');
        $('#confirmar').addClass('hidden');
        setTimeout(function () {
            gameOver();
        }, 3500);
    }
});

function newGame() {
    $('#quiz').attr('data-status', 'ok');
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta();
    $('main').removeClass('hidden');
    $('div#status').addClass('hidden');
    $('div#confirmar').removeClass('hidden');
    $('#imgCorreta').addClass('hidden');
    $("#imgCorreta img").remove();
    $('#textoCorreta').addClass('hidden');
    $("#textoCorreta p").remove();
    $('#proxPergunta').addClass('hidden');
}

function resetaBotoes() {
    $(".resp").each(function () {
        $(this).removeClass('selecionada correta errada');
    });
}

function nextQuestion() {
    $('#confirm-next-question').off('click').on('click', function (e) {
        e.preventDefault();
        gerarPergunta();
        $('#quizContainer').removeClass('hidden');
        $('#imgCorreta').addClass('hidden');
        $("#imgCorreta img").remove();
        $('#textoCorreta').addClass('hidden');
        $("#textoCorreta p").remove();
        $('#proxPergunta').addClass('hidden');
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
    newGame();
    nextQuestion();
});