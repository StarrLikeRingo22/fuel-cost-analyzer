import React, { useState } from 'react'
import axios from 'axios'

function App() {
    const [formData, setFormData] = useState({
        carType: '',
        fuelConsumption: '',
        tripDistance: '',
        income: ''
    })
    const [result, setResult] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/calculate', formData)
            setResult(response.data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div>
            <h1>Fuel Cost Analyzer</h1>
            <form onSubmit={handleSubmit}>
                <input name="carType" onChange={handleChange} placeholder="Car Type" />
                <input name="fuelConsumption" onChange={handleChange} placeholder="Fuel Consumption (L/100km)" />
                <input name="tripDistance" onChange={handleChange} placeholder="Trip Distance (km)" />
                <input name="income" onChange={handleChange} placeholder="Expected Income ($)" />
                <button type="submit">Analyze</button>
            </form>
            {result && (
                <div>
                    <h2>Results</h2>
                    <p>Fuel Cost: ${result.fuel_cost}</p>
                    <p>Profit Margin: ${result.profit_margin}</p>
                    <p>{result.is_profitable ? 'Profitable' : 'Not Profitable'}</p>
                </div>
            )}
        </div>
    )
}

export default App
