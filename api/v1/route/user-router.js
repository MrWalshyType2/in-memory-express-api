const router = require('express').Router();
const userController = require('../controller/user-controller');

router.get('/:id', userController.readById);
router.get('/', userController.read);
router.post('/', userController.create);
router.put('/', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;