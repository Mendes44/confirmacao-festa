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
