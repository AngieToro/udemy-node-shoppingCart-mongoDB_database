const mongodb = require('mongodb');
const getDataBase = require('../util/database').getDataBase;

const ObjectId = mongodb.ObjectId;

class User{

    constructor(username, email){

        this.username = username;
        this.email = email;
    };

    saveUser(){

        const dataBase = getDataBase();
        return dataBase.collection('users').insertOne(this);   
    };

    static findByIdUser(userId){

        const dataBase = getDataBase;
        return dataBase.collection('users').findOne({ _id: new ObjectID(userId) });
    };
};

module.exports = User;