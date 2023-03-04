const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        }
        catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async signin(email, plainPassword) {
        try {
            // fetch user using email
            const user = await this.userRepository.getUserByEmail(email);
            // comapre plainPassword with stored encryptedPassword
            const isPasswordMatched = this.checkPassword(plainPassword, user.password);
            if (!isPasswordMatched) {
                console.log("password does not patch");
                throw { error: "Incorrect Password" }
            }
            // if passwords match then create token and send it to user
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw { error: 'Invalid token' }
            }
            const user = this.userRepository.get(response.id);
            if (!user) {
                throw { error: 'No user with the corresponding token exits' }
            }
            return user.id;
        } catch (error) {
            onsole.log("Something went wrong in repository layer");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return result;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }
}

module.exports = UserService;
