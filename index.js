/* eslint-disable max-len */
/* Dependencias */
const axios = require('axios');
const queryString = require('querystring');
const httpcodes = require('./codes.json');
const response = require('./default.json');
const mopack = require('./package.json');

/* Define uma object padrão para usar no caso de enviar valores invalidos */
const {
    defaultSearch,
} = response;
defaultSearch.regexp = /\["(http.+?)",(\d+),(\d+)\]/gi;

/* JS DOC para Visual Studio Code ou outros */
/**
 * Realiza uma busca de imagens no serviço de imagens do Google de forma ilimitada e simples.
 * @param {Object} param - Parâmetros da busca de imagens.
 * @param {string} [param.query='IMAGE_TESTING_SFW1'] - O que você deseja buscar.
 * @param {boolean} [param.safe=true] - Define se a busca deve ser feita de forma segura, removendo conteúdo impróprio.
 * @param {string} [param.useragent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'] - A identificação do request.
 * @param {string} [param.searchURL='http://images.google.com/search?'] - A URL que efetuará a busca.
 * @param {Array} [param.formats=['.jpg','.jpeg','.png','.gif','.bmp','.svg','.tiff','.ico']] - Lista de formatos de imagens permitidos.
 * @param {Array} [param.filter=['gstatic.com']] - URLs que não devem ser incluídas nos resultados da busca.
 * @param {RegExp} [param.regexp=/\["(http.+?)",(\d+),(\d+)\]/gi] - Expressão regular responsável por filtrar resultados.
 * @param {string} [param.rawQuery=''] - Uma query adicional que não é codificada em URI, usada para enviar parâmetros com '&' e outros.
 * @param {boolean} [param.showerror=false] - Define se é permitido exibir erros na tela ou se apenas serão colocados no objeto final os detalhes.
 * @param {Array} [param.only=[]] - Define a busca para puxar imagens apenas dessas URLs.
 * @returns {Promise<Object>} - Uma Promise que resolve com um objeto contendo os resultados da busca.
 */
