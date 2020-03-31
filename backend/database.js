const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser : true
})
.then(db => console.log('Base de datos conectada'))
.catch(err => console.error(err));
