const express = require('express')
const app = express()

const {
    client,
    createTables,
    createCustomer,
    createRestaurant,
    fetchCustomers,
    fetchRestaurants,
    fetchReservations,
    createReservation,
    destroyReservation,
} = require('./db')

// -_-_-_- Routing -_-_-_-
// returns customers
app.get('/api/customers', async(req, res, next)=> {
    try {
        res.send(await fetchCustomers())
    }catch(error) {
        next(error)
    }
})
// returns restaurants
app.get('/api/restaurants', async(req, res, next)=> {
    try {
        res.send(await fetchRestaurants())
    }catch(error) {
        next(error)
    }
})
// returns reservations
app.get('/api/reservations', async(req, res, next)=> {
    try {
        res.send(await fetchReservations())
    }catch(error) {
        next(error)
    }
})
// returns connected tables
app.post('/api/customers/:customer_id/reservations', async (req, res, next) => {
    try {
        res.status(201).send(await createReservation({
            customer_id: req.body.customer_id,
            restaurant_id: req.body.restaurant_id,
            party_count: req.body.party_count
        }))
    }catch(error) {
        next(error)
    }
})
// deletes reservation
app.delete('/api/', async (req, res, next) => {
    try {
        res.send(await destroyReservation())
    }catch(error) {
        next(error)
    }
})
// -_-_-_- init -_-_-_-
const init = async() => {
    await client.connect()
    console.log('Connected to the Database')
    await createTables() 
    console.log('Created Tables')

    const [Ethan, Nestor, Lily, Stephanie, Spiffos, Luigis, Reds] = await Promise.all([
        createCustomer({name: 'Ethan'}),
        createCustomer({name: 'Nestor'}),
        createCustomer({name: 'Lily'}),
        createCustomer({name: 'Stephanie'}),
        createRestaurant({name: 'Spiffos'}),
        createRestaurant({name: 'Luigis'}),
        createRestaurant({name: 'Reds'}),
    ])

    console.log(await fetchCustomers())
    console.log(await fetchRestaurants())

    const [reservation, reservation2] = await Promise.all([
        createReservation({
            customer_id: Ethan.id,
            restaurant_id: Spiffos.id,
            party_count: 4,
            reservation_date: '10/8/24'
        }),
        createReservation({
            customer_id: Lily.id,
            restaurant_id: Luigis.id,
            party_count: 2,
            reservation_date: '12/6/24'
        }),
    ]);

    console.log(await fetchReservations());

    // Server -
    const port = process.env.PORT || 3000
    app.listen(port, ()=> {
        console.log('server running on port 3000')
    })
}

// init Call
init()