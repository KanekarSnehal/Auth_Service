const { User } = require("../models");

class UserRepository {
    async create(data) {
        try {
            const user = User.create(data);
            return user;
        }
        catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            })
        }
        catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;