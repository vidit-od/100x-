import { PrismaClient } from '@prisma/client'
import { indianFirstNames, indianLastNames, allCharacters } from './names';

const client = new PrismaClient();

async function CreateUser(firstName:string, lastName:string, username:string, password:string) {
    const res = await client.user.create({
        data:{
            firstname: firstName,
            lastname: lastName,
            username,
            password
        }
    })
}
const batchSize = 10000; // Adjust the batch size as needed
const totalEntries = 100* batchSize;
let Entries = totalEntries;

function generatePassword(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

async function processBatch(batchSize:number) {
    while (Entries > 0 && batchSize > 0) {
        const temp1 = Math.floor(Math.random() * indianFirstNames.length);
        const first = indianFirstNames[temp1];
        const temp2 = Math.floor(Math.random() * indianLastNames.length);
        const last = indianLastNames[temp2];

        const username = first + last + Math.floor(Math.random() * 1000) + Entries + '@gmail.com';
        const password = generatePassword(Math.floor(Math.random() * 30) + 10);

        // Replace this with your actual database insert function
        await CreateUser(first, last, username, password);

        Entries--;
        batchSize--;
    }
}

async function main() {
    let num = 0
    const before = Date.now();
    while (Entries > 0) {
        await processBatch(batchSize);
        console.log(`batch ${num} complete`);
        num = num+1;
    }
    const after = Date.now();
    console.log(`\nAll entries have been added to the database. Time : ${after - before} ms`);
}

main();
