// Mock database for users
const users = [
    {name: "Sanket kumar", email: "Kumarsanket520@gmail.com", password: "123"}
];

const userModel = {
    // Add a new user
    addUser: (user) => {
        users.push(user);
    },

    // Find a user by email
    findUserByEmail: (email) => {
        return users.find(user => user.email === email);
    },

    // Check if a user exists by email and password
    userExists: (email, password) => {
        return users.some(user => user.email === email && user.password === password);
    }
};

module.exports = userModel;
