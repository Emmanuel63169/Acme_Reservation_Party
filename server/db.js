const pg = require('pg')
const uuid = require('uuid')
const client = new pg.Client(process.env.DATABASE_URL || 'postgress://localhost/acme_reservation_planner_db')

// Tables -
const createTables = async() => {
    const SQL = /*sql*/ `
    DROP TABLE IF EXISTS customer;
    DROP TABLE IF EXISTS restaurant;
    DROP TABLE IF EXISTS reservation;
    CREATE TABLE customers(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );
    CREATE TABLE restaurants(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );
    CREATE TABLE reservations(
        id UUID PRIMARY KEY,
        date DATE NOT NULL,
        party_count INTEGER NOT NULL,
        restaurant_id REFERENCES restaurants(id) NOT NULL,
        customer_id REFERENCES customers(id) NOT NULL
    );
    `;
    await client.query(SQL)
}

// Exports -
const createCustomer = async(name)=> {
    const SQL = /*sql*/ `
    INSERT INTO customers(id, name) VALUES($1, $2) RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), name])
    return response.rows[0];
}

const createRestaurant = async(name)=> {
    const SQL = /*sql*/ `
    INSERT INTO restaurants(id, name) VALUES($1, $2) RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), name])
    return response.rows[0];
}

const fetchCustomers = async()=> {
    const SQL = /*sql*/ `
    SELECT * FROM customers;
    `;
    const response = await client.query(SQL)
    return response.rows;
}

const fetchRestaurant = async()=> {
    const SQL = /*sql*/ `
    SELECT * FROM restaurants;
    `;
    const response = await client.query(SQL)
    return response.rows;
}

const fetchReservations = async()=> {
    const SQL = /*sql*/ `
    SELECT * FROM reservations;
    `;
    const response = await client.query(SQL)
    return response.rows;
}

const createReservation = async({customer_id, restaurant_id, reservation_date})=> {
    const SQL = /*sql*/ `
    INSERT INTO reservations(id, date, party_count, restaurant_id, customer_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), customer_id, restaurant_id])
}

const destroyReservation = async()=> {
    const SQL = /*sql*/ `
    DELETE from reservations
    WHERE; id = $1
    `;
    const response = await client.query(SQL, [req.params.id])
    response.sendStatus(204)
}

module.exports = {
    client,
    createTables,
    createCustomer,
    createRestaurant,
    fetchCustomers,
    fetchRestaurants,
    fetchReservations,
    createReservation,
    destroyReservation
}