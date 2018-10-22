var canvas = document.getElementById("tela");
var contexto = canvas.getContext("2d");
var dimX;
var dimY;
var btNovo1 = document.getElementById("Novo");
var btNovo2 = document.getElementById("Novo2");
var pausa = 0;
var peca; //Variavel que indica a peca atual que esta sendo movimentada no tabuleiro
var direcao;//variavel que indica em qual direcao a peça está "virada"
var intervalo;//variavel usada na função "coração" do jogo. É usada para pausar e retomar o relogio de queda
var velocidadeAtual = 370; // variavel que indica o tempo de espera entre cada tique do relogio de queda (quando maior, mais lento)
var block = 0;//Varivel de controle usada para a queda rapida das peças com o botão "seta para baixo".

var vetor_jogador = new Array();
vetor_jogador.push(0);
var jogador = 0;

function Player()
{
	this.nome = "";
	this.totalLinhas = 0;
	this.pontos = 0;
	this.dificuldade = 0;
	this.tempo=0;
} 

var linha;//Indica em qual linha está a peça pivô atual
var coluna;//Indica em qual coluna está a peça pivô atual
//Obs:A peça pivô sempre é ObjMatriz.matriz[coluna][linha]
//As duas variáveis acima serão usadas para mapear em que posição da matriz está sendo percorrida

//Variaveis para o relógio
var timer;
var horas = "0"+0; 
var mins = "0"+0;
var secs = 0;

//Declaração da matriz 
var ObjMatriz = new Object();
ObjMatriz.matriz;


var linhasEncontradas = 0;

//Variaveis para o tamanho do tabuleiro
var nx = Math.floor(canvas.width / 20);
var ny = Math.floor(canvas.height / 20);	

//Printa os dados da partida zerados antes do jogo começar
document.getElementById("linhaseliminadas").innerHTML = "Linhas: <br>" + 0;
document.getElementById("dificuldade1").innerHTML = "Dificuldade: " + 0;
document.getElementById("pontuacao1").innerHTML = "Pontuação: " + 0;
clock1.innerHTML = horas + "<font color=#000000>:</font>" + mins + "<font color=#000000>:</font>" + secs + "<font color=#000000>0</font>";

var confirma=0;
function NovoJogo(tipoTabuleiro) 
{
	if (confirma==1)
	{
		if (confirm("Você deseja cancelar o jogo atual?"))
		{
			confirma=0;
			vetor_jogador.pop();
			jogador--;
		}
	}

	if (confirma==0)
	{
		confirma=1;
		
		if (tipoTabuleiro==1)
		{
			dimX=10;
			dimY=20;
			document.getElementById("tela").width = 100;
			document.getElementById("tela").height = 400;
		}
		else
		{
			dimX=22;
			dimY=44;
			document.getElementById("tela").width = 480;
			document.getElementById("tela").height = 1936;
		}
		contexto.clearRect(0, 0, canvas.width, canvas.height);
		
		linha=0;
		coluna=0;
		
		var player = new Player();
		vetor_jogador.push(player);
		jogador++;
		
		document.getElementById("pontuacao1").innerHTML = "Pontuação: " + 0;
		document.getElementById("dificuldade1").innerHTML = "Dificuldade: " + 0;
		document.getElementById("linhaseliminadas").innerHTML = "Linhas: <br>" + 0;
		
		gerarMatriz(dimX,dimY);
		Novo.disabled = false;
		printarNoCanvas();
		clearInterval(intervalo);
		clearTimeout(timer);
		horas = "0"+0; 
		mins = "0"+0;
		secs = -1;
		getTime();
		rodarJogo();
	}
}	

function gerarMatriz(x,y)
{
	ObjMatriz.matriz = new Array(x);
	for (f=0;f<x;f++)
	{
		ObjMatriz.matriz[f] = new Array(y+4);
		for (g=0;g<y+4;g++)
		{
			ObjMatriz.matriz[f][g]=0;
		}
	}
}

function printarNoCanvas()
{
	contexto.fillStyle = 'white';
	for(x=0;x<dimX;x++)
	{		
		for (y=0;y<dimY;y++)
		{
			var cor = ObjMatriz.matriz[x][y+4];// y + 4 porque começa a exibir a partir da 4ª linha (efeito de queda no começo)
			switch(cor)
			{
				case 0: contexto.fillStyle = '#000000';break;
				case 1: contexto.fillStyle = '#4ECDC4';break;
				case 2: contexto.fillStyle = '#C7F464';break;
				case 3: contexto.fillStyle = '#FF6B6B';break;
				case 4: contexto.fillStyle = '#EB6841';break;
				case 5: contexto.fillStyle = '#EDC951';break;
				case 6: contexto.fillStyle = '#AB34FF';break;
			}
			contexto.fillRect((x*dimX)+1,(y*dimY)+1,dimX*0.8,dimY*0.8);
		}
	}
	contexto.fillStyle = '#FFFFFF';
}

function rodarJogo()
{
	printarNoCanvas();
	gerarPecaAleatoria();
}

function gerarPecaAleatoria()
{	
		peca = Math.floor(Math.random()*6 + 1);
		direcao = 1;

		switch (peca)
		{
			case 1:PecaL();break;	
			case 2:PecaJ();break;
			case 3:PecaCubo();break;
			case 4:PecaI();break;
			case 5:PecaT();break;
			case 6:PecaU();break;
		}
		controlarQueda(velocidadeAtual,0,0);	
}

function controlarQueda(velocidade)
{
	if (pausa==0)
	{
		printarNoCanvas();
		intervalo = window.setInterval(Queda,velocidade);
		function Queda()
		{
			switch (peca)
			{	
				case 1:
					if ((direcao==1) || (direcao==3))
					{
						if (linha!=(dimY+2))
						{
							cair();
							linha++;
							printarNoCanvas();
						}
					}
					else
					{
						if (linha!=(dimY+3))
						{
							cair();
							linha++;
							printarNoCanvas();
						}
					}
				break;
				case 2:		
					if ((direcao==1) || (direcao==3))
					{
						if (linha!=(dimY+2))
						{
							cair();
							linha++;
							printarNoCanvas();
						}
					}
					else
					{
						if (linha!=(dimY+3))
						{
							cair();
							linha++;
							printarNoCanvas();
						}
					}
				break;
				case 3:
					if (linha!=(dimY+3))
					{
						cair();
						linha++;
						printarNoCanvas();
					}
				break;
				case 4:
					if (direcao == 1)
					{
						if (linha!=(dimY+1))
						{
							cair();
							linha++;
							printarNoCanvas();
						}
					}
					else
					{
						if (linha!=(dimY+4))
						{
							cair();
							linha++;
							printarNoCanvas();
						}
					}
				break;
				case 5:
					if ((direcao==1) || (direcao==3))
					{
						if (linha!=(dimY+3))
						{	
							cair();
							linha++;
							printarNoCanvas();
						}
					}
					else
					{
						if (linha!=(dimY+2))
						{
							cair();
							linha++;
							printarNoCanvas();
						}
					}
				break;
				case 6:
					if (linha!=(dimY+3))
					{
						cair();
						linha++;
						printarNoCanvas();
					}
				break;
				default: 
				clearInterval(intervalo);
				break;
			}	
		}
	}
}

