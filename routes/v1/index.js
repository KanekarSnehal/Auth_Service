const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user-controller");
const { AuthRequestValidatorMiddleware } = require('../../middlewares');
const { validateUserAuth, validateIsAdminRequest } = AuthRequestValidatorMiddleware;

router.post(
    '/signup',
    validateUserAuth,
    UserController.create
);
router.post(
    '/signin',
    validateUserAuth,
    UserController.signin
);
router.get('/isAuthenticated', UserController.isAuthenticated);
router.get(
    '/isAdmin',
    validateIsAdminRequest,
    UserController.isAdmin
);

module.exports = router;