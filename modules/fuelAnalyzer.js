function calculateFuelCost(fuelConsumption, tripDistance, fuelPrice = 1.5) {
    const litersNeeded = (tripDistance / 100) * fuelConsumption;
    return litersNeeded * fuelPrice;
}

function calculateProfit(income, fuelCost) {
    return income - fuelCost;
}

module.exports = { calculateFuelCost, calculateProfit };