function cair()
{
	switch (peca)
	{
		case 1://Peça L
			switch(direcao)
			{
				case 1:	
				if ((ObjMatriz.matriz[coluna][linha+3] == 0) && (ObjMatriz.matriz[coluna+1][linha+3] == 0))
				{
					ObjMatriz.matriz[coluna][linha+3] = 1;
					ObjMatriz.matriz[coluna+1][linha+3] = 1;

					ObjMatriz.matriz[coluna+1][linha+2] = 0;
					ObjMatriz.matriz[coluna][linha]=0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();
						confirma=0;						
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 2:
				if ((ObjMatriz.matriz[coluna][linha+2] == 0) && (ObjMatriz.matriz[coluna+1][linha+1] == 0) && (ObjMatriz.matriz[coluna+2][linha+1] == 0))
				{
					ObjMatriz.matriz[coluna][linha+2] = 1;
					ObjMatriz.matriz[coluna+1][linha+1] = 1;
					ObjMatriz.matriz[coluna+2][linha+1] = 1;

					ObjMatriz.matriz[coluna][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
					ObjMatriz.matriz[coluna+2][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();
						confirma=0;	
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 3:
				if ((ObjMatriz.matriz[coluna+1][linha+3] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0))
				{
					ObjMatriz.matriz[coluna][linha+1] = 1;
					ObjMatriz.matriz[coluna+1][linha+3]=1;

					ObjMatriz.matriz[coluna+1][linha]=0;
					ObjMatriz.matriz[coluna][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();
						confirma=0;						
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 4:
				if ((ObjMatriz.matriz[coluna][linha+2]==0) && (ObjMatriz.matriz[coluna+1][linha+2] == 0) && (ObjMatriz.matriz[coluna+2][linha+2] == 0)) 
				{
					ObjMatriz.matriz[coluna][linha+2] = 1;
					ObjMatriz.matriz[coluna+1][linha+2] = 1;
					ObjMatriz.matriz[coluna+2][linha+2] = 1;

					ObjMatriz.matriz[coluna][linha+1] = 0;
					ObjMatriz.matriz[coluna+1][linha+1] = 0;
					ObjMatriz.matriz[coluna+2][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();	
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
			}	
		break;
		case 2://Peça J
			switch (direcao)
			{	
				case 1:
				if ((ObjMatriz.matriz[coluna-1][linha+3] == 0)&&(ObjMatriz.matriz[coluna][linha+3] == 0))
				{
					ObjMatriz.matriz[coluna-1][linha+3] = 2;
					ObjMatriz.matriz[coluna][linha+3] = 2;

					ObjMatriz.matriz[coluna][linha] = 0;
					ObjMatriz.matriz[coluna-1][linha+2] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();	
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 2:
				if ((ObjMatriz.matriz[coluna-1][linha+2] == 0)&&(ObjMatriz.matriz[coluna][linha+2] == 0)&&(ObjMatriz.matriz[coluna+1][linha+2] == 0))
				{
					ObjMatriz.matriz[coluna-1][linha+2] = 2;
					ObjMatriz.matriz[coluna][linha+2] = 2;
					ObjMatriz.matriz[coluna+1][linha+2] = 2;
				
					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna][linha+1] = 0;
					ObjMatriz.matriz[coluna+1][linha+1] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();	
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 3:
				if ((ObjMatriz.matriz[coluna][linha+1] == 0) && (ObjMatriz.matriz[coluna-1][linha+3] == 0))
				{
					ObjMatriz.matriz[coluna][linha+1] = 2;
					ObjMatriz.matriz[coluna-1][linha+3] = 2;

					ObjMatriz.matriz[coluna][linha]= 0;
					ObjMatriz.matriz[coluna-1][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();	
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 4:
				if ((ObjMatriz.matriz[coluna][linha+2] == 0)&&(ObjMatriz.matriz[coluna-1][linha+1] == 0)&&(ObjMatriz.matriz[coluna-2][linha+1] == 0))
				{
					ObjMatriz.matriz[coluna][linha+2] = 2;
					ObjMatriz.matriz[coluna-1][linha+1] = 2;
					ObjMatriz.matriz[coluna-2][linha+1] = 2;

					ObjMatriz.matriz[coluna][linha] = 0;
					ObjMatriz.matriz[coluna-1][linha] = 0; 
					ObjMatriz.matriz[coluna-2][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();
						confirma=0;						
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
			}
		break;
		case 3://Peça Cubo
				if ((ObjMatriz.matriz[coluna][linha+2] == 0) && (ObjMatriz.matriz[coluna+1][linha+2] == 0))
				{
					ObjMatriz.matriz[coluna][linha+2] = 3;
					ObjMatriz.matriz[coluna+1][linha+2] = 3;
					
					ObjMatriz.matriz[coluna][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();	
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
		break;
		case 4://Peça I	
			switch (direcao)
			{
				case 1:
				if (ObjMatriz.matriz[coluna][linha+4] == 0)
				{
					ObjMatriz.matriz[coluna][linha+4] = 4;
					ObjMatriz.matriz[coluna][linha+3] = 4;
					
					ObjMatriz.matriz[coluna][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();
						confirma=0;						
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 2:
				if ((ObjMatriz.matriz[coluna-1][linha+1] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0) && (ObjMatriz.matriz[coluna+1][linha+1] == 0) && (ObjMatriz.matriz[coluna+2][linha+1] == 0))
				{
					ObjMatriz.matriz[coluna-1][linha+1] = 4;
					ObjMatriz.matriz[coluna][linha+1] = 4;
					ObjMatriz.matriz[coluna+1][linha+1] = 4;
					ObjMatriz.matriz[coluna+2][linha+1] = 4;

					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
					ObjMatriz.matriz[coluna+2][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();	
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
			}
		break;
		case 5://peça T
			switch (direcao)
			{
				case 1:
				if ((ObjMatriz.matriz[coluna-1][linha+2] == 0) && (ObjMatriz.matriz[coluna][linha+2] == 0) && (ObjMatriz.matriz[coluna+1][linha+2]==0))
				{
					ObjMatriz.matriz[coluna-1][linha+2] = 5;
					ObjMatriz.matriz[coluna][linha+2] = 5;
					ObjMatriz.matriz[coluna+1][linha+2] = 5;

					ObjMatriz.matriz[coluna-1][linha+1] = 0;
					ObjMatriz.matriz[coluna+1][linha+1] = 0;
					ObjMatriz.matriz[coluna][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();
						confirma=0;						
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 2:
				if ((ObjMatriz.matriz[coluna][linha+3] == 0) && (ObjMatriz.matriz[coluna+1][linha+2] == 0))
				{
					ObjMatriz.matriz[coluna][linha+3] = 5;
					ObjMatriz.matriz[coluna+1][linha+2] = 5;
					
					ObjMatriz.matriz[coluna+1][linha+1] = 0;
					ObjMatriz.matriz[coluna][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();	
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 3:
				if ((ObjMatriz.matriz[coluna-1][linha+1] == 0) && (ObjMatriz.matriz[coluna+1][linha+1] == 0) && (ObjMatriz.matriz[coluna][linha+2] == 0))
				{
					ObjMatriz.matriz[coluna-1][linha+1] = 5;
					ObjMatriz.matriz[coluna+1][linha+1] = 5;
					ObjMatriz.matriz[coluna][linha+2] = 5;
					
					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
					ObjMatriz.matriz[coluna][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking;
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}	
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 4:
				if ((ObjMatriz.matriz[coluna][linha+3] == 0) && (ObjMatriz.matriz[coluna-1][linha+2] == 0))
				{
					ObjMatriz.matriz[coluna][linha+3] = 5;
					ObjMatriz.matriz[coluna-1][linha+2] = 5;
					
					ObjMatriz.matriz[coluna-1][linha+1] = 0;
					ObjMatriz.matriz[coluna][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();	
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
			}
		break;
		case 6://peça U
			switch (direcao)
			{
				case 1:
				if ((ObjMatriz.matriz[coluna-1][linha+2] == 0) && (ObjMatriz.matriz[coluna][linha+2] == 0) && (ObjMatriz.matriz[coluna+1][linha+2] == 0))
				{
					ObjMatriz.matriz[coluna-1][linha+2] = 6;
					ObjMatriz.matriz[coluna][linha+2] = 6;
					ObjMatriz.matriz[coluna+1][linha+2] = 6;

					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
					ObjMatriz.matriz[coluna][linha+1] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();	
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 2:
				if ((ObjMatriz.matriz[coluna-1][linha+3] == 0) && (ObjMatriz.matriz[coluna][linha+3] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0))
				{
					ObjMatriz.matriz[coluna-1][linha+3] = 6;
					ObjMatriz.matriz[coluna][linha+3] = 6;
					ObjMatriz.matriz[coluna][linha+1] = 6;

					ObjMatriz.matriz[coluna][linha+2] = 0;
					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();	
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 3:
				if ((ObjMatriz.matriz[coluna+1][linha+2] == 0) && (ObjMatriz.matriz[coluna-1][linha+2] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0))
				{
					ObjMatriz.matriz[coluna+1][linha+2] = 6;
					ObjMatriz.matriz[coluna-1][linha+2] = 6;
					ObjMatriz.matriz[coluna][linha+1] = 6;

					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
				case 4:
				if ((ObjMatriz.matriz[coluna][linha+1] == 0) && (ObjMatriz.matriz[coluna][linha+3] == 0) && (ObjMatriz.matriz[coluna+1][linha+3] == 0))
				{
					ObjMatriz.matriz[coluna][linha+1] = 6;
					ObjMatriz.matriz[coluna][linha+3] = 6;
					ObjMatriz.matriz[coluna+1][linha+3] = 6;

					ObjMatriz.matriz[coluna][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
					ObjMatriz.matriz[coluna][linha+2] = 0;
				}
				else
				{
					peca = 0;
					clearInterval(intervalo);
					
					if (linha<4)
					{
						//Jogador Perdeu
						vetor_jogador[jogador].tempo = horas + ":" + mins + ":" + secs;
						atualizarRanking();
						confirma=0;
						if (dimX==10)
						{
							NovoJogo(1);
						}
						else
						{
							NovoJogo(2);	
						}
					}
					else
					{
						verificarLinha();
						if (linhasEncontradas > 0)
						{
							pontuar(linhasEncontradas);
						}
						gerarPecaAleatoria();
					}
				}
				break;
			}
		break;
		printarNoCanvas();
	}
}

document.onkeydown = evtTeclaDown;
document.onkeyup = evtTeclaUp;
function evtTeclaDown(evt)
{
	switch (evt.keyCode)
	{
		case 37:
			andarEsquerda();
		break;
		case 38:
			girar();
		break;
		case 39:
			andarDireita();
		break;
		case 40:
			cairRapido();
		break;
	}
}

function evtTeclaUp(evt)
{
	if (evt.keyCode == 40)
	{
		if (block == 1)
		{
			clearInterval(intervalo);
			controlarQueda(velocidadeAtual,0,linha);
			block=0;
		}
	}
}

function girar()	
{
	switch (peca)
	{
		case 1:
			switch(direcao)
			{
				case 1:
					if ((coluna+3) > dimX)
					{
						andarEsquerda();
					}
				
					if ((ObjMatriz.matriz[coluna+2][linha]==0))
					{
						ObjMatriz.matriz[coluna+1][linha]=1;
						ObjMatriz.matriz[coluna+2][linha]=1;
						
						ObjMatriz.matriz[coluna][linha+2]=0;
						ObjMatriz.matriz[coluna+1][linha+2]=0;
						direcao++;
					}
					clearInterval(intervalo);
					printarNoCanvas();
				break;
				case 2:
				
					if ((ObjMatriz.matriz[coluna+1][linha+2]==0))
					{
						ObjMatriz.matriz[coluna+1][linha+1]=1;
						ObjMatriz.matriz[coluna+1][linha+2]=1;
					
						ObjMatriz.matriz[coluna+2][linha]=0;
						ObjMatriz.matriz[coluna][linha+1]=0;
						direcao++;
					}
					clearInterval(intervalo);
					printarNoCanvas();
				break;
				case 3:	
					
					if ((coluna+3) > dimX)
					{
						andarEsquerda();
					}
					
					if ((ObjMatriz.matriz[coluna+2][linha]==0) &&  (ObjMatriz.matriz[coluna+2][linha+1]==0) && (ObjMatriz.matriz[coluna][linha+1]==0))
					{
						ObjMatriz.matriz[coluna+2][linha]=1;
						ObjMatriz.matriz[coluna+2][linha+1]=1;
						ObjMatriz.matriz[coluna][linha+1]=1;
						
						ObjMatriz.matriz[coluna+1][linha+2]=0;
						ObjMatriz.matriz[coluna+1][linha]=0;
						ObjMatriz.matriz[coluna][linha]=0;
						direcao++;
					}
					clearInterval(intervalo);
					printarNoCanvas;
				break;
				case 4:
					if ((ObjMatriz.matriz[coluna][linha+2]==0) && (ObjMatriz.matriz[coluna+1][linha+2]==0) && (ObjMatriz.matriz[coluna][linha]==0))
					{
						ObjMatriz.matriz[coluna][linha]=1;
						ObjMatriz.matriz[coluna][linha+2]=1;
						ObjMatriz.matriz[coluna+1][linha+2]=1;
						
						ObjMatriz.matriz[coluna+1][linha+1]=0;
						ObjMatriz.matriz[coluna+2][linha]=0;
						ObjMatriz.matriz[coluna+2][linha+1]=0;
						direcao=1;
					}
					clearInterval(intervalo);
					printarNoCanvas();
					break;
			}
		break;
		case 2:
			switch(direcao)
			{
				case 1:
				if ((coluna+2) > dimX)
				{
					andarEsquerda();
				}
				if ((ObjMatriz.matriz[coluna-1][linha]==0) && (ObjMatriz.matriz[coluna-1][linha+1]==0) && (ObjMatriz.matriz[coluna+1][linha+1]==0))
				{
					direcao++;
					ObjMatriz.matriz[coluna-1][linha]=2;
					ObjMatriz.matriz[coluna-1][linha+1]=2;
					ObjMatriz.matriz[coluna+1][linha+1]=2;

					ObjMatriz.matriz[coluna][linha]=0;
					ObjMatriz.matriz[coluna][linha+2]=0;
					ObjMatriz.matriz[coluna-1][linha+2]=0;
				}
				clearInterval(intervalo);
				printarNoCanvas();
				break;
				case 2:			
				if ((ObjMatriz.matriz[coluna-1][linha+2]==0) && (ObjMatriz.matriz[coluna][linha]==0) )
				{			
					direcao++;
					ObjMatriz.matriz[coluna][linha]=2;
					ObjMatriz.matriz[coluna-1][linha+2]=2;

					ObjMatriz.matriz[coluna][linha+1]=0;
					ObjMatriz.matriz[coluna+1][linha+1]=0;
				}
				clearInterval(intervalo);
				printarNoCanvas();
				break;
				case 3:
				if ((coluna-3) < -1)
				{
					andarDireita();
				}
				if ((coluna+1) >= dimX)
				{
					andarEsquerda();
				}
				if ((ObjMatriz.matriz[coluna+1][linha]==0) && (ObjMatriz.matriz[coluna+1][linha+1]==0))
				{
					direcao++;
					ObjMatriz.matriz[coluna][linha+1] = 2;
					ObjMatriz.matriz[coluna-2][linha] = 2;

					ObjMatriz.matriz[coluna-1][linha+1] = 0;
					ObjMatriz.matriz[coluna-1][linha+2] = 0
				}
				clearInterval(intervalo);
				printarNoCanvas();
				break;
				case 4:
				if ((ObjMatriz.matriz[coluna][linha+2]==0) && (ObjMatriz.matriz[coluna-1][linha+2]==0))
				{
					direcao=1;
					ObjMatriz.matriz[coluna][linha+2] = 2;
					ObjMatriz.matriz[coluna-1][linha+2] = 2;

					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna-2][linha] = 0;
				}				
				clearInterval(intervalo);
				printarNoCanvas();
				break;
			}
		break;
		case 3:
				clearInterval(intervalo);
				printarNoCanvas();
		break;
		case 4:
			switch(direcao)
			{
				case 1:
				if ((coluna+2) >= dimX)
				{
					andarEsquerda();
					andarEsquerda();
				}
				if ((coluna-2) < -1)
				{
					andarDireita();
				}
				
				if((ObjMatriz.matriz[coluna+2][linha]==0) && (ObjMatriz.matriz[coluna-1][linha]==0))
				{
					
					direcao++;
					ObjMatriz.matriz[coluna-1][linha] = 4;
					ObjMatriz.matriz[coluna+1][linha] = 4;
					ObjMatriz.matriz[coluna+2][linha] = 4;

					ObjMatriz.matriz[coluna][linha+1] = 0;
					ObjMatriz.matriz[coluna][linha+2] = 0;
					ObjMatriz.matriz[coluna][linha+3] = 0;
					
				}
				
				clearInterval(intervalo);
				printarNoCanvas();
				break;
				case 2:
				if (ObjMatriz.matriz[coluna][linha+1]!=0 && (ObjMatriz.matriz[coluna][linha-1]==0))
				{
					
					sina=1;
					ObjMatriz.matriz[coluna][linha-3] = 4;
					ObjMatriz.matriz[coluna][linha-2] = 4;
					ObjMatriz.matriz[coluna][linha-1] = 4;
						
					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
					ObjMatriz.matriz[coluna+2][linha] = 0;
				}
				else
				if (ObjMatriz.matriz[coluna][linha+2]!=0 && (ObjMatriz.matriz[coluna][linha-2]==0))
				{	
						
					ObjMatriz.matriz[coluna][linha-2] = 4;
					ObjMatriz.matriz[coluna][linha-1] = 4;
					ObjMatriz.matriz[coluna][linha+1] = 4;
			
					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
					ObjMatriz.matriz[coluna+2][linha] = 0;
				}
				else if (ObjMatriz.matriz[coluna][linha+3]!=0 && (ObjMatriz.matriz[coluna][linha-3]==0))
				{
					
					ObjMatriz.matriz[coluna][linha-1] = 4;
					ObjMatriz.matriz[coluna][linha+1] = 4;
					ObjMatriz.matriz[coluna][linha+2] = 4;
						
					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
					ObjMatriz.matriz[coluna+2][linha] = 0;
					linha--;
				}			
				else{
					direcao--;
					ObjMatriz.matriz[coluna][linha+1] = 4;
					ObjMatriz.matriz[coluna][linha+2] = 4;
					ObjMatriz.matriz[coluna][linha+3] = 4;
						
						ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
					ObjMatriz.matriz[coluna+2][linha] = 0;
				}
								
				clearInterval(intervalo);
				printarNoCanvas();
				break;
			}
		break;
		case 5:
			switch(direcao)
			{	
				case 1:	
				if ((coluna+2) > dimX)
				{
					andarEsquerda();
				}
				if(ObjMatriz.matriz[coluna][linha+2]==0)
				{
					direcao++;
					ObjMatriz.matriz[coluna][linha+2] = 5;
					ObjMatriz.matriz[coluna-1][linha+1] = 0;
				}
				clearInterval(intervalo);
				printarNoCanvas();
				break;
				case 2:
				if ((coluna-2) < -1)
				{
					andarDireita();
				}	
				direcao++;
				ObjMatriz.matriz[coluna+1][linha] = 5;
				ObjMatriz.matriz[coluna-1][linha] = 5;
				
				ObjMatriz.matriz[coluna+1][linha+1] = 0;
				ObjMatriz.matriz[coluna][linha+2] = 0;
				clearInterval(intervalo);
				printarNoCanvas();
				break;
				case 3:
				if ((coluna+2) > dimX)
				{
					andarEsquerda();
				}
				if((ObjMatriz.matriz[coluna][linha+2]==0) && (ObjMatriz.matriz[coluna-1][linha+1]==0) )
				{
					direcao++;
					ObjMatriz.matriz[coluna][linha+2] = 5;
					ObjMatriz.matriz[coluna-1][linha+1] = 5;
					
					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha] = 0;
				}
				clearInterval(intervalo);
				printarNoCanvas();
				break;
				case 4:
				if ((coluna+2) > dimX)
				{
					andarEsquerda();
				}
				direcao = 1;
				
				ObjMatriz.matriz[coluna+1][linha+1] = 5;
				ObjMatriz.matriz[coluna][linha+2] = 0;
				clearInterval(intervalo);
				printarNoCanvas();
				break;
			}
		break;
		case 6:
			switch(direcao)
			{
				case 1:
				if ((ObjMatriz.matriz[coluna][linha+2]==0) && (ObjMatriz.matriz[coluna-1][linha+2]==0))
				{
					direcao++;
					ObjMatriz.matriz[coluna][linha] = 6;
					ObjMatriz.matriz[coluna-1][linha+2] = 6;
					ObjMatriz.matriz[coluna][linha+2] = 6;

					ObjMatriz.matriz[coluna+1][linha] = 0;
					ObjMatriz.matriz[coluna+1][linha+1] = 0;
					ObjMatriz.matriz[coluna][linha+1] = 0;
				}
				clearInterval(intervalo);
				printarNoCanvas();
				break;
				case 2:
				if ((coluna+2) > dimX)
				{
					andarEsquerda();
				}
				if  (ObjMatriz.matriz[coluna+1][linha+1]==0)
				{
					direcao++;
					ObjMatriz.matriz[coluna+1][linha] = 6;
					ObjMatriz.matriz[coluna+1][linha+1] = 6;

					ObjMatriz.matriz[coluna-1][linha+2] = 0; 
					ObjMatriz.matriz[coluna][linha+2] = 0;
				}
				clearInterval(intervalo);
				printarNoCanvas();
				break;
				case 3:
				if ((ObjMatriz.matriz[coluna][linha+2]==0)&&(ObjMatriz.matriz[coluna+1][linha+2]==0))
				{				
					direcao++;
					ObjMatriz.matriz[coluna][linha+2] = 6;
					ObjMatriz.matriz[coluna+1][linha+2] = 6;

					ObjMatriz.matriz[coluna-1][linha] = 0;
					ObjMatriz.matriz[coluna-1][linha+1] = 0;
				}
				
				clearInterval(intervalo);
				printarNoCanvas();
				break;
				case 4:
				if ((coluna-2) < -1)
				{
					andarDireita();
				}
				
				direcao = 1;
				ObjMatriz.matriz[coluna][linha+1] = 6;
				ObjMatriz.matriz[coluna-1][linha] = 6;
				ObjMatriz.matriz[coluna-1][linha+1] = 6;

				ObjMatriz.matriz[coluna][linha] = 0;
				ObjMatriz.matriz[coluna][linha+2] = 0;
				ObjMatriz.matriz[coluna+1][linha+2] = 0;
				clearInterval(intervalo);
				printarNoCanvas();
				break;
			}
		break;
	}
	controlarQueda(velocidadeAtual,0,linha);
}

function cairRapido()
{
	if (block == 0)
	{
		clearInterval(intervalo);
		controlarQueda(velocidadeAtual/7.5);
		
		block=1;
	}
}

function andarEsquerda()
{
	clearInterval(intervalo);
	switch (peca)
	{
		case 1:
			switch (direcao)
			{
				case 1:
				if ((coluna-1) > -1)
				{
					if ((ObjMatriz.matriz[coluna-1][linha] == 0) && (ObjMatriz.matriz[coluna-1][linha+1] == 0) && (ObjMatriz.matriz[coluna-1][linha+2] == 0))
					{
						ObjMatriz.matriz[coluna-1][linha] = 1;
						ObjMatriz.matriz[coluna-1][linha+1] = 1;
						ObjMatriz.matriz[coluna-1][linha+2]= 1;
						ObjMatriz.matriz[coluna][linha]= 1;
						
						ObjMatriz.matriz[coluna][linha]=0;
						ObjMatriz.matriz[coluna][linha+1]=0;
						ObjMatriz.matriz[coluna+1][linha+2]=0;
						
						coluna--;
					}
				}
				break;
				case 2:
				if ((coluna-1) > -1)
				{
					if ((ObjMatriz.matriz[coluna-1][linha+1] == 0) && (ObjMatriz.matriz[coluna-1][linha] == 0))
					{
						ObjMatriz.matriz[coluna-1][linha+1] = 1;
						ObjMatriz.matriz[coluna-1][linha] = 1;
						ObjMatriz.matriz[coluna][linha] = 1;

						ObjMatriz.matriz[coluna][linha+1] = 0;
						ObjMatriz.matriz[coluna+2][linha] = 0;
						
						coluna--;
					}
				}
				break;
				case 3:
				if ((coluna-1) > -1)
				{
					if ((ObjMatriz.matriz[coluna-1][linha] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0) && (ObjMatriz.matriz[coluna][linha+2] == 0))
					{
						ObjMatriz.matriz[coluna-1][linha] = 1;
						ObjMatriz.matriz[coluna][linha] = 1;
						ObjMatriz.matriz[coluna][linha+1] = 1;
						ObjMatriz.matriz[coluna][linha+2] = 1;

						ObjMatriz.matriz[coluna+1][linha] = 0;
						ObjMatriz.matriz[coluna+1][linha+1] = 0;
						ObjMatriz.matriz[coluna+1][linha+2] = 0;
						
						coluna--;
					}
				}
				break;
				case 4:
				if ((coluna-1) > -1)
				{
					if ((ObjMatriz.matriz[coluna+1][linha] == 0) && (ObjMatriz.matriz[coluna-1][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna+1][linha] = 1;
						ObjMatriz.matriz[coluna-1][linha+1] = 1;

						ObjMatriz.matriz[coluna+2][linha] = 0;
						ObjMatriz.matriz[coluna+2][linha+1] = 0;
						
						coluna--;
					}
				}
				break;
			}
			break;
		case 2:
			switch (direcao)
			{
				case 1:
				if ((coluna-2) > -1)
				{
					if ((ObjMatriz.matriz[coluna-1][linha] == 0)  && (ObjMatriz.matriz[coluna-1][linha+1] == 0) && (ObjMatriz.matriz[coluna-2][linha+2] == 0))
					{
						ObjMatriz.matriz[coluna-1][linha] = 2;
						ObjMatriz.matriz[coluna-1][linha+1] = 2;
						ObjMatriz.matriz[coluna-1][linha+2] = 2;
						ObjMatriz.matriz[coluna-2][linha+2] = 2;
						
						ObjMatriz.matriz[coluna][linha]=0;
						ObjMatriz.matriz[coluna][linha+1]=0;
						ObjMatriz.matriz[coluna][linha+2]=0;
						
						coluna--;
					}
				}
				break;
				case 2:
				if ((coluna-2) > -1)
				{
					if ((ObjMatriz.matriz[coluna-2][linha] == 0) && (ObjMatriz.matriz[coluna-2][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna-2][linha] = 2;
						ObjMatriz.matriz[coluna-2][linha+1] = 2;
						
						ObjMatriz.matriz[coluna-1][linha] = 0;
						ObjMatriz.matriz[coluna+1][linha+1] = 0;
						
						coluna--;
					}
				}
				break;
				case 3:		
			
				if ((coluna-2) > -1)
				{
					if ((ObjMatriz.matriz[coluna-2][linha] == 0) && (ObjMatriz.matriz[coluna-2][linha+1] == 0) && (ObjMatriz.matriz[coluna-2][linha+2] == 0))
					{
						ObjMatriz.matriz[coluna-2][linha] = 2;
						ObjMatriz.matriz[coluna-2][linha+1] = 2;
						ObjMatriz.matriz[coluna-2][linha+2] = 2;

						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna-1][linha+1] = 0;
						ObjMatriz.matriz[coluna-1][linha+2] = 0;
						
						coluna--;
					}
				}
				break;
				case 4:
			
				if ((coluna-3) > -1)
				{
					if ((ObjMatriz.matriz[coluna-3][linha] == 0) && (ObjMatriz.matriz[coluna-1][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna-3][linha] = 2;
						ObjMatriz.matriz[coluna-1][linha+1] = 2;

						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna][linha+1] = 0;
						
						coluna--;
					}
				}
				break;
			}
		break;
		case 3:
			if ((coluna-1) > -1)
			{
				if ((ObjMatriz.matriz[coluna-1][linha] == 0) && (ObjMatriz.matriz[coluna-1][linha+1] == 0))
				{
					ObjMatriz.matriz[coluna-1][linha] = 3;
					ObjMatriz.matriz[coluna-1][linha+1] = 3;
				
					ObjMatriz.matriz[coluna+1][linha]=0;
					ObjMatriz.matriz[coluna+1][linha+1]=0;
					
					coluna--;
				}
			}
		break;
		case 4:
			switch (direcao)
			{
				case 1:
				if ((coluna-1) > -1)
				{
					if ((ObjMatriz.matriz[coluna-1][linha] == 0) && (ObjMatriz.matriz[coluna-1][linha+1] == 0) && (ObjMatriz.matriz[coluna-1][linha+2] == 0) && (ObjMatriz.matriz[coluna-1][linha+3] == 0))
					{
						ObjMatriz.matriz[coluna-1][linha] = 4;
						ObjMatriz.matriz[coluna-1][linha+1] = 4;
						ObjMatriz.matriz[coluna-1][linha+2] = 4;
						ObjMatriz.matriz[coluna-1][linha+3] = 4;
						
						ObjMatriz.matriz[coluna][linha]=0;
						ObjMatriz.matriz[coluna][linha+1]=0;
						ObjMatriz.matriz[coluna][linha+2]=0;
						ObjMatriz.matriz[coluna][linha+3]=0;
						
						coluna--;
					}
				}
				break;
				case 2:
				if ((coluna-2) > -1)
				{
					if (ObjMatriz.matriz[coluna-2][linha] == 0)
					{
						ObjMatriz.matriz[coluna-2][linha] = 4;
						
						ObjMatriz.matriz[coluna+2][linha] = 0;
						coluna--;
					}
				}
				break;
			}
		break;
		case 5:
			switch (direcao)
			{
				case 1:
				if ((coluna-2) > -1)
				{
					if ((ObjMatriz.matriz[coluna-1][linha] == 0) && (ObjMatriz.matriz[coluna-2][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna-1][linha] = 5;
						ObjMatriz.matriz[coluna-2][linha+1] = 5;
						
						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna+1][linha+1] = 0;
						
						coluna--;
					}
				}
				break;
				case 2:
				if ((coluna-1) > -1)
				{
					if ((ObjMatriz.matriz[coluna-1][linha] == 0) && (ObjMatriz.matriz[coluna-1][linha+1] == 0) && (ObjMatriz.matriz[coluna-1][linha+2] == 0))
					{
						ObjMatriz.matriz[coluna-1][linha] = 5;
						ObjMatriz.matriz[coluna-1][linha+1] = 5;
						ObjMatriz.matriz[coluna-1][linha+2] = 5;

						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna][linha+2] = 0;
						ObjMatriz.matriz[coluna+1][linha+1] = 0;
						
						coluna--;
					}
				}
				break;
				case 3:
				if ((coluna-2) > -1)
				{	
					if ((ObjMatriz.matriz[coluna-2][linha] == 0) && (ObjMatriz.matriz[coluna-1][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna-2][linha] = 5;
						ObjMatriz.matriz[coluna-1][linha+1] = 5;

						ObjMatriz.matriz[coluna][linha+1] = 0;
						ObjMatriz.matriz[coluna+1][linha] = 0;
						
						coluna--;
					}
				}
				break;
				case 4:
				if ((coluna-2) > -1)
				{
					if ((ObjMatriz.matriz[coluna-1][linha] == 0) && (ObjMatriz.matriz[coluna-1][linha+2] == 0) && (ObjMatriz.matriz[coluna-2][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna-1][linha] = 5;
						ObjMatriz.matriz[coluna-1][linha+2] = 5;
						ObjMatriz.matriz[coluna-2][linha+1] = 5;
						
						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna][linha+1] = 0;
						ObjMatriz.matriz[coluna][linha+2] = 0;
						
						coluna--;
					}
				}
				break;
			}
		break;
		case 6:
			switch (direcao)
			{
				case 1:
				if ((coluna-2) > -1)
				{
					if ((ObjMatriz.matriz[coluna-2][linha] == 0) && (ObjMatriz.matriz[coluna-2][linha+1] == 0) && (ObjMatriz.matriz[coluna][linha] == 0))
					{
						ObjMatriz.matriz[coluna-2][linha] = 6;
						ObjMatriz.matriz[coluna-2][linha+1] = 6;
						ObjMatriz.matriz[coluna][linha] = 6;

						ObjMatriz.matriz[coluna-1][linha] = 0;
						ObjMatriz.matriz[coluna+1][linha] = 0;
						ObjMatriz.matriz[coluna+1][linha+1] = 0;
						
						coluna--;
					}
				}
				break;
				case 2:
				if ((coluna-2) > -1)
				{
					if ((ObjMatriz.matriz[coluna-2][linha] == 0) && (ObjMatriz.matriz[coluna-2][linha+1] == 0) && (ObjMatriz.matriz[coluna-2][linha+2] == 0))
					{
						ObjMatriz.matriz[coluna-2][linha] = 6;
						ObjMatriz.matriz[coluna-2][linha+1] = 6;
						ObjMatriz.matriz[coluna-2][linha+2] = 6;

						ObjMatriz.matriz[coluna][linha+2] = 0;
						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna-1][linha+1] = 0;				
						
						coluna--;
					}
				}
				break;
				case 3:
				if ((coluna-2) > -1)
				{
					if ((ObjMatriz.matriz[coluna-2][linha] == 0) && (ObjMatriz.matriz[coluna-2][linha+1] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna-2][linha] = 6;
						ObjMatriz.matriz[coluna-2][linha+1] = 6;
						ObjMatriz.matriz[coluna][linha+1] = 6;

						ObjMatriz.matriz[coluna+1][linha] = 0;
						ObjMatriz.matriz[coluna+1][linha+1] = 0;
						ObjMatriz.matriz[coluna-1][linha+1] = 0;
						
						coluna--;
					}
				}
				break;
				case 4:
				if ((coluna-1) > -1)
				{
					if ((ObjMatriz.matriz[coluna-1][linha] == 0) && (ObjMatriz.matriz[coluna-1][linha+2] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna-1][linha] = 6;
						ObjMatriz.matriz[coluna-1][linha+2] = 6;
						ObjMatriz.matriz[coluna][linha+1] = 6;

						ObjMatriz.matriz[coluna+1][linha] = 0;
						ObjMatriz.matriz[coluna+1][linha+1] = 0;
						ObjMatriz.matriz[coluna+1][linha+2] = 0;
						
						coluna--;
					}
				}
				break;
			}
		break;
	}
	printarNoCanvas();
	controlarQueda(velocidadeAtual,0,linha);	
}

function andarDireita()
{
	clearInterval(intervalo);
	switch (peca)
	{
		case 1:
			switch (direcao)
			{
				case 1:
				if ((coluna+2) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+1][linha] == 0) && (ObjMatriz.matriz[coluna+1][linha+1] == 0) && (ObjMatriz.matriz[coluna+2][linha+2] == 0))
					{ 
						ObjMatriz.matriz[coluna+1][linha] = 1;
						ObjMatriz.matriz[coluna+1][linha+1] = 1;
						ObjMatriz.matriz[coluna+2][linha+2] = 1;
						
						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna][linha+1] = 0;
						ObjMatriz.matriz[coluna][linha+2] = 0;
						
						coluna++;
					}
				}
				break;
				case 2:
				if ((coluna+3) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+3][linha] == 0) && (ObjMatriz.matriz[coluna+1][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna+3][linha] = 1;
						ObjMatriz.matriz[coluna+1][linha+1] = 1;

						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna][linha+1] = 0;
						
						coluna++;
					}
				}
				break;
				case 3:
				if ((coluna+2) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+2][linha] == 0) && (ObjMatriz.matriz[coluna+2][linha+1] == 0) && (ObjMatriz.matriz[coluna+2][linha+2] == 0))
					{
						ObjMatriz.matriz[coluna+2][linha] = 1;
						ObjMatriz.matriz[coluna+2][linha+1] = 1;
						ObjMatriz.matriz[coluna+2][linha+2] = 1;
						
						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna+1][linha+1] = 0;
						ObjMatriz.matriz[coluna+1][linha+2] = 0;
						
						coluna++;
					}
				}
				break;
				case 4:
				if ((coluna+3) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+3][linha] == 0) && (ObjMatriz.matriz[coluna+3][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna+3][linha] = 1;
						ObjMatriz.matriz[coluna+3][linha+1] = 1;

						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna][linha+1]=0;
						ObjMatriz.matriz[coluna+2][linha] = 0;
						
						coluna++;
					}
				}
				break;
			}
		break;
		case 2:
			switch (direcao)
			{
				case 1:
				if ((coluna+1) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+1][linha] == 0) && (ObjMatriz.matriz[coluna+1][linha+1] == 0) && (ObjMatriz.matriz[coluna+1][linha+2] == 0))
					{
						ObjMatriz.matriz[coluna+1][linha] = 2;
						ObjMatriz.matriz[coluna+1][linha+1] = 2;
						ObjMatriz.matriz[coluna+1][linha+2] = 2;
						
						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna][linha+1] = 0;
						ObjMatriz.matriz[coluna-1][linha+2] = 0;
						
						coluna++;
					}
				}
				break;
				case 2:
				if ((coluna+2) < dimX)
				{	
					if ((ObjMatriz.matriz[coluna][linha] == 0) && (ObjMatriz.matriz[coluna+2][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna][linha] = 2;
						ObjMatriz.matriz[coluna+2][linha+1] = 2;

						ObjMatriz.matriz[coluna-1][linha] = 0;
						ObjMatriz.matriz[coluna-1][linha+1] = 0;
						
						coluna++;
					}
				}
				break;
				case 3:
				if ((coluna+1) < dimX)
				{	
					if ((ObjMatriz.matriz[coluna+1][linha] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0) && (ObjMatriz.matriz[coluna][linha+2] == 0))
					{
						ObjMatriz.matriz[coluna+1][linha] = 2;
						ObjMatriz.matriz[coluna][linha+1] = 2;
						ObjMatriz.matriz[coluna][linha+2] = 2;

						ObjMatriz.matriz[coluna-1][linha] = 0;
						ObjMatriz.matriz[coluna-1][linha+1] = 0;
						ObjMatriz.matriz[coluna-1][linha+2] = 0;
						
						coluna++;
					}
				}
				break;
				case 4:
				if ((coluna+1) < dimX)
				{	
					if ((ObjMatriz.matriz[coluna+1][linha] == 0) && (ObjMatriz.matriz[coluna+1][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna+1][linha] = 2;
						ObjMatriz.matriz[coluna+1][linha+1] = 2;
						
						ObjMatriz.matriz[coluna-2][linha] = 0;
						ObjMatriz.matriz[coluna][linha+1] = 0;
				
						coluna++;
					}
				}
				break;
			}
		break;
		case 3:
			switch (direcao)
			{
				case 1:
				if ((coluna+2) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+2][linha] == 0) && (ObjMatriz.matriz[coluna+2][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna+2][linha] = 3;
						ObjMatriz.matriz[coluna+2][linha+1] = 3;
						
						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna][linha+1] = 0;
						
						coluna++;
					}
				}
				break;
			}
		break;
		case 4:
			switch (direcao)
			{
				case 1:
				if ((coluna+1) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+1][linha] == 0) && (ObjMatriz.matriz[coluna+1][linha+1] == 0) && (ObjMatriz.matriz[coluna+1][linha+2] == 0) && (ObjMatriz.matriz[coluna+1][linha+3] == 0))
					{
						ObjMatriz.matriz[coluna+1][linha] = 4;
						ObjMatriz.matriz[coluna+1][linha+1] = 4;
						ObjMatriz.matriz[coluna+1][linha+2] = 4;
						ObjMatriz.matriz[coluna+1][linha+3] = 4;
						
						ObjMatriz.matriz[coluna][linha]=0;
						ObjMatriz.matriz[coluna][linha+1]=0;
						ObjMatriz.matriz[coluna][linha+2]=0;
						ObjMatriz.matriz[coluna][linha+3]=0;
						
						coluna++;
					}
				}
				break;
				case 2:
				if ((coluna+3) < dimX)
				{
					if (ObjMatriz.matriz[coluna+3][linha] == 0)
					{
						ObjMatriz.matriz[coluna+3][linha] = 4;
						
						ObjMatriz.matriz[coluna-1][linha] = 0;
						
						coluna++;
					}
				}
				break;
			}
		break;
		case 5:
			switch (direcao)
			{
				case 1:
				if ((coluna+2) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+2][linha+1] == 0) && (ObjMatriz.matriz[coluna+1][linha] == 0))
					{
						ObjMatriz.matriz[coluna+2][linha+1] = 5;
						ObjMatriz.matriz[coluna+1][linha] = 5;
						
						ObjMatriz.matriz[coluna-1][linha+1]=0;
						ObjMatriz.matriz[coluna][linha]=0;
						
						coluna++;
					}
				}
				break;
				case 2:
				if ((coluna+2) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+1][linha] == 0) && (ObjMatriz.matriz[coluna+1][linha+2] == 0) && (ObjMatriz.matriz[coluna+2][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna+1][linha] = 5;
						ObjMatriz.matriz[coluna+1][linha+2] = 5;
						ObjMatriz.matriz[coluna+2][linha+1] = 5;

						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna][linha+1] = 0;
						ObjMatriz.matriz[coluna][linha+2] = 0;
					
						coluna++;
					}
				}
				break;
				case 3:
				if ((coluna+2) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+2][linha] == 0) && (ObjMatriz.matriz[coluna+1][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna+2][linha] = 5;
						ObjMatriz.matriz[coluna+1][linha+1] = 5;

						ObjMatriz.matriz[coluna-1][linha] = 0;
						ObjMatriz.matriz[coluna][linha+1] = 0;
						
						coluna++;
					}
				}
				break;	
				case 4:
				if ((coluna+1) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+1][linha] == 0) && (ObjMatriz.matriz[coluna+1][linha+1] == 0) && (ObjMatriz.matriz[coluna+1][linha+2] == 0))
					{
						ObjMatriz.matriz[coluna+1][linha] = 5;
						ObjMatriz.matriz[coluna+1][linha+1] = 5;
						ObjMatriz.matriz[coluna+1][linha+2] = 5;

						ObjMatriz.matriz[coluna][linha]=0;
						ObjMatriz.matriz[coluna-1][linha+1] = 0;
						ObjMatriz.matriz[coluna][linha+2]=0;
				
						coluna++;
					}
				}
				break;
			}
		break;
		case 6:
			switch (direcao)
			{
				case 1:
				if ((coluna+2) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+2][linha] == 0) && (ObjMatriz.matriz[coluna+2][linha+1] == 0) && (ObjMatriz.matriz[coluna][linha] == 0))
					{
						ObjMatriz.matriz[coluna+2][linha] = 6;
						ObjMatriz.matriz[coluna+2][linha+1] = 6;
						ObjMatriz.matriz[coluna][linha] = 6;

						ObjMatriz.matriz[coluna-1][linha] = 0;
						ObjMatriz.matriz[coluna-1][linha+1] = 0;
						ObjMatriz.matriz[coluna+1][linha] = 0;
				
						coluna++;
					}
				}
				break;
				case 2:
				if ((coluna+1) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+1][linha] == 0) && (ObjMatriz.matriz[coluna+1][linha+2] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna+1][linha] = 6;
						ObjMatriz.matriz[coluna+1][linha+2] = 6;
						ObjMatriz.matriz[coluna][linha+1] = 6;

						ObjMatriz.matriz[coluna-1][linha] = 0;
						ObjMatriz.matriz[coluna-1][linha+1] = 0;
						ObjMatriz.matriz[coluna-1][linha+2] = 0;
						
						coluna++;
					}
				}		
				break;
				case 3:
				if ((coluna+2) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+2][linha] == 0) && (ObjMatriz.matriz[coluna+2][linha+1] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna+2][linha] = 6;
						ObjMatriz.matriz[coluna+2][linha+1] = 6;
						ObjMatriz.matriz[coluna][linha+1] = 6;

						ObjMatriz.matriz[coluna-1][linha] = 0;
						ObjMatriz.matriz[coluna-1][linha+1] = 0;
						ObjMatriz.matriz[coluna+1][linha+1] = 0;
						
						coluna++;
					}
				}		
				break;
				case 4:
				if ((coluna+2) < dimX)
				{
					if ((ObjMatriz.matriz[coluna+2][linha] == 0) && (ObjMatriz.matriz[coluna+2][linha+1] == 0) && (ObjMatriz.matriz[coluna][linha+1] == 0))
					{
						ObjMatriz.matriz[coluna+2][linha] = 6;
						ObjMatriz.matriz[coluna+2][linha+1] = 6;
						ObjMatriz.matriz[coluna+2][linha+2] = 6;

						ObjMatriz.matriz[coluna][linha] = 0;
						ObjMatriz.matriz[coluna][linha+2] = 0;
						ObjMatriz.matriz[coluna+1][linha+1] = 0;
						
						coluna++;
					}
				}		
				break;
			}
		break;
	}
	printarNoCanvas();
	controlarQueda(velocidadeAtual,0,linha);	
}
function PecaL()
{
	coluna=(dimX/2)-1;
	linha=0;
	ObjMatriz.matriz[coluna][linha]=1;
	ObjMatriz.matriz[coluna][linha+1]=1;
	ObjMatriz.matriz[coluna][linha+2]=1;
	ObjMatriz.matriz[coluna+1][linha+2]=1;
	// 0 0 0 0 1 0 0 0 0 0
	// 0 0 0 0 1 0 0 0 0 0
	// 0 0 0 0 1 1 0 0 0 0 
}
function PecaJ()
{
	coluna=(dimX/2);
	linha=0;
	ObjMatriz.matriz[coluna][linha]=2;
	ObjMatriz.matriz[coluna][linha+1]=2;
	ObjMatriz.matriz[coluna][linha+2]=2;
	ObjMatriz.matriz[coluna-1][linha+2]=2;
	// 0 0 0 0 0 2 0 0 0 0
	// 0 0 0 0 0 2 0 0 0 0
	// 0 0 0 0 2 2 0 0 0 0 
}
function PecaCubo()
{
	coluna=(dimX/2)-1;
	linha=0;
	ObjMatriz.matriz[coluna][linha]=3;
	ObjMatriz.matriz[coluna+1][linha]=3;
	ObjMatriz.matriz[coluna][linha+1]=3;
	ObjMatriz.matriz[coluna+1][linha+1]=3;
	// 0 0 0 0 3 3 0 0 0 0
	// 0 0 0 0 3 3 0 0 0 0
}		
function PecaI()
{
	coluna=(dimX/2)-1;
	linha=0;
	ObjMatriz.matriz[coluna][linha]=4;
	ObjMatriz.matriz[coluna][linha+1]=4;
	ObjMatriz.matriz[coluna][linha+2]=4;
	ObjMatriz.matriz[coluna][linha+3]=4;
	// 0 0 0 0 4 0 0 0 0 0 
	// 0 0 0 0 4 0 0 0 0 0
	// 0 0 0 0 4 0 0 0 0 0
	// 0 0 0 0 4 0 0 0 0 0
}	
function PecaT()
{
	coluna=(dimX/2)-1;
	linha=0;
	ObjMatriz.matriz[coluna][linha]=5;
	ObjMatriz.matriz[coluna-1][linha+1]=5;
	ObjMatriz.matriz[coluna][linha+1]=5;
	ObjMatriz.matriz[coluna+1][linha+1]=5;
	// 0 0 0 0 5 0 0 0 0 0
	// 0 0 0 5 5 5 0 0 0 0
}
function PecaU()
{
	coluna=(dimX/2)-1;
	linha=0;
	ObjMatriz.matriz[coluna-1][linha]=6;
	ObjMatriz.matriz[coluna+1][linha]=6;
	ObjMatriz.matriz[coluna-1][linha+1]=6;
	ObjMatriz.matriz[coluna][linha+1]=6;
	ObjMatriz.matriz[coluna+1][linha+1]=6;
	// 0 0 0 6 0 6 0 0 0 0
	// 0 0 0 6 6 6 0 0 0 0
}

