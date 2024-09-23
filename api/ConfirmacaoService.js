const { google } = require('googleapis');
const fs = require('fs');

// Carregue as credenciais JSON da conta de serviço
const credentials = JSON.parse(fs.readFileSync('./credentials.json'));

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'] // Escopo para acessar o Google Sheets
});

// O ID da sua planilha do Google
const SPREADSHEET_ID = 'SUA_PLANILHA_ID';

class ConfirmacaoService {
    constructor() {
        this.authClient = null;
    }

    // Inicializa o cliente de autenticação
    async init() {
        if (!this.authClient) {
            this.authClient = await auth.getClient();
        }
    }

    // Adiciona uma nova confirmação na planilha
    async addConfirmation(data) {
        await this.init();

        const sheets = google.sheets({ version: 'v4', auth: this.authClient });
        const request = {
            spreadsheetId: SPREADSHEET_ID,
            range: 'Página1!A:D', // A faixa da planilha onde os dados serão inseridos
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [[data.Nome, data.Presença, data.Bebida, new Date().toLocaleString()]]
            }
        };

        await sheets.spreadsheets.values.append(request);
    }

    // Obtém todas as confirmações da planilha
    async getAllConfirmations() {
        await this.init();

        const sheets = google.sheets({ version: 'v4', auth: this.authClient });
        const request = {
            spreadsheetId: SPREADSHEET_ID,
            range: 'Página1!A:D' // O intervalo da planilha de onde os dados serão obtidos
        };

        const response = await sheets.spreadsheets.values.get(request);
        const rows = response.data.values || [];
        const confirmations = rows.map(row => ({
            Nome: row[0],
            Presença: row[1],
            Bebida: row[2],
            'Data e Hora': row[3]
        }));

        return confirmations;
    }

    // Verifica se o nome já existe na planilha
    async isDuplicateName(name) {
        const confirmations = await this.getAllConfirmations();
        return confirmations.some(confirmation => confirmation.Nome.toLowerCase() === name.toLowerCase());
    }
}

module.exports = ConfirmacaoService;
