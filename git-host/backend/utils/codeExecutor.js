const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const runCode = async (code, language) => {
    const tempDir = path.join(__dirname, '../temp'); // Create a temp directory for files
    fs.mkdirSync(tempDir, { recursive: true });
    const filePath = path.join(tempDir, `main.${language.toLowerCase()}`); 

    fs.writeFileSync(filePath, code);
    
    return new Promise((resolve) => {
        exec(`docker run --rm -v ${tempDir}:/app -w /app ${language}`, (error, stdout, stderr) => {
            if (error) {
                resolve({ error: stderr });
            } else {
                resolve({ output: stdout });
            }
        });
    });
};

module.exports = { runCode };