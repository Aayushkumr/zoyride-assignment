/* eslint-disable no-undef */
const users = [
    {
        email: 'admin@admin.com',
        password: 'password123',
        address: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'admin@admin.com',
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipcode: '12345',
            country: 'USA',
            phoneNumber: '123-456-7890'
        }
    },
    {
        email: 'something@something.com',
        password: 'password456',
        address: {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'something@something.com',
            street: '456 Elm St',
            city: 'Othertown',
            state: 'NY',
            zipcode: '67890',
            country: 'USA',
            phoneNumber: '987-654-3210'
        }
    }
];

function login(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user && user.address) {
        return { success: true, message: 'Login successful', user };
    } else {
        return { success: false, message: 'Invalid email, password, or missing address' };
    }
}

module.exports = { login };