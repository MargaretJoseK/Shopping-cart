var mongoose = require("mongoose");
var Product = require("../models/Products");
mongoose.connect("mongodb://localhost:27017/margaret_db");

var products = [
  new Product({
    imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    title: "Tshirts.",
    description: "Tshirts for boys",
    price: 200
  }),
  new Product({
    imagePath: "http://localhost:3000/images/tshirt2.jpg",
    title: "Tshirts.",
    description: "Tshirts for boys",
    price: 250
  }),
  new Product({
    imagePath: "http://localhost:3000/images/tshirt3.jpg",
    title: "Tshirts.",
    description: "Tshirts for boys",
    price: 350
  }),
  new Product({
    imagePath: "http://localhost:3000/images/tshirt4.jpg",
    title: "Tshirts.",
    description: "Tshirts for boys",
    price: 220
  }),
  new Product({
    imagePath: "http://localhost:3000/images/tshirt5.jpg",
    title: "Tshirts.",
    description: "Tshirts for boys",
    price: 300
  }),
  new Product({
    imagePath: "http://localhost:3000/images/tshirt6.jpg",
    title: "Tshirts.",
    description: "Tshirts for boys",
    price: 350
  }),
  new Product({
    imagePath: "http://localhost:3000/images/tshirt7.jpg",
    title: "Tshirts.",
    description: "Tshirts for boys",
    price: 370
  }),
  new Product({
    imagePath: "http://localhost:3000/images/tshirt8.jpg",
    title: "Tshirts.",
    description: "Tshirts for boys",
    price: 250
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
