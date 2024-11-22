/* eslint-disable max-len */

/* Dependências */
const axios = require('axios');
const queryString = require('querystring');
const httpcodes = require('./codes.json');
const mopack = require('./package.json');

/**
 * @typedef {Object} response
 * @property {string} date - Data e hora da resposta.
 * @property {boolean} error - Indica se houve um erro na resposta.
 * @property {boolean} message - Indica se há uma mensagem adicional de erro ou não.
 * @property {number} code - Código HTTP da resposta.
 * @property {Object} defaultSearch - Detalhes sobre a pesquisa padrão.
 * @property {string} defaultSearch.query - A consulta de pesquisa padrão.
 * @property {string} defaultSearch.rawQuery - A consulta bruta.
 * @property {boolean} defaultSearch.safe - Indica se a pesquisa deve ser segura.
 * @property {string} defaultSearch.useragent - O user agent usado para a pesquisa.
 * @property {string} defaultSearch.searchURL - URL base para pesquisa.
 * @property {string[]} defaultSearch.formats - Formatos de imagem permitidos na pesquisa.
 * @property {string[]} defaultSearch.filter - Filtros aplicados à pesquisa.
 * @property {string[]} defaultSearch.only - Restrições específicas de pesquisa.
 * @property {boolean} defaultSearch.exact - Indica se a busca deve ser exata.
 * @property {boolean} defaultSearch.showerror - Indica se erros devem ser mostrados.
 * @property {Object} search - Detalhes sobre o resultado da pesquisa.
 * @property {number} search.amount - Quantidade de resultados encontrados na pesquisa.
 * @property {boolean} search.error - Indica se houve um erro na pesquisa.
 * @property {string} search.message - Mensagem de erro relacionada à pesquisa.
 * @property {Object} explain - Explicações sobre o status da resposta.
 * @property {string} explain.code - Código explicativo sobre o status da resposta.
 * @property {string} explain.why - Razão do status da resposta.
 * @property {Object} headers - Cabeçalhos HTTP da resposta.
 * @property {string} headers.Accept - Tipos de conteúdo aceitos pela resposta.
 * @property {string} headers['User-Agent'] - O user agent da requisição.
 * @property {string} headers['Accept-Encoding'] - Tipos de codificação aceitos pela resposta.
 * @property {Array.<Object>} images - Lista de imagens retornadas.
 * @property {string} images[].url - URL da imagem.
 * @property {number} images[].width - Largura da imagem.
 * @property {number} images[].height - Altura da imagem.
 */
const response = require('./default.json');

/**
 * Configuração padrão para buscas de imagens.
 * @typedef {Object} defaultSearch
 * @property {string} query - Termo de busca.
 * @property {boolean} safe - Ativar busca segura.
 * @property {string} useragent - User-Agent da requisição.
 * @property {string} searchURL - URL base para a busca.
 * @property {string[]} formats - Formatos de imagem permitidos.
 * @property {string[]} filter - Domínios a serem bloqueados.
 * @property {RegExp} regexp - Expressão regular para parsear resultados.
 * @property {string} rawQuery - Parâmetros extras para a URL.
 * @property {boolean} showerror - Exibir mensagens de erro no console.
 * @property {string[]} only - Domínios permitidos explicitamente.
 * @property {string[]} exact - Define se o filtro only será absoluto, permitindo ou não subdominios.
 */
const { defaultSearch } = response;
defaultSearch.regexp = /\["(http.+?)",(\d+),(\d+)\]/gi;

/**
 * @typedef {defaultSearch} SearchConfig
 * @description O tipo `SearchConfig` é idêntico ao tipo de configuração padrão `defaultSearch`.
 * Ele representa as configurações personalizadas que podem ser passadas para a função `searchImages`.
 */

/**
 * Valida e ajusta parâmetros fornecidos pelo usuário.
 * @param {Object} params - Parâmetros fornecidos pelo usuário.
 * @returns {SearchConfig} Configuração combinada.
 */
function validateParams(params) {
    return {
        query: typeof params.query === 'string' ? params.query : defaultSearch.query,
        safe: typeof params.safe === 'boolean' ? params.safe : defaultSearch.safe,
        useragent: typeof params.useragent === 'string' ? params.useragent : defaultSearch.useragent,
        searchURL: typeof params.searchURL === 'string' ? params.searchURL : defaultSearch.searchURL,
        formats: Array.isArray(params.formats) ? params.formats : defaultSearch.formats,
        filter: Array.isArray(params.filter) ? params.filter : defaultSearch.filter,
        regexp: params.regexp instanceof RegExp ? params.regexp : defaultSearch.regexp,
        rawQuery: typeof params.rawQuery === 'string' ? params.rawQuery : defaultSearch.rawQuery,
        showerror: typeof params.showerror === 'boolean' ? params.showerror : defaultSearch.showerror,
        only: Array.isArray(params.only) ? params.only : defaultSearch.only,
        exact: typeof params.exact === 'boolean' ? params.exact : defaultSearch.exact,
    };
}

/**
 * Busca imagens no Google com base em parâmetros fornecidos.
 * @async
 * @param {SearchConfig} param - Configuração personalizada para a busca.
 * @returns {Promise<Object>} Resposta contendo imagens encontradas ou um erro.
 */
