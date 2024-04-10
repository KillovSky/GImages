<p align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" width="180" height="180" alt="logo_google.png"/></p>  
<h5 align="center"><a href="https://google.com">[Source: Wikipedia]</a></h5>  
  
## Instalação:  
- Rode o código abaixo para instalar via `NPM`:  
  
```bash  
$ npm i @killovsky/gimages  
```  
  
- Rode o código abaixo para instalar via `GIT`:  
```bash  
$ git clone https://github.com/KillovSky/GImages.git  
$ cd GImages  
$ npm i  
```  
  
## O que este módulo faz?  
- Ele realiza a busca de imagens no serviço de imagens do [Google](https://images.google.com/) de forma ilimitada e bem simples.  
  
## O que este módulo tem de especial?  
- Assim como o da [NASA](https://github.com/KillovSky/NASA), muitas coisas, confira abaixo:  
  
------  
> 1. Neste módulo, os erros não afetam o funcionamento, o que significa que apesar de qualquer erro, os valores 'sempre' estarão lá para que você não seja afetado.  
>  
> 2. Os erros serão inseridos na resposta com uma explicação sobre o que causou eles, facilitando para você entender.  
>  
> 3. Os headers estão inseridos na resposta, facilitando para saber detalhes que podem lhe ser uteis.  
>  
> 4. Existe apenas uma dependência de módulo, sendo o [Axios](https://www.npmjs.com/package/axios), o restante é feito usando o puro `Node.js`.  
>  
> 5. Cada linha do código possui uma explicação do que está rodando ou vai rodar, ou seja, o código INTEIRO é explicado, linha por linha.   
>  
> 6. A função funciona em formato assincrono (await) e evita coisas como `while` e funções que possam levar a erros de memória e demais.  
>  
> 7. E muitas outras coisas, confira o código para entender!  
------  
  
## Como testar este módulo:  
- Basta abrir um terminal na pasta do módulo e digitar:  
  
```bash  
$ npm test  
```  
  
## Como utilizar este módulo:  
- Existem diversas formas de utilizar, mas como se trata de um script que faz uso de `Async`, irei dar dois exemplos que funcionam bem, lembrando, você pode rodar sem especificar nada pois também funciona desta forma.   
- Clique em uma das linhas/setas abaixo para exibir os detalhes!  
  
<details>  
<summary><code>Descrição de cada parâmetro da execução:</code></summary>  
  
```javascript  
/* (USE AWAIT) Function especificada */  
get({  
    query: 'Anime',
    safe: true,
    useragent: 'Mozilla....',
    searchURL: 'https://images....',
    formats: ['jpg', 'png'],
    filter: ['-site:gstatic.com'],
    regexp: /[0-9]+/gi,
    rawQuery: '&tbs=ic:trans',
    showerror: false,
    only: ['pinterest', 'devianart']
})  
  
/* ------------------------------------- *  
* 1° - query  
* Valores: String  
* O que é: O que você quiser achar  
* Padrão: 'IMAGE_TESTING_SFW1'  
* ---------------------------------------  
* 2° - safe  
* Valores: Boolean (true/false)  
* O que é: Google Safe Search, remove +18  
* Padrão: true   
* ---------------------------------------  
* 3° - useragent  
* Valores: String  
* O que é: A identificação do request  
* Padrão: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'  
* ---------------------------------------  
* 4° - searchURL  
* Valores: String  
* O que é: A URL que efetuará a busca    
* Padrão: 'http://images.google.com/search?'   
* ---------------------------------------  
* 5° - formats  
* Valores: Array  
* O que é: A lista de imagens permitidas  
* Padrão: [".jpg",".jpeg",".png",".gif",".bmp",".svg",".tiff",".ico"]  
* ---------------------------------------  
* 6° - filter  
* Valores: Array  
* O que é: URLs que não deve procurar  
* Padrão: ["gstatic.com"]   
* ---------------------------------------  
* 7° - regexp  
* Valores: RegExp  
* O que é: a RegExp responsável por filtrar resultados  
* Padrão: /\["(http.+?)",(\d+),(\d+)\]/gi  
* ---------------------------------------  
* 8° - rawQuery  
* Valores: String  
* O que é: Uma query adicional que não é codificada em URI, use para enviar parametros com '&' e outros do tipo    
* Padrão: ''   
* ---------------------------------------  
* 9° - showerror  
* Valores: Boolean  
* O que é: Se é permitido printar erros na tela ou se apenas colocará no Object final os detalhes  
* Padrão: false  
* ---------------------------------------  
* 10° - only  
* Valores: Array  
* O que é: Define a busca para puxar imagens apenas dessas URLs  
* Padrão: []   
* ------------------------------------- */   
  
/* Function sem especificar [Modo Teste]  */
get()  
  
/* Retorna o JSON padrão */  
defaults()  
  
/* Retorna os códigos HTTP */  
http()  
  
/* Retorna a package JSON */  
packages()  
  
/* defaultSearch é a configuração da busca, você pode editar em tempo real sem precisar abrir no arquivo */  
```  
  
</details>   
  
<details>  
<summary><code>Exemplos de uso:</code></summary>  
  
```javascript  
/* Usando .then | Modo de uso padrão */  
const gimages = require('@killovsky/gimages');  
gimages.get('anime girls').then(data => {  
	/* Faça seu código baseado na object 'data' aqui */  
	/* Exemplo: console.log(data); */  
})  
  
/* Usando await [async] | Modo de uso padrão */  
const gimages = require('@killovsky/gimages');  
const data = await gimages.get({ query: 'anime', safe: false });  
/* Faça seu código aqui usando a const 'data' */  
/* Exemplo: console.log(data); */  
```  
  
</details>  
  
<details>  
<summary><code>Código já prontos [.then]:</code></summary>  
  
```javascript  
/* Código usando .then */  
const gimages = require('@killovsky/gimages');  
gimages.get({ query: 'Shinji Ikari', safe: true, showerror: true }).then(data => console.log(data));  
```  
  
</details>  
  
<details>  
<summary><code>Código já prontos [async/await]:</code></summary>  
  
```javascript  
/* Código usando await */   
const gimages = require('@killovsky/gimages');  
const data = await gimages.get({ query: 'Asuka Langley', safe: false, showerror: false });  
console.log(data);  
  
/* Se você não sabe criar uma função async ou ainda não tiver uma, use este código abaixo: */  
(async () => {  
	// Cole um código com await aqui dentro  
})();  
```  
  
</details>  
  
<details>  
<summary><code>Exemplo de resultado com explicações:</code></summary>  
  
```JSON  
{  
	"date": "String | Data [YYYY-MM-DD HH:MM:SS]",  
	"error": "true | false",  
	"message": "String / false | Mensagem adicional de erro",  
	"code": "Number | String | Código de erro HTTP",  
	"defaultSearch": {
		"...": "Já explicado nos exemplos."
	},
	"search": {
		"amount": "Number | Quantidade de imagens obtidas",
		"error": "Boolean | Define se deu erros",
		"message": "String | Uma mensagem para ajudar a entender melhor"
	},
	"explain": {  
		"code": "Number / String | Código escrito de HTTP",  
		"why": "String | Explicação do código HTTP"  
	},  
	"headers": {  
		"Accept": "String | Tipos de valores aceitos no request",
		"User-Agent": "String | A identificação do request",
		"Accept-Encoding": "String | Os tipos de encoding permitidos nesse request",  
		"Outros": "Any | Podem haver mais eventualmente"  
	},  
	"images": [  
		{  
			"url": "String | URL da imagem que foi encontrada",  
			"width": "Number | A largura da imagem"  
			"height": "Number | A altura da imagem"  
		}  
	]  
}  
```  
  
</details>  
  
<details>  
<summary><code>Exemplo utilizável de resultado:</code></summary>  
  
```JSON  
{  
    "date": "10/04/2024 15:30:00",  
	"error": false,  
	"message": false,  
	"code": 200,  
	"defaultSearch": {  
		"query": "IMAGE_TESTING_SFW1",  
		"rawQuery": "",  
		"safe": true,  
		"useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",  
		"searchURL": "http://images.google.com/search?",  
		"formats": [  
		    ".jpg",  
		    ".jpeg",  
		    ".png",  
		    ".gif",  
		    ".bmp",  
		    ".svg",  
		    ".tiff",  
		    ".ico"  
		],  
		"filter": [  
		    "gstatic.com"  
		],  
		"only": [],  
		"showerror": false  
	},  
	"search": {  
		"amount": 0,  
		"error": true,  
		"message": "Test mode only, no search has been set."  
	},  
	"explain": {  
		"code": "OK",  
		"why": "The request is OK, this response depends on the HTTP method used."  
	},  
	"headers": {  
		"Accept": "application/json, text/plain, */*",  
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",  
		"Accept-Encoding": "gzip, compress, deflate, br"  
	},  
	"images": [  
		{  
			"url": "https://cdn.productimages.abb.com/9PAA00000029405_720x540.png",  
			"width": 540,  
			"height": 495  
		}  
	]  
}  
```  
  
</details>   
  
## Perguntas e Respostas:  
  
- Isso é meio diferente do seu módulo do Projeto APOD da NASA, não é?  
> Sim, assim como todos ficam mais velhos, meus códigos também ficam, ganhei um baita aprendizado desde essa epóca e planejo deixar os códigos ainda melhores.  
>  
- Por que você utilizou um módulo dessa vez?  
> Não achei certo fazer uso do HTTPS ou Fetch, dado que seriam requisitados mais sistemas complexos, o que não é minha ideia aqui, quis dizer simples e fácil.  
>  
- O que é proibido ao usar este módulo?  
> Você jamais deve abusar de qualquer programa, sempre crie um limitador de tempo ou armazene a ultima resposta se caso seja a mesma busca e use ela, evite ficar utilizando um programa deste estilo muitas vezes seguidas sem esperar.  
  
## Suporte  
  
- Se obtiver algum problema, você pode me dizer [Reportando nas Issues](https://github.com/KillovSky/GImages/issues).  
- Confira outros projetos meus [Acessando Isto](https://github.com/KillovSky).  
- Se gostar, doe para me ajudar a continuar desenvolvendo, mais informações [Clicando Aqui](http://linktr.ee/KillovSky)  
- [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FKillovSky%2FGImages&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Views&edge_flat=true)](https://hits.seeyoufarm.com)  