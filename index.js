const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()


    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100  }, { new: true })
  })
  .then ((response) =>{
    console.log(response)
  })
  // .then(() => {
  //   return Recipe.create( {
  //     title: "Carrot Cake",
  //     level: "Amateur Chef",
  //     ingredients: [
  //       "6 cups grated carrots",
  //       "1 cup brown sugar",
  //       "1 cup raisins",
  //       "4 eggs",
  //       "1 1/2 cups white sugar",
  //       "1 cup vegetable oil",
  //       "2 teaspoons vanilla extract",
  //       "1 cup crushed pineapple, drained",
  //       "3 cups all-purpose flour",
  //       "1 1/2 teaspoons baking soda",
  //       "1 teaspoon salt",
  //       "4 teaspoons ground cinnamon"
  //     ],
  //     cuisine: "International",
  //     dishType: "dessert",
  //     image: "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
  //     duration: 130,
  //     creator: "Chef Nadia"
  //   })
  // })
  // .then ( (response) => {
  //  console.log("funcionando", response.title);
  // })
  .then ( (response) => {
   return Recipe.insertMany (data)
  })


  // .then ( (response) => {
  //  console.log (Recipe.find({duration: 160}).select({title:1}))
  // console.log(Recipe.title)
  // })
  
  .then ( (response) => {
    // console.log (response)
  return mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
