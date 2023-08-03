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


    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 140  }, { new: true })
    // return Recipe.deleteOne({ title: "Carrot Cake"})
  })
  .then ((response) =>{
    console.log(response.title)
  })
  // .then(() => {
  //   return Recipe.create( {
  //     title: "Tarta de Pikachu",
  //     level: "UltraPro Chef",
  //     ingredients: [
  //       "1 Pikachu",
  //       "1 Oddish",
  //       "5 Bayas",
  //       "un poco de chocolate"
      
  //     ],
  //     cuisine: "Pueblo paleta",
  //     dishType: "dessert",
  //     image: "https://img-global.cpcdn.com/recipes/94c391ce1d2c12b4/1360x964cq70/tarta-pikachu-foto-principal.webp",
  //     duration: 130,
  //     creator: "Prof Oak"
  //   })
  // })
  // .then ( (response) => {
  //  console.log("funcionando", response.title);
  // })
  .then ( (response) => {
   return Recipe.insertMany (data)
  })
  .then((response)=>{
response.forEach(element =>{
  console.log(element.title)
})
  })
// .then((response)=>{
//   console.log(response)
// })

  
  .then ( (response) => {
    console.log (response)
  return mongoose.connection.close()
  })
  .then(()=>{
    console.log("Conexion cerrada!")
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
