const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  title: String,
  category: String,
  prepTime: Number,
  noPeople: Number,
  shortDescription: String,
  recipe: String,
  creator: String,
  picture: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Recipe', recipeSchema);