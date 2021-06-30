// Include this line at the top of the JS file after build
// #!/usr/bin/env node 

import fs from 'fs';

const args: string[] = process.argv;
const fileName: string = args[2];
const filePath: string = `${process.cwd()}/${fileName}`;

const payload: number[] = Array.from({ length: 2**12 }, (): number => {
    return Math.floor(Math.random() * (1 - 0 + 1));
})

/**
 * Corrupts the file given to it.
 *  
 * @param path - The path to the file which is to be corrupted
 * @returns - nothing
*/
const corruptor = (path: string): void => {
    try {
        if (fs.readFileSync(path)) {
            const fileData: string = fs.readFileSync(path, 'utf8');
            const writeData: string = fileData + payload.toString();
            fs.writeFileSync(path, writeData);
            console.log('\x1b[32m', `${path} Corrupted Succesfully :)`);
        }  
    } catch (err) {
        console.log('\x1b[31m', err);
    }
}

if (fileName === undefined) {
    console.log('\x1b[31m', '\nPlease pass in a file as an argument');
    process.exit(1);
} else {
    corruptor(filePath);
}
