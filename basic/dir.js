// creating a new directory
const fs = require('fs');

// checking if the directory exists
if (!fs.existsSync('./new')){
    // Block of code to create the directory
    fs.mkdir('./new', (err)=> {
        if (err) throw err;
        console.log('Directory created');
    });
}else
{
    // Tell the user that the directory already exists
    console.log('Directory already exists');
}

// block of code that deletes the directory
if (fs.existsSync('./new')){
    // Block of code to create the directory
    fs.rmdir('./new', (err)=> {
        if (err) throw err;
        console.log('Directory removed successfully');
    });
}else
{
    // Tell the user that the directory doesnt exist
    console.log('Directory doesnt exist');
}
