const express = require('express');
const recipeController = require('../../controllers/recipes');

const router = express.Router();

router.get('/', recipeController.getRecipes);
router.get('/breakfast', recipeController.breakfast);
router.get('/brunch', recipeController.brunch);
router.get('/lunch', recipeController.lunch);
router.get('/dinner', recipeController.dinner);
router.get('/freshNew', recipeController.freshNew);
router.get('/popular', recipeController.mostPopular);
router.get('/:id', recipeController.fetchOne);
router.post('/new', recipeController.createRecipe);
// router.post('/new/img', recipeController.uploadImg); //upload image
router.patch('/:id', recipeController.updateRecipe);
router.patch('/:id/like', recipeController.likeRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;