const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/yougesh');
// mongoose.connect('mongodb+srv://bireswarghosh770:fZIv3R32UIqVEcJn@cluster0.sbnikxi.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});
 

module.exports = db;