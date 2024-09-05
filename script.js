// Initialize Charts
let expenseChart, savingChart, investmentChart;

// Function to initialize charts
function initializeCharts(expenses, savings, investments) {
    const expenseCtx = document.getElementById('expenseChart').getContext('2d');
    const savingCtx = document.getElementById('savingChart').getContext('2d');
    const investmentCtx = document.getElementById('investmentChart').getContext('2d');

    // Expense Chart
    expenseChart = new Chart(expenseCtx, {
        type: 'pie',
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
        type: 'bar',
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
                y: { beginAtZero: true }
            }
        }
    });

    // Investment Chart
    investmentChart = new Chart(investmentCtx, {
        type: 'line',
        data: {
            labels: Object.keys(investments),
            datasets: [{
                label: 'Investments',
                data: Object.values(investments),
                borderColor: '#9b59b6',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Load data from localStorage
function loadData() {
    const data = JSON.parse(localStorage.getItem('financialData')) || {
        Expense: {},
        Saving: {},
        Investment: {}
    };
    return data;
}

// Save data to localStorage
function saveData(data) {
    localStorage.setItem('financialData', JSON.stringify(data));
}

// Update Charts
function updateCharts(data) {
    // Destroy existing charts if they exist
    if (expenseChart) expenseChart.destroy();
    if (savingChart) savingChart.destroy();
    if (investmentChart) investmentChart.destroy();

    initializeCharts(data.Expense, data.Saving, data.Investment);
}

// Handle form submission
document.getElementById('finance-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (category === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter valid data.');
        return;
    }

    const data = loadData();

    if (data[type][category]) {
        data[type][category] += amount;
    } else {
        data[type][category] = amount;
    }

    saveData(data);
    updateCharts(data);
    document.getElementById('finance-form').reset();
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    const data = loadData();
    initializeCharts(data.Expense, data.Saving, data.Investment);
});
