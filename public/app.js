document.getElementById('confirmationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const attendance = document.getElementById('attendance').value;
    const drink = document.getElementById('drink').value;

    if (name === "") {
        alert("Por favor, insira seu nome.");
        return;
    }

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, attendance, drink })
        });

        // Verifique se a resposta está OK
        if (!response.ok) {
            const errorMessage = await response.text(); // Pega o erro retornado pelo servidor
            throw new Error(`Erro na requisição: ${errorMessage}`);
        }

        const result = await response.json();
        document.getElementById('responseMessage').innerText = result.message;

        loadConfirmations();
    } catch (error) {
        console.error('Erro na requisição:', error);
        document.getElementById('responseMessage').innerText = 'Ocorreu um erro. Tente novamente.';
    }
});

async function loadConfirmations() {
    try {
        const response = await fetch('/api/confirmations');
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro ao carregar confirmações: ${errorMessage}`);
        }

        const confirmations = await response.json();

        const confirmationList = document.getElementById('confirmationList');
        confirmationList.innerHTML = '';

        confirmations.forEach(confirmation => {
            const listItem = document.createElement('li');
            listItem.textContent = `${confirmation.Nome} - Presença: ${confirmation.Presença} - Vai Beber: ${confirmation.Bebida}`;
            confirmationList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao carregar confirmações:', error);
        document.getElementById('responseMessage').innerText = 'Ocorreu um erro ao carregar a lista.';
    }
}

// Carregar lista de confirmações ao iniciar
document.addEventListener('DOMContentLoaded', loadConfirmations);
