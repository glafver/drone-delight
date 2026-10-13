/**
 * Optional seed script with sample menu data, useful for local development.
 *
 * Usage:
 *   MONGO_URI=... npm run seed            # replaces all products
 *   MONGO_URI=... npm run seed -- --keep  # adds products without deleting
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const image = (name) => `/images/${name}.png`;

const products = [
  { name: "Pizza Margherita", price: 119, category: "pizza", isPopular: true, image: image("pizza-margherita") },
  { name: "Pizza Pepperoni", price: 129, category: "pizza", isPopular: false, image: image("pizza-pepperoni") },
  { name: "Pizza Veggie", price: 125, category: "pizza", isPopular: false, image: image("pizza-veggie") },
  { name: "Cheeseburger", price: 99, category: "fastfood", isPopular: true, image: image("fastfood-cheeseburger") },
  { name: "Hotdog", price: 59, category: "fastfood", isPopular: false, image: image("fastfood-hotdog") },
  { name: "Chicken Nuggets", price: 79, category: "fastfood", isPopular: false, image: image("fastfood-nuggets") },
  { name: "Pad Thai", price: 135, category: "asian", isPopular: true, image: image("asian-padthai") },
  { name: "Spring Rolls", price: 85, category: "asian", isPopular: false, image: image("asian-springrolls") },
  { name: "Sweet & Sour", price: 125, category: "asian", isPopular: false, image: image("asian-sweetsour") },
  { name: "Spaghetti Bolognese", price: 139, category: "italian", isPopular: false, image: image("italian-bolognese") },
  { name: "Carbonara", price: 145, category: "italian", isPopular: true, image: image("italian-carbonara") },
  { name: "Lasagna", price: 149, category: "italian", isPopular: false, image: image("italian-lasagna") },
  { name: "Sushi Nigiri", price: 109, category: "sushi", isPopular: false, image: image("sushi-nigiri") },
  { name: "Sushi Maki", price: 99, category: "sushi", isPopular: true, image: image("sushi-maki") },
  { name: "Sushi Ebi", price: 115, category: "sushi", isPopular: false, image: image("sushi-ebi") },
  { name: "Caesar Salad", price: 95, category: "salad", isPopular: false, image: image("salad-caesar") },
  { name: "Greek Salad", price: 95, category: "salad", isPopular: false, image: image("salad-greek") },
  { name: "Quinoa Salad", price: 105, category: "salad", isPopular: false, image: image("salad-quinoa") },
  { name: "Brownie", price: 49, category: "desserts", isPopular: false, image: image("dessert-brauni") },
  { name: "Milkshake", price: 55, category: "desserts", isPopular: true, image: image("dessert-milkshake") },
  { name: "Tiramisu", price: 65, category: "desserts", isPopular: false, image: image("dessert-tiramisu") },
  { name: "Cola", price: 25, category: "drinks", isPopular: false, image: image("drink-cola") },
  { name: "Lemonade", price: 29, category: "drinks", isPopular: false, image: image("drink-lemonade") },
  { name: "Orange Juice", price: 35, category: "drinks", isPopular: false, image: image("drink-orange") },
];

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  if (!process.argv.includes("--keep")) {
    await Product.deleteMany({});
    console.log("Cleared existing products");
  }

  const created = await Product.insertMany(products);
  console.log(`Inserted ${created.length} products`);

  await mongoose.connection.close();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
