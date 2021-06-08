const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {

    res.render('admin/edit-product',
                {
                    docTitle: 'Add Product', 
                    path: '/admin/add-product',
                    editing: false
                });
};

exports.postAddProduct =  (req, res, next) => {
 
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title, description, price, imageUrl);
    product.saveProduct()
            .then(() => {

                res.redirect('/admin/products');
            })
            .catch(err => {

                console.log("Database error - The products is not create", err);
            });
   
};

exports.getEditProduct = (req, res, next) => {

    const editMode = req.query.edit;
   
    if (!editMode) {
        return res.redirect('/');
    };

    const prodId = req.params.productId;
    
    Product.fetchByIdProduct(prodId)
            .then((product) => {

                if (!product){
                    return res.redirect('/');
                };
        
                res.render('admin/edit-product',
                        {
                            docTitle: 'Edit Product', 
                            path: '/admin/edit-product',
                            editing: editMode,
                            product: product
                        });
            })
            .catch(err => {
                console.log("Database error - Update product has failed");
            }); 
};

exports.postEditProducts = (req, res, next) => {

    const prodId = req.body.productId;  //name input
    
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    const product = new Product(updatedTitle, updatedDescription, updatedPrice, updatedImageUrl, prodId);
    product.saveProduct()
                .then(result => {
                    res.redirect("/admin/products");
                })
                .catch(err => {
                    console.log("Database error - Update product has failed", err);
                });     
};

exports.getProducts = (req, res, next) => {

    Product.fetchAllProducts()
            .then(products => {
                res.render('admin/products', 
                {
                    prods: products, 
                    docTitle: 'Admin Products', 
                    path: "/admin/products"
                }); 
            })
            .catch(err => {
                console.log("Database error - Prodcuts not found", err);
            });
};

exports.postDeteleProduct = (req, res, next) => {

    const prodId = req.body.productId;

     Product.deleteByIdProduct(prodId)
            .then(() => {
                res.redirect("/admin/products");
            })
            .catch(err => {
                console.log("Database error - Delete product has failed", err);
            }); 
};