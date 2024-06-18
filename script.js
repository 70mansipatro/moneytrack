document.getElementById('transaction-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount, type })
    });

    if (response.ok) {
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        loadTransactions();
    }
});

async function loadTransactions() {
    const response = await fetch('/api/transactions');
    const transactions = await response.json();

    const transactionsList = document.getElementById('transactions-list');
    transactionsList.innerHTML = '';

    let balance = 0;

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.textContent =`${transaction.description}: $${transaction.amount.toFixed(2)}`;
        transactionsList.appendChild(li);

        if (transaction.type === 'income') {
            balance += transaction.amount;
        } else {
            balance -= transaction.amount;
        }
    });

    document.getElementById('balance').textContent = balance.toFixed(2);
}

window.onload = loadTransactions;