const express = require("express")
const http = require("https")
const readline = require("readline")
const app = express()
const path = require('path')
const port = 3000


app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, "public")))


app.listen(port, () => {
  console.log(`Server listening on: ${port}`)
})


app.get("/", (req, res) => {
  res.render("index")
})


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function getFuelPrices(callback) {
  const options = {
    method: "GET",
    hostname: "gas-price.p.rapidapi.com",
    port: null,
    path: "/canada",
    headers: {
      "x-rapidapi-key": "ee8c401b4dmshf350dd74b243172p1d3e83jsn04bff2edccc8",
      "x-rapidapi-host": "gas-price.p.rapidapi.com",
    },
  }

  const req = http.request(options, (res) => {
    const chunks = []

    res.on("data", (chunk) => {
      chunks.push(chunk)
    })

    res.on("end", () => {
      const body = Buffer.concat(chunks).toString()
      try {
        const data = JSON.parse(body)
        if (data) {
          callback(null, data)
        } else {
          callback("No fuel price data available for Canada")
        }
      } catch (error) {
        callback("Error parsing the response: " + error.message)
      }
    })
  })

  req.on("error", (error) => {
    callback("Error with the request: " + error.message)
  })

  req.end()
}

function getUserInputs() {
  rl.question("Enter your fuel consumption (liters per 100 km): ", (consumption) => {
    rl.question("Enter the distance you plan to travel (km): ", (distance) => {
      rl.question("Enter your car's fuel type (e.g., Regular, Premium): ", (fuelType) => {
        rl.question("Enter your income per kilometer (e.g., 1.2 for $1.20/km): ", (incomePerKm) => {
          getFuelPrices((error, data) => {
            if (error) {
              console.error(error)
              rl.close()
              return
            }

            const fuelPrice = parseFloat(data?.[fuelType.toLowerCase()] || 0)
            if (isNaN(fuelPrice)) {
              console.error(`No price data available for fuel type: ${fuelType}`)
              rl.close()
              return
            }

            const fuelConsumed = (consumption / 100) * distance
            const fuelCost = (fuelConsumed * fuelPrice).toFixed(2)
            const income = (distance * parseFloat(incomePerKm)).toFixed(2)
            const margin = (income - fuelCost).toFixed(2)

            console.log(`\nFuel Consumption: ${fuelConsumed} liters`)
            console.log(`Fuel Cost: $${fuelCost}`)
            console.log(`Income from the trip: $${income}`)
            console.log(`Margin: $${margin}`)

            rl.close()
          })
        })
      })
    })
  })
}

getUserInputs()
