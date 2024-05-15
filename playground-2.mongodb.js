/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Database
use('colorpalette');

// Collections and Seed Data

// Function to generate random hex color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 1. Palettes Collection
db.createCollection('palettes');
const paletteNames = ["Ocean Sunset", "Forest Mist", "Cherry Blossom", "Summer Breeze", "Autumn Hues", "Winter Wonderland", "Desert Sand", "Tropical Paradise", "Midnight Blue", "Sunrise", "Sunset", "Rainbow Burst", "Pastel Dreams", "Neon Lights", "Earthy Tones", "Metallic Sheen", "Vintage Charm", "Modern Minimalist", "Bohemian Rhapsody"];
let palettes = [];
for (let i = 0; i < 15; i++) {
  let palette = {
    "name": paletteNames[i],
    "description": "A beautiful color palette.", // You can add more descriptive descriptions
    "colors": [getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()],
    "userId": `user${i + 1}`,
    "createdAt": new Date(), // Timestamp for creation
    "modifiedAt": new Date()  // Timestamp for last modification
  };
  palettes.push(palette);
}
db.palettes.insertMany(palettes);

// Index for palettes collection
db.palettes.createIndex({ "name": 1 }, { unique: true }); // Unique index on palette name

// 2. Users Collection
db.createCollection('users');
let users = [];
for (let i = 0; i < 15; i++) {
  let user = {
    "userId": `user${i + 1}`,
    "username": `user${i + 1}`, // Placeholder username
    "email": `user${i + 1}@example.com`,
    "createdAt": new Date()
  };
  users.push(user);
}
db.users.insertMany(users);

// Index for users collection
db.users.createIndex({ "userId": 1 }, { unique: true }); // Unique index on userId

// 3. Favorites Collection
db.createCollection('favorites');
let favorites = [];
for (let i = 0; i < 15; i++) {
  let favorite = {
    "userId": `user${i + 1}`, 
    "paletteId": paletteNames[Math.floor(Math.random() * paletteNames.length)],
    "createdAt": new Date() 
  };
  favorites.push(favorite);
}
db.favorites.insertMany(favorites);

// Index for favorites collection
db.favorites.createIndex({ "userId": 1, "paletteId": 1 }, { unique: true }); // Unique compound index to prevent duplicate favorites 
