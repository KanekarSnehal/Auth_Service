const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully created a new user',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            sucess: false,
            message: 'Something went wrong',
            err: error
        });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userService.signin(email, password);
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully signedin',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            sucess: false,
            message: 'Something went wrong',
            err: error
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-toekn'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully signedin',
            err: {}
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            sucess: false,
            message: 'Something went wrong',
            err: error
        });
    }
}

module.exports = {
    create,
    signin
}