/* Cria a exports para atuar como função */
async function searchImages(param = defaultSearch) {
    /* Define o param para assignment externo depois */
    let paramSearch = param;

    /*
        Adiciona a execução dentro de uma try-catch
        Assim evita falhas como enviar um 'Symbol' no param
    */
    try {
        /* Se param for uma string, faz uma Object apartir dela */
        if (typeof param === 'string') {
            /* Apenas da query, outros permanecem em defaultSearch */
            paramSearch = {
                query: param,
            };
        }

        /* Verifica se o 'paramSearch' é de fato uma Object, mas não Array */
        if (typeof paramSearch === 'object' && !Array.isArray(paramSearch)) {
            /* Se ele for, define os parametros da busca */
            let {
                query = defaultSearch.query,
                safe = defaultSearch.safe,
                useragent = defaultSearch.useragent,
                searchURL = defaultSearch.searchURL,
                formats = defaultSearch.formats,
                filter = defaultSearch.filter,
                regexp = defaultSearch.regexp,
                rawQuery = defaultSearch.rawQuery,
                showerror = defaultSearch.showerror,
                only = defaultSearch.only,
            } = paramSearch;

            /* CORREÇÃO DE PARAMETROS */
            /* Melhor uma correção do que um código dando crash! */

            /* Verifica se a query é uma string, e se não for */
            if (typeof query !== 'string') {
                /* Define como a execução teste */
                query = defaultSearch.query;
            }

            /* Verifica se a query é uma string, e se não for */
            if (typeof rawQuery !== 'string') {
                /* Define como a execução teste */
                rawQuery = defaultSearch.rawQuery;
            }

            /* Se a query for modo teste, retorna aqui mesmo o resultado */
            if (query === 'IMAGE_TESTING_SFW1') return response;

            /* Verifica se a safe é uma boolean, e se não for */
            if (typeof safe !== 'boolean') {
                /* Define como padrão */
                safe = defaultSearch.safe;
            }

            /* Verifica se a useragent é uma string, e se não for */
            if (typeof useragent !== 'string') {
                /* Define como padrão */
                useragent = defaultSearch.useragent;
            }

            /* Verifica se a showerror é uma string, e se não for */
            if (typeof showerror !== 'boolean') {
                /* Define como padrão */
                showerror = defaultSearch.showerror;
            }

            /* Verifica se a searchURL é uma string, e se não for */
            if (typeof searchURL !== 'string') {
                /* Define como padrão */
                searchURL = defaultSearch.searchURL;
            }

            /* Verifica se a formats é uma array, e se não for */
            if (!Array.isArray(formats)) {
                /* Define como padrão */
                formats = defaultSearch.formats;
            }

            /* Verifica se a filter é uma array, e se não for */
            if (!Array.isArray(filter)) {
                /* Define como padrão */
                filter = defaultSearch.filter;
            }

            /* Verifica se a filter é uma array, e se não for */
            if (!Array.isArray(only)) {
                /* Define como padrão */
                only = defaultSearch.only;
            }

            /* Verifica se a regexp é uma expressão regular, e se não for */
            if (!(regexp instanceof RegExp)) {
                /* Define como padrão */
                regexp = defaultSearch.regexp;
            }

            /* INICIAR A FUNÇÃO DE BUSCA */
            /* Vai usar tudo que foi configurado acima */

            /*
                Define o uso da URL base, modo seguro
                e encoda o resto da busca para que funcione em outros idiomas
            */
            /* A rawquery não é encodada, caso você queira usar algo adicional, comece com & */
            const requestURL = searchURL + (safe === true ? 'safe=on&' : '') + queryString.stringify({
                tbm: 'isch',
                q: query,
            }) + rawQuery;

            /* Faz a busca */
            const information = await axios.get(requestURL, {
                headers: {
                    'User-Agent': useragent,
                },
            });

            /* FORMATAR OS DADOS RECEBIDOS */
            /* Aqui usaremos RegExp, filter e outros sistemas */

            /* Define no JSON o código HTTP da busca */
            response.code = information.status;

            /* Define a data que finalizou */
            response.date = new Date().toLocaleString();

            /* Define a explicação do request */
            response.explain = httpcodes[information.status];

            /* Define os headers que usou */
            response.headers = information.config.headers;

            /* Define os dados da defaultSearch no JSON */
            response.defaultSearch = {
                query,
                safe,
                useragent,
                searchURL,
                formats,
                filter,
                regexp,
                rawQuery,
                showerror,
                only,
            };

            /* Define uma array para preencher com resultados */
            let results = [];

            /* Define os resultados iniciais, ainda precisam de formatação */
            let infodata = information.data.match(regexp);

            /* Filtra apenas os que contém imagens */
            infodata = infodata.filter((src) => formats.some((res) => src.includes(res)));

            /* Faz a filtragem pelos sites bloqueados */
            infodata = infodata.filter((src) => !filter.some((res) => src.includes(res)));

            /* Faz a filtragem pelos sites requisitados, se houver */
            infodata = (only.length > 0
                ? infodata.filter((src) => only.some((res) => src.includes(res)))
                : infodata
            );

            /* Se houver algum resultado acima */
            if (infodata.length > 0) {
                /* Faz um forEach para preencher a results com uma array correta */
                infodata.forEach((src) => {
                    /* Tenta fazer parse */
                    try {
                        /* Se bem sucedido, vai retornar uma Object */
                        const parsedObj = JSON.parse(src);

                        /* Verifica se é imagem de novo */
                        if (formats.some((fex) => (parsedObj[0] || 'NOPE').includes(fex))) {
                            /* Joga o resultado na array como object formatada */
                            results.push({
                                url: parsedObj[0] || 'DROPTHIS',
                                width: parsedObj[1] || 0,
                                height: parsedObj[2] || 0,
                            });
                        }

                        /* Se tiver dado algum erro no parse */
                    } catch (err) {
                        /* Insere no JSON final */
                        response.error = {
                            error: true,
                            message: err.message,
                        };

                        /* Se permite printar erros */
                        if (showerror === true) {
                            /* Faz no formato console.error */
                            console.error(err);
                        }
                    }
                });
            }

            /* Remove valores errados */
            results = results.filter((res) => !res.url.includes('DROPTHIS'));

            /* Se não achou resultados */
            if (results.length <= 0) {
                /* Define como os padrões para que ainda tenha resultados */
                results = response.images;

                /* Define como zero resultados no JSON */
                response.search = {
                    amount: 0,
                    error: true,
                    message: 'The number of IMAGE results was zero (4xx), to avoid major errors, the results were switched to a standard list.',
                };

                /* Se teve algum */
            } else {
                /* Define os dados no JSON */
                response.search = {
                    amount: results.length,
                    error: false,
                    message: false,
                };

                /* Define as imagens */
                response.images = results;
            }
        }

        /* Caso der erro em alguma coisa, não afeta o resultado e cai no catch abaixo */
    } catch (error) {
        /* Define como erro direto na raiz */
        response.error = true;
        response.code = error.code;
        response.message = error.message;

        /* Se permite printar erros */
        if (response.defaultSearch.showerror === true) {
            /* Faz no formato console.error */
            console.error(error);
        }
    }

    /* Retorna o que achou/o padrão */
    return response;
}

/* Obtém os dados do modo de teste */
function getExamples() {
    /* Apenas fazendo return do JSON padrão mesmo */
    return response;
}

/* Obtém os dados de códigos HTTP */
function getHTTPcodes() {
    /* Apenas fazendo return do JSON mesmo */
    return httpcodes;
}

/* Obtém os dados da package.json */
function getPackageJSON() {
    /* Apenas fazendo return do JSON mesmo */
    return mopack;
}

/* Define a module.exports com as funções */
module.exports = {
    get: searchImages,
    defaults: getExamples,
    http: getHTTPcodes,
    packages: getPackageJSON,
    defaultSearch,
};
