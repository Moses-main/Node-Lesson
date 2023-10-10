const fsPromises = require('fs').promises;
const { writeFile } = require('fs');
const path = require('path');

const fileOps =async ()=>{
    try {
        // reading the file
        const data = await fsPromises.readFile(path.join(__dirname, 'New file.txt'),'utf8');
        console.log(data);
        // writing the file
        await fsPromises.writeFile(path.join(__dirname, 'NewlyFile.txt'), data);        
        // appending to the file
        await fsPromises.appendFile(path.join(__dirname, 'NewlyFile.txt'), "\n\nNice to meet you again",'utf8');
        // renaming the file
        await fsPromises.rename(path.join(__dirname, 'NewlyFile.txt'), path.join(__dirname, 'renameFile.txt'));
        // reading the file
        const Newdata = await fsPromises.readFile(path.join(__dirname, 'renameFile.txt'),'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

fileOps()