function verificarLinha()
{		
	for(contLinha=dimY+3;contLinha>3;contLinha--)
	{
		for(contColuna=0;contColuna<dimX;contColuna++)
		{
			if(ObjMatriz.matriz[contColuna][contLinha] == 0)
			{
				break;
			}
			else
			{
				if (contColuna == (dimX-1))
				{
					linhasEncontradas++;
					descerLinhas(contLinha);
				}
			}
		
		}
	}
}

function descerLinhas(posicao)
{
	for (a=posicao;a>3;a--)
	{ 
		for (b=0;b<dimX;b++)
		{
			ObjMatriz.matriz[b][a] = ObjMatriz.matriz[b][a-1];
		}
	}
	printarNoCanvas();	
	verificarLinha();
}

function pontuar(bonus)
{
	var contapontos = 0;
	
	if (bonus>4)
	{
		bonus = 4;
	}
	
	for (i=0;i<bonus;i++)
	{
		contapontos += 10;
	}	
	contapontos = contapontos * bonus;
	vetor_jogador[jogador].pontos+= contapontos;
	document.getElementById("pontuacao1").innerHTML = "Pontuação: " + vetor_jogador[jogador].pontos; //printa a pontuação do jogador na tela

	if (((vetor_jogador[jogador].pontos/(vetor_jogador[jogador].dificuldade+1)) % 500 > 0) && (vetor_jogador[jogador].pontos >= (500*(vetor_jogador[jogador].dificuldade+1))))
	{
		vetor_jogador[jogador].dificuldade++;
		velocidadeAtual = Math.round(velocidadeAtual * 1.05);
		clearInterval(intervalo);
		controlarQueda(velocidadeAtual);
		document.getElementById("dificuldade1").innerHTML = "Dificuldade: " + vetor_jogador[jogador].dificuldade; //printa a dificuldade atual
	}
	vetor_jogador[jogador].totalLinhas += linhasEncontradas;
	
	document.getElementById("linhaseliminadas").innerHTML = "Linhas: <br>" + vetor_jogador[jogador].totalLinhas; //printa quantas linhas foram completadas
	linhasEncontradas=0;
	
}

