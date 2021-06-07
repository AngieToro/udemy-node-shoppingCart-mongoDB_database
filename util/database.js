const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let dataBase;

const mongoConnect = (callback) => {

    MongoClient.connect('mongodb+srv://udemy-node:ZtjKmFNbiayugbgN@cluster0.hpvzd.mongodb.net/shop?retryWrites=true&w=majority')
            .then(client => {
                console.log("Database connected");
                dataBase = client.db(); //storage a connection to my database
                callback();
            })
            .catch(err => {
                console.log("Databaase connection failed", err);
                throw err;
            });
};

const getDataBase = () => {

    if(dataBase){
        
        return dataBase;
    };

    throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDataBase = getDataBase;;