import sys
import requests

def fetch_fuel_price():
    # Replace with the actual API call for live fuel prices
    response = requests.get('https://api.fuelprices.com')
    data = response.json()
    return data['average_price']  # Adjust based on API response structure

def calculate_cost(car_type, fuel_consumption, trip_distance, income):
    fuel_price = fetch_fuel_price()
    fuel_cost = (fuel_consumption / 100) * trip_distance * fuel_price
    profit_margin = income - fuel_cost
    return {
        "fuel_cost": round(fuel_cost, 2),
        "profit_margin": round(profit_margin, 2),
        "is_profitable": profit_margin > 0
    }

if __name__ == '__main__':
    car_type = sys.argv[1]
    fuel_consumption = float(sys.argv[2])
    trip_distance = float(sys.argv[3])
    income = float(sys.argv[4])

    result = calculate_cost(car_type, fuel_consumption, trip_distance, income)
    print(result)