// Contagem progressiva
function getTime()
{
	secs++;
	if(secs == 60)
	{
		secs = 0;
		mins++;
		if(mins <= 9)
			mins = "0"+mins;
	}
	
	if(mins == 60)
	{
		mins = "0"+0;
		horas++;
		if(horas <= 9)
			horas = "0"+horas;
	}
	
	if(secs <= 9)
		secs="0"+secs;
	
	clock1.innerHTML = horas + "<font color=#000000>:</font>" + mins + "<font color=#000000>:</font>" + secs;
	timer = setTimeout('getTime()',1000);
}

function Pausar()
{
	clearInterval(intervalo);
	pausa=1;
}

function Retomar()
{
	pausa=0;
	controlarQueda(velocidadeAtual);
}

function atualizarRanking()
{
	var n;
	n = prompt("Seu nome:");
	vetor_jogador[jogador].nome = n;
	
	var tabela = document.getElementById("tabela");

	var pontos = vetor_jogador;
	pontos.sort(decrescente);
	
	limparTabela(tabela);
	printarTabela(tabela,pontos);
}	

function decrescente (x,y)
{
	return y.pontos - x.pontos;
}

function limparTabela(tabela,pontos)
{
	var x=tabela.rows.length;
	while (tabela.rows.length>1)
	{
		tabela.deleteRow(x-1);
		x--;
	}
}

function printarTabela(tabela,pontos)
{
	for(x=1;x<=pontos.length-1;x++)
	{
		var numLinha = tabela.rows.length;
		var novaLinha = tabela.insertRow(numLinha);
		var novaCelula; 
		novaCelula = novaLinha.insertCell(0);
		novaCelula.innerHTML = pontos[x].nome;
		
		novaCelula = novaLinha.insertCell(1);
		novaCelula.innerHTML = pontos[x].pontos;
		
		novaCelula = novaLinha.insertCell(2);
		novaCelula.innerHTML = pontos[x].dificuldade;
		
		novaCelula = novaLinha.insertCell(3);	
		novaCelula.innerHTML = pontos[x].tempo;	
	}
}

var audio = new Audio('Tetris.mp3');

function play() 
{	
   	var audio = document.getElementById('audio');
    if (audio.paused) 
	{
        audio.play();		
    }
	else
	{
        audio.currentTime = 0
    }
}