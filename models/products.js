const mongodb = require('mongodb');
const getDataBase = require('../util/database').getDataBase;

class Product {

    constructor(title, description, price, imageUrl, id){

        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
    };

    saveProduct(){

        const dataBase = getDataBase();
        let dataBaseOp;

        if (this._id){

            dataBaseOp = dataBase.collection('products').updateOne({ _id: this._id }, { $set: this });
        } else {

            dataBaseOp = dataBase.collection('products').insertOne(this);
        };

        return  dataBaseOp
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

    static deleteByIdProduct(prodId){

        const dataBase = getDataBase();
        return dataBase.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
                        .then(result => {
                            console.log("Product deleted");
                        })
                        .catch(err => {

                            console.log("Database error - Product not deleted", err);
                        });
    };
};

module.exports = Product;