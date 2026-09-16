const form = document.getElementById('transactionForm');
const list = document.getElementById('transactionList');
const emptyMsg = document.getElementById('emptyMsg');
const noDataMsg = document.getElementById('noDataMsg');
const clearAllBtn = document.getElementById('clearAll');
const dateInput = document.getElementById('date');

dateInput.valueAsDate = new Date();

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let chart = null;

const categoryColors = {
  Food: '#f87171', Transport: '#60a5fa', Shopping: '#fbbf24',
  Bills: '#a78bfa', Entertainment: '#4ade80', Other: '#9aa0a6'
};

function save() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function formatCurrency(n) {
  return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function render() {
  // Summary
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  document.getElementById('totalIncome').textContent = formatCurrency(income);
  document.getElementById('totalExpense').textContent = formatCurrency(expense);
  document.getElementById('balance').textContent = formatCurrency(income - expense);

  // List
  list.innerHTML = '';
  emptyMsg.style.display = transactions.length ? 'none' : 'block';

  [...transactions].reverse().forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="tx-info">
        <span class="tx-desc">${escapeHtml(t.description)}</span>
        <span class="tx-meta">${t.category} • ${t.date}</span>
      </div>
      <div style="display:flex; align-items:center;">
        <span class="tx-amount ${t.type}">${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}</span>
        <button class="delete-btn" data-id="${t.id}">✕</button>
      </div>
    `;
    list.appendChild(li);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      transactions = transactions.filter(t => t.id !== Number(btn.dataset.id));
      save();
      render();
    });
  });

  renderChart();
}

function renderChart() {
  const expenses = transactions.filter(t => t.type === 'expense');
  const totals = {};
  expenses.forEach(t => { totals[t.category] = (totals[t.category] || 0) + t.amount; });

  const canvas = document.getElementById('categoryChart');
  noDataMsg.style.display = expenses.length ? 'none' : 'block';
  canvas.style.display = expenses.length ? 'block' : 'none';

  if (chart) chart.destroy();
  if (!expenses.length) return;

  chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: Object.keys(totals),
      datasets: [{
        data: Object.values(totals),
        backgroundColor: Object.keys(totals).map(c => categoryColors[c] || '#9aa0a6'),
        borderWidth: 0
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom', labels: { color: '#e8e8e8' } } }
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  transactions.push({
    id: Date.now(),
    description: document.getElementById('description').value.trim(),
    amount: parseFloat(document.getElementById('amount').value),
    type: document.getElementById('type').value,
    category: document.getElementById('category').value,
    date: document.getElementById('date').value
  });
  save();
  render();
  form.reset();
  dateInput.valueAsDate = new Date();
});

clearAllBtn.addEventListener('click', () => {
  if (transactions.length && confirm('Clear all transactions?')) {
    transactions = [];
    save();
    render();
  }
});

render();
