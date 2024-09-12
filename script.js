// Initialize Charts
let expenseChart, savingChart, investmentChart;

// Function to initialize charts
function initializeCharts(expenses, savings, investments) {
  const expenseCtx = document.getElementById('expenseChart').getContext('2d');
  const savingCtx = document.getElementById('savingChart').getContext('2d');
  const investmentCtx = document.getElementById('investmentChart').getContext('2d');

  // Expense Chart
  expenseChart = new Chart(expenseCtx, {
    type: 'doughnut', // Changed to donut chart
    data: {
      labels: Object.keys(expenses),
      datasets: [{
        data: Object.values(expenses),
        backgroundColor: ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6']
      }]
    },
    options: {
      responsive: true
    }
  });

  // Saving Chart
  savingChart = new Chart(savingCtx, {
    type: 'bar', // Option to change this type
    data: {
      labels: Object.keys(savings),
      datasets: [{
        label: 'Savings',
        data: Object.values(savings),
        backgroundColor: '#2ecc71'
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Months' }
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Amount' }
        }
      }
    }
  });

  // Investment Chart
  investmentChart = new Chart(investmentCtx, {
    type: 'line', // Option to change this type
    data: {
      labels: Object.keys(investments),
      datasets: [{
        label: 'Investments/Debts',
        data: Object.values(investments),
        borderColor: '#9b59b6',
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Months' }
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Amount' }
        }
      }
    }
  });
}

// Load data from localStorage
function loadData() {
  return JSON.parse(localStorage.getItem('financialData')) || {
    Expense: {},
    Saving: {},
    Investment: {}
  };
}

// Save data to localStorage
function saveData(data) {
  localStorage.setItem('financialData', JSON.stringify(data));
}

// Update Charts
function updateCharts(data) {
  if (expenseChart) expenseChart.destroy();
  if (savingChart) savingChart.destroy();
  if (investmentChart) investmentChart.destroy();

  initializeCharts(data.Expense, data.Saving, data.Investment);
}

// Handle form submissions for each form
document.getElementById('expense-form').addEventListener('submit', function(e) {
  e.preventDefault();
  handleFormSubmission('Expense', 'expense-category', 'expense-amount', 'expense-list');
});

document.getElementById('saving-form').addEventListener('submit', function(e) {
  e.preventDefault();
  handleFormSubmission('Saving', 'saving-category', 'saving-amount', 'saving-list');
});

document.getElementById('investment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  handleFormSubmission('Investment', 'investment-category', 'investment-amount', 'investment-list');
});

// Handle form submissions for all categories
function handleFormSubmission(type, categoryId, amountId, listId) {
  const data = loadData();
  const category = document.getElementById(categoryId).value;
  const amount = parseFloat(document.getElementById(amountId).value);

  if (!data[type][category]) {
    data[type][category] = 0;
  }
  data[type][category] += amount;

  saveData(data);
  updateCharts(data);
  updateItemList(data[type], listId);
}

// Update item lists below each table
function updateItemList(data, listId) {
  const list = document.getElementById(listId);
  list.innerHTML = '';
  let count = 1;
  for (const key in data) {
    const li = document.createElement('li');
    li.textContent = `${count++}. ${key}: $${data[key]}`;
    list.appendChild(li);
  }
}

// Initialize the page
function init() {
  const data = loadData();
  updateCharts(data);

  updateItemList(data.Expense, 'expense-list');
  updateItemList(data.Saving, 'saving-list');
  updateItemList(data.Investment, 'investment-list');
}

init();
