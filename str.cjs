const fs = require('fs');
const path = require('path');

function listProjectStructure(dir, level = 0, parent = '', output = []) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        if (item === 'node_modules' || item === '.git' || item === 'build' || item.startsWith('.')) continue;
        
        const fullPath = path.join(dir, item);
        const isDirectory = fs.statSync(fullPath).isDirectory();

        
        output.push('  '.repeat(level) + (isDirectory ? '📁 ' : '📄 ') + item);
        
        if (isDirectory) {
            listProjectStructure(fullPath, level + 1, item, output);
        }
    }
    return output;
}

const outputFile = 'project_structure.txt';
const projectStructure = listProjectStructure('.');
fs.writeFileSync(outputFile, projectStructure.join('\n'), 'utf-8');

console.log(`Cấu trúc thư mục đã được ghi vào ${outputFile}`);
