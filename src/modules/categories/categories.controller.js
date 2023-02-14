import { query } from './../../../database/dbConnection.js';


// add category , can reapete the same category to another store , but can not reapete it for the same store
export const addCategory = (req, res) => {
    const { email, name } = req.body;
    query.execute(`SELECT * FROM users WHERE email='${email}'`, (err, [user_data]) => {
        if (!user_data) {
            res.json({ message: " this email is not exist!! " })
        } else {
            if (user_data.user_type == "store") {
                query.execute(`SELECT * FROM categories WHERE user_id='${user_data.id}' AND category_name='${name}'`, (err, [category_data]) => {
                    if (!category_data) {
                        query.execute(`INSERT INTO categories (category_name,user_id) VALUES ('${name}' ,'${user_data.id}')`, (err, data) => {
                            res.json({
                                message: " category add successfully",
                                data: { "category name": name, "user Id": user_data.id }
                            })
                        })
                    } else {
                        res.json({
                            message: "This category is already exist for your store",
                            data: { "category name": name, "user Id": user_data.id }
                        })
                    }
                })
            } else {
                res.json({ message: " You dont have the store permision " })
            }
        }
    })
}

export const updateCategory = (req, res) => {
    const { email, name, category_id } = req.body;
    query.execute(`SELECT * FROM users WHERE email = '${email}'`, (err, [user_data]) => {
        if (!user_data) {
            res.json({ message: " This email is not exist !!!!" })
        } else {
            query.execute(`SELECT * FROM categories WHERE user_id='${user_data.id}' AND id='${category_id}' `, (err, [data]) => {
                if (!data) {
                    res.json({ message: "You are not authorizes to update this category" })
                } else {
                    res.json({ message: " okokokok", "category id": category_id, "user id": user_data.id, data })
                }
            })
        }
    })
}

export const DeleteCategory = (req, res) => {
    const { email, category_id } = req.body;
    query.execute(`SELECT * FROM users WHERE email = '${email}' `, (err, [user_data]) => {
        // if you are admin
        if (user_data && user_data.user_type == "admin") {
            // check if category id is exist or not
            query.execute(`SELECT * FROM categories WHERE id ='${category_id}' `, (err, [category_data]) => {
                if (!category_data) {
                    res.json({ message: `Sorry , This category  id : ${category_id} does not exist` })
                } else {

                    query.execute(`DELETE FROM categories WHERE id='${category_id}'`)
                    res.json({
                        message: `Deleted catgegory with id : '${category_id}' succcessfully`,
                        data: { "user type": user_data.user_type, "category id ": category_id, }
                    })
                }
            })

        }
        // if you are store owner only
        else if (user_data && user_data.user_type == "store") {
            query.execute(`SELECT * FROM categories WHERE user_id='${user_data.id}'AND  id='${category_id}'`, (err, [data]) => {
                if (!data) {
                    res.json({ message: `Sorry , You dont have the permission and not authorize to delete this category` })
                } else {
                    query.execute(`DELETE FROM categories WHERE id='${category_id}'`)
                    res.json({
                        message: `Deleted catgegory with id : ${category_id} succcessfully`,
                        data: { "user type": user_data.user_type, "category id ": category_id, }
                    })
                }
            })
        } else {
            res.json({ message: " You are not authorized" })
        }
    })
}

export const getALlCategories = (req, res) => {
    query.execute(`SELECT * FROM categories`, (err, data) => {
        res.json({ message: "get All categories", data })
    })
}

export const gettAllCateoriesPerStore = (req, res) => {
    const { store_id } = req.body;
    query.execute(`SELECT * FROM categories WHERE user_id='${store_id}' `, (err, data) => {
        res.json({ message: "get All categories", data })
    })
}

export const getAllCategoriesWithAllStores = (req, res) => {
    const { category_name } = req.body;
    query.execute(`SELECT * FROM categories WHERE category_name='${category_name}' `, (err, data) => {
        console.log(data);
        res.json({ message: "get All categories", data })
    })
}