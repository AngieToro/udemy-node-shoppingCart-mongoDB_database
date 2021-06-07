const mongodb = require('mongodb');
const getDataBase = require('../util/database').getDataBase;

class Product {

    constructor(title, description, price, imageUrl){

        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    };

    save(){

        const dataBase = getDataBase();
        return dataBase.collection('products').insertOne(this)
                .then(result => {
                    
                    return result;
                })
                .catch(err => {
                    console.log("Database error - The products is not created", err);
                });
    };

    static fetchAllProducts(){

        const dataBase = getDataBase();

        return dataBase.collection('products').find().toArray()
                .then(products => {

                    return products;
                })
                .catch(err => {

                    console.log("Database error - Products not found", err);
                });
    };

    static fetchByIdProduct(prodId){

        const dataBase = getDataBase();
        //next is the last document that was returned
        return dataBase.collection('products')
                        .find({ _id: new mongodb.ObjectID(prodId) })
                        .next()
                        .then(product => {

                            return product;
                        })
                        .catch(err => {

                            console.log("Database error - Product not found", err);
                        });
    };
};

module.exports = Product;