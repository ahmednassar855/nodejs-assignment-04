import { query } from './../../../database/dbConnection.js';


export const addProduct = (req, res) => {
    const { email, product_name, product_desc, product_price, category_name } = req.body;
    query.execute(`SELECT id FROM users WHERE email='${email}'`, (err, [user_data]) => {
        if (!user_data) {
            res.json({ message: " invalid user" })
        }
        else {
            query.execute(`SELECT * FROM categories WHERE user_id='${user_data.id}' AND category_name='${category_name}' `, (err, [user_category_data]) => {
                console.log(user_category_data, " category table");
                if (!user_category_data) {
                    res.json({ message: " can not add this product , category and store shall be valid" })
                } else {
                    query.execute(`INSERT INTO products 
                    ( product_name , product_desc , product_price , category_id , created_by ) 
                    VALUES ( '${product_name}' , '${product_desc}' , '${product_price}' , '${user_category_data.id}' , '${user_category_data.user_id}' ) `, (err, prod_data) => {
                        res.json({ message: " Prodcut add successffully", prod_data })
                    })
                }
                // res.json( { message : "add product successfully" , user_category_data} )
            })
        }


    })
}

export const deleteProduct = (req, res) => {
    const { email, id } = req.body;
    query.execute(`SELECT id FROM users WHERE email='${email}'`, (err, [user_data]) => {
        if (!user_data) {
            res.json({ message: "Invalid email !!!" })
        }
        else {
            query.execute(`SELECT * FROM products WHERE created_by='${user_data.id}' AND id='${id}' `, (err, [prod_data]) => {
                if (!prod_data) {
                    res.json({ message: "Not Valid product" })
                } else {
                    query.execute(`DELETE from products WHERE id='${id}'`);
                    res.json({ message: "Deleted product successfully", data: prod_data })
                }
            })
        }
    })
}

export const updateProduct = (req, res) => {
    const { email, id, product_name, product_desc, product_price } = req.body;
    query.execute(`SELECT id FROM users WHERE email='${email}'`, (err, [user_data]) => {
        console.log(user_data, " data user");
        if (!user_data) {
            res.json({ message: "Invalid email !!!" })
        } else {
            query.execute(`SELECT * FROM products WHERE created_by='${user_data.id}' AND id='${id}' `, (err, [prod_data]) => {
                console.log(prod_data, " prod_data ");
                if (!prod_data) {
                    res.json({ message: "Not Valid product" })
                } else {
                    query.execute(`UPDATE  products SET  product_name='${product_name}' , product_desc='${product_desc}' , product_price='${product_price}' WHERE id='${id}' `);
                    res.json({ message: "updated product successfully", data: prod_data })
                }
            })
        }

    })
}

export const searchProductByName = (req, res) => {
    const { searched_name } = req.body;
    if ( searched_name == 0) {
        res.json({ message: "Empty data" })
    } else {
        query.execute(`SELECT product_name from products WHERE product_name LIKE '%${searched_name}%' `, (err, data) => {
            if (data == 0) {
                res.json({ message: "Empty data" })
            } else {
                res.json({ message: data })
            }
        })
    }

}

export const getAllProductsWithUserAndCategory = ( req , res ) => {
   query.execute(`SELECT product_name,product_price,product_desc,name,category_name,category_id,user_id  FROM products JOIN categories ON products.category_id = categories.id JOIN users ON products.created_by = users.id` , ( err , data ) => {
        console.log(data)
        res.json({message : "get data successfully" , newData :data })
    })
}