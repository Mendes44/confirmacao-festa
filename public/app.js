document.getElementById('confirmationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const attendance = document.getElementById('attendance').value;
    const drink = document.getElementById('drink').value;

    if (name === "") {
        alert("Por favor, insira seu nome.");
        return;
    }

    const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, attendance, drink })
    });

    const result = await response.json();
    document.getElementById('responseMessage').innerText = result.message;

    loadConfirmations();
});

async function loadConfirmations() {
    const response = await fetch('/api/confirmations');
    const confirmations = await response.json();

    const confirmationList = document.getElementById('confirmationList');
    confirmationList.innerHTML = '';

    confirmations.forEach(confirmation => {
        const listItem = document.createElement('li');
        listItem.textContent = `${confirmation.Nome} - Presença: ${confirmation.Presença} - Vai Beber: ${confirmation.Bebida}`;
        confirmationList.appendChild(listItem);
    });
}

// Carregar lista de confirmações ao iniciar
document.addEventListener('DOMContentLoaded', loadConfirmations);
