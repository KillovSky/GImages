/* Chama o módulo */
const gimages = require('./index');

/* Simula a busca do Google, para evitar usos desnecessários e um possivel bloqueio */
gimages.get('IMAGE_TESTING_SFW1').then((data) => console.log(data));
