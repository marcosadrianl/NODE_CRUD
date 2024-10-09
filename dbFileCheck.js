/*
    dbFileCheck.js: revisa que exista un archivo db.json y lo crea si no existe.
*/

import fs from 'fs';

export default function dbFileCheck() {
    if (!fs.existsSync('./db.json')) {
        fs.writeFileSync('./db.json', '[]', 'utf-8');
        console.log('db.json creado');
        process.exit(1);
    }
}
