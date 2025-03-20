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
    
    `;
}

const fetchCustomers = async()=> {
    const SQL = /*sql*/ `
    
    `;
}

const fetchRestaurant = async()=> {
    const SQL = /*sql*/ `
    
    `;
}

const createReservation = async()=> {
    const SQL = /*sql*/ `
    
    `;
}

const destroyReservation = async()=> {
    const SQL = /*sql*/ `
    
    `;
}

module.exports = {
    client,
    createTables,
    createCustomer,
    createRestaurant,
    fetchCustomers,
    fetchRestaurant,
    createReservation,
    destroyReservation
}