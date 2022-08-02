import * as fs from 'fs/promises';

const fs = require('fs');
const file = 'talker.json';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.error(`Não foi possível ler o arquivo ${file}\n Erro: ${err}`);
    process.exit(1);
  }
  console.log(`Conteúdo do arquivo: ${data}`);
});