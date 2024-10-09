import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

export default async function addData(info) {
    try {
        const { name, phone, age } = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What's your name?",
              },
              {
                type: "number",
                name: "phone",
                message: "What's your phone?",
              },
              {
                type: "list",
                name: "age",
                message: "Are you an adult?",
                choices: [
                    { name: "Y", value: "Adult" },
                    { name: "N", value: "Minor" },
                ],
            },
        ]);

        const data = {
            id: uuidv4(),
            name: name.toLowerCase(),
            phone: phone,
            age: age,
        };

        info.push(data);

        if (fs.existsSync("db.json")) {
            await fs.writeFile("db.json", JSON.stringify(info, null, 2), (err) => {
                if (err) {
                    console.error("Error al escribir en el archivo db.json", err);
                    process.exit(1);
                }
            });
        } else {
            fs.appendFile("db.json", "[]", function (err) {
                if (err) {
                    console.error("Error al crear el archivo db.json", err);
                    process.exit(1);
                }
                console.log("Archivo db.json creado");
                createDetails(info);
            });
        }
    } catch (error) {
        console.error(`Algo ocurrió: ${error.message}`);
    }
}

async function createDetails(info) {
    /*append y wrtite son similares, pero append agrega el contenido al final del archivo, mientras que write lo sobreescribe*/
    await fs.writeFile("db.json", JSON.stringify(info, null, 2), (err) => { 
        if (err) {
            console.error("Error al escribir en el archivo db.json", err);
            process.exit(1);
        }
    });
}

queryDB(addData);
