//Verificar entorno
if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}

const express = require("express");
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//Inicializacion
const app = express();
require('./database');

//Configuracion
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, callback){
        callback(
            null, 
            new Date().getTime() + path.extname(file.originalname)
            );
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/books',require('./routes/books.js'));

//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando el puerto: ', app.get('port'));
});