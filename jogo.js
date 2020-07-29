//Criar uma função que ajuste a altura e a largura da Página
//Definir a altura e a largura do brownser pelo JS
//Definir as variaveis fora da função, para que peguem um escopo global
var alturaPagina = 0
var larguraPagina = 0
var vidas = 1
var tempo = 10

//limitei tudo de acordo com o tamanho do navegador naquele momento
function ajustaTamanhoJogo() {
	alturaPagina = window.innerHeight
	larguraPagina = window.innerWidth

	console.log(larguraPagina, alturaPagina)
}

ajustaTamanhoJogo()

var cronometro = setInterval(function() {
	//valor de tempo vai diminuindo de 1 em 1 segundos
	tempo -= 1
	//logica para vitoria
	//se eu ganhar, paro de criar mosquito e paro o tempo
	//além de exibir a página de vitória
	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		alert('Você venceu!')
	}

	//selecionar o id do elemento para exibir ele no HTML
	document.getElementById('cronometro').innerHTML = tempo
}, 1000)

function posicaoRandomica(){

	//remover o mosquito anterior, caso exista
	//remover a vida, caso o mosquito seja removido
	var mosquitoId = document.getElementById('mosquito')
	var vidaId = document.getElementById('vida' + vidas)

	if(mosquitoId) { 
		mosquitoId.remove()

		//se vidas for maior que 3, da game over
		//se nao for, vai substituir coracao_cheio por coracao_vazio
		//vidas++ para ir aumentando de 1 em 1 de acordo com os IDs, vidas1 depois vidas2...
		if(vidas > 3) {
			//redirecionar o usuário para a página de game over de modo automático
			window.location.href = 'fim_de_jogo.html'
		} else {
			vidaId.src = "imagens/coracao_vazio.png"
			
			vidas++
		}
	}
	

	//defini o eixo x(largura) e o eixo y(altura)
	//usei Math.random para gerar valores aleatórios
	//multipliquei de acordo com o eixo, para ficar entre o valor/tamanho da tela
	//Math.floor para arredondar esse valores para baixo
	//faço menos 90px para não contar o tamanho da imagem
	var posicaoX = Math.floor(Math.random() * larguraPagina) - 90
	var posicaoY = Math.floor(Math.random() * alturaPagina) - 90

	//controle para posição não ser negativa, já que pode ser 0 - 90, assim não iria aparecer a imagem
	//se X for menos que 0 recebe 0, se não, recebe ele mesmo
	//o mesmo vale para Y
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosquito.png'
	//aplicar o css na imagem
	//apico a funcao que altera a classe ao inves de deixar fixa
	//concatei um espaço para nao ficar por exemplo 'mosquito1ladoA'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	//posicionar a imagem de acordo com X e Y
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function() {
		//this faz referencia ao proprio elemento html que executa a função
		this.remove()
	}

	//para incluir nossa imagem dentro do body
	document.body.appendChild(mosquito)

	console.log(tamanhoAleatorio())

	console.log(ladoAleatorio())
}

//Função para criar imagem de vários tamanhos
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	console.log(classe)

	//logica apra aplicar a classe de acordo com o resultado obtido acima
	//nao preciso do 'break', pois dps do 'return' ele ja para o processo e retorna p quem solicitou
	switch(classe) {
		case 0:
			return 'mosquito1'
		
		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

//Função para definir o lado que o mosquito olha
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	console.log(classe)

	switch(classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'
	}
}

