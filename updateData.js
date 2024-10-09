import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function updateData(info) {
    dbFileCheck();

    try {
        const { id } = await inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What's the ID of the person you want to update?",
            },
        ]);

        let user;
        info.forEach((element) => {
            if (element.id === id) {
                user = element;
                updateDetails(user, info);
            }
        })
    } catch (error) {
        console.error(`Algo malo ocurrió: ${error.message}`);
    }
}

async function updateDetails(user, info) {
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
            }
        ]);

        user.name = name;
        user.phone = phone;
        user.age = age;

        await fs.writeFile("./db.json", JSON.stringify(info, null, 2), (err) => {
            if (err) {
                console.error(`Algo malo ocurrió: ${err.message}`);
            } else {
                console.log("Contact updated successfully!");
            }
        });
    } catch (error) {
        console.error(`Algo malo ocurrió: ${error.message}`);
    }
}

queryDB(updateData);