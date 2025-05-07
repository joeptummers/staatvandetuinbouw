// Data for crop distribution
const cropData = {
    labels: ['Tomaten', 'Komkommers', 'Paprika\'s', 'Overige groenten', 'Siergewassen'],
    values: [320, 240, 160, 180, 200]
};

// Create the pie chart
const pieTrace = {
    labels: cropData.labels,
    values: cropData.values,
    type: 'pie',
    hole: 0.4,
    marker: {
        colors: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00']
    }
};

const pieLayout = {
    title: 'Verdeling gewassen glastuinbouw Noord-Holland (hectare)',
    height: 400,
    showlegend: true,
    legend: {
        orientation: 'h',
        y: -0.2
    }
};

Plotly.newPlot('gewassen-chart', [pieTrace], pieLayout);

// Create the table
const tableDiv = document.getElementById('gewassen-table');
const table = document.createElement('table');
table.className = 'data-table';

// Add header
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');
['Gewas', 'Areaal (hectare)', 'Percentage'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);

// Add body
const tbody = document.createElement('tbody');
const total = cropData.values.reduce((a, b) => a + b, 0);

cropData.labels.forEach((label, i) => {
    const tr = document.createElement('tr');
    
    const tdLabel = document.createElement('td');
    tdLabel.textContent = label;
    tr.appendChild(tdLabel);
    
    const tdValue = document.createElement('td');
    tdValue.textContent = cropData.values[i].toLocaleString('nl-NL');
    tr.appendChild(tdValue);
    
    const tdPercentage = document.createElement('td');
    tdPercentage.textContent = `${(cropData.values[i] / total * 100).toFixed(1)}%`;
    tr.appendChild(tdPercentage);
    
    tbody.appendChild(tr);
});

// Add total row
const totalRow = document.createElement('tr');
totalRow.className = 'total-row';

const tdTotalLabel = document.createElement('td');
tdTotalLabel.textContent = 'Totaal';
totalRow.appendChild(tdTotalLabel);

const tdTotalValue = document.createElement('td');
tdTotalValue.textContent = total.toLocaleString('nl-NL');
totalRow.appendChild(tdTotalValue);

const tdTotalPercentage = document.createElement('td');
tdTotalPercentage.textContent = '100%';
totalRow.appendChild(tdTotalPercentage);

tbody.appendChild(totalRow);
table.appendChild(tbody);
tableDiv.appendChild(table); 