document.getElementById('fuelForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const carType = document.getElementById('carType').value;
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
    const tripDistance = parseFloat(document.getElementById('tripDistance').value);
    const income = parseFloat(document.getElementById('income').value);
    
    // Perform fuel cost calculations
    const fuelCost = (fuelConsumption / 100) * tripDistance * 1.5;  // Example cost factor
    const profitMargin = income - fuelCost;
    const isProfitable = profitMargin > 0;
    
    // Display results
    document.getElementById('fuelCost').textContent = `Fuel Cost: $${fuelCost.toFixed(2)}`;
    document.getElementById('profitMargin').textContent = `Profit Margin: $${profitMargin.toFixed(2)}`;
    document.getElementById('profitability').textContent = isProfitable ? 'Profitable' : 'Not Profitable';
    
    document.getElementById('result').classList.remove('hidden');
})