async function searchImages(configs = defaultSearch) {
    /* Usa um hard-try para evitar qualquer crash */
    try {
        /* Valida e combina os parâmetros fornecidos */
        const searchParams = validateParams(configs);

        /* Retorna resposta padrão se a query for o termo de teste */
        if (searchParams.query === 'IMAGE_TESTING_SFW1') {
            return response;
        }

        /* Adiciona filtros "only" como cláusulas site: */
        const getURL = searchParams.only.filter((url) => url.includes('http'));
        const onlyFilter = (getURL.length > 0
            ? ` ${searchParams.only.map((domain) => `site:${domain}`).join(' OR ')}`
            : ''
        );

        /* Adiciona filtros como cláusulas -site: */
        const filterURL = searchParams.filter.filter((url) => url.includes('http'));
        const onlySite = (filterURL.length > 0
            ? ` ${searchParams.filter.map((domain) => `-site:${domain}`).join(' AND ')}`
            : ''
        );

        /* Monta a URL de requisição */
        const query = `${searchParams.query}${onlyFilter}${onlySite}`;
        const requestURL = `${searchParams.searchURL}${searchParams.safe ? 'safe=on&' : ''}${queryString.stringify({ tbm: 'isch', q: query })}${searchParams.rawQuery}`;
        console.log(requestURL);

        /* Faz a requisição ao Google */
        const { data, status, config } = await axios.get(requestURL, {
            headers: { 'User-Agent': searchParams.useragent },
        });

        /* Atualiza informações na resposta */
        response.code = status;
        response.date = new Date().toLocaleString();
        response.explain = httpcodes[status];
        response.headers = config.headers;

        /* Filtra e processa os resultados encontrados */
        let results = [];
        let matches = data.match(searchParams.regexp) || [];
        matches = matches.filter((src) => searchParams.formats.some((res) => src.includes(res)));

        /* Verifica resultado a resultado */
        matches.forEach((src) => {
            /* Usa em try para evitar qualquer crash */
            try {
                /* Parseia a string */
                const parsed = JSON.parse(src);

                /* Obtém a URL */
                const url = parsed[0] || '';

                /* Valida formatos, filtros e restrições */
                if (
                    searchParams.formats.some((ext) => url.includes(ext))
                    && searchParams.filter.some((block) => !url.includes(block))
                ) {
                    /* Adiciona a imagem */
                    results.push({
                        url,
                        width: parsed[1] || 0,
                        height: parsed[2] || 0,
                    });

                    /* Se for filtragem exata */
                    if (searchParams.exact === true) {
                        /* DEFINE FILTRAGEM ABSOLUTA, BANE SUBDOMINIOS, USE COM CAUTELA! */
                        const includeURL = searchParams.only.filter((urly) => !urly.includes('http'));
                        const excludeURL = searchParams.filter.filter((urly) => !urly.includes('http'));

                        /* Apenas se only tiver valores */
                        if (searchParams.only.length > 0) {
                            /* Só permite URLs que estejam na lista 'only' */
                            results = (results.filter((surl) => searchParams.only.some((allow) => surl.url.includes(allow))
                                && (includeURL ? surl.url.includes(includeURL) : true))
                            );
                        }

                        /* Apenas se filter tiver valores */
                        if (searchParams.filter.length > 0) {
                            /* Só permite URLs que não estejam na lista 'filter' */
                            results = (results.filter((surl) => searchParams.filter.filter((not) => !surl.url.includes(not))
                                && (excludeURL ? !surl.url.includes(excludeURL) : true))
                            );
                        }
                    }
                }

                /* Se chegar a um crash */
            } catch (err) {
                /* So vai exibir a falha se permitido */
                if (searchParams.showerror) { console.error('Erro ao parsear resultado:', err.message); }
            }
        });

        /* Define os resultados na resposta */
        response.defaultSearch = searchParams;
        response.images = results.length > 0 ? results : response.images;
        response.search = {
            amount: results.length,
            error: results.length === 0,
            message: results.length === 0 ? 'No results' : '',
        };

        /* Se chegar a um HARD crash */
    } catch (err) {
        /* Lida com erros durante a busca */
        response.error = true;
        response.code = err.code || 500;
        response.message = err.message;

        /* So vai exibir a falha se permitido */
        if (configs.showerror) { console.error('Erro ao buscar imagens:', err.message); }
    }

    /* Retorna a resposta final */
    return response;
}

/**
 * Retorna o JSON de exemplo.
 * @returns {Object} JSON de resposta padrão.
 */
function getExamples() {
    return response;
}

/**
 * Retorna os códigos HTTP.
 * @returns {Object} JSON com os códigos HTTP.
 */
function getHTTPcodes() {
    return httpcodes;
}

/**
 * Retorna o conteúdo do package.json.
 * @returns {Object} JSON do package.json.
 */
function getPackageJSON() {
    return mopack;
}

/* Exporta as funções do módulo */
module.exports = {
    get: searchImages,
    defaults: getExamples,
    http: getHTTPcodes,
    packages: getPackageJSON,
    defaultSearch,
};
