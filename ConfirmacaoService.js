const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

class ConfirmacaoService {
    constructor() {
        this.filePath = path.join(process.cwd(), 'confirmacao_festa.xlsx');
        this.sheetName = 'Confirmações';
        this.createExcelFileIfNotExists();
    }

    createExcelFileIfNotExists() {
        if (!fs.existsSync(this.filePath)) {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet([]);
            XLSX.utils.book_append_sheet(wb, ws, this.sheetName);
            XLSX.writeFile(wb, this.filePath);
        }
    }

    addConfirmation(data) {
        const workbook = XLSX.readFile(this.filePath);
        const worksheet = workbook.Sheets[this.sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        jsonData.push(data);
        const newWorksheet = XLSX.utils.json_to_sheet(jsonData);
        workbook.Sheets[this.sheetName] = newWorksheet;
        XLSX.writeFile(workbook, this.filePath);
    }

    isDuplicateName(name) {
        const data = this.getAllConfirmations();
        return data.some(row => row.Nome.toLowerCase() === name.toLowerCase());
    }

    getAllConfirmations() {
        const workbook = XLSX.readFile(this.filePath);
        const worksheet = workbook.Sheets[this.sheetName];
        return XLSX.utils.sheet_to_json(worksheet);
    }
}

module.exports = ConfirmacaoService;




// const XLSX = require('xlsx');
// const fs = require('fs');

// class ConfirmacaoService {
//     constructor(filePath) {
//         this.filePath = filePath;
//         this.sheetName = 'Confirmações';
//         this.createExcelFileIfNotExists();
//     }

//     // Cria o arquivo Excel se não existir
//     createExcelFileIfNotExists() {
//         if (!fs.existsSync(this.filePath)) {
//             const wb = XLSX.utils.book_new();
//             const ws = XLSX.utils.json_to_sheet([]);
//             XLSX.utils.book_append_sheet(wb, ws, this.sheetName);
//             XLSX.writeFile(wb, this.filePath);
//         }
//     }

//     // Adiciona dados à planilha
//     addConfirmation(data) {
//         const workbook = XLSX.readFile(this.filePath);
//         const worksheet = workbook.Sheets[this.sheetName];

//         const jsonData = XLSX.utils.sheet_to_json(worksheet);
//         jsonData.push(data);

//         const newWorksheet = XLSX.utils.json_to_sheet(jsonData);
//         workbook.Sheets[this.sheetName] = newWorksheet;

//         XLSX.writeFile(workbook, this.filePath);
//     }

//     // Verifica se o nome já existe na planilha
//     isDuplicateName(name) {
//         const data = this.getAllConfirmations();
//         return data.some(row => row.Nome.toLowerCase() === name.toLowerCase());
//     }

//     // Obtém todos os dados da planilha
//     getAllConfirmations() {
//         const workbook = XLSX.readFile(this.filePath);
//         const worksheet = workbook.Sheets[this.sheetName];
//         return XLSX.utils.sheet_to_json(worksheet);
//     }
// }

// module.exports = ConfirmacaoService;
