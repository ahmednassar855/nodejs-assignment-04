import { query } from './../../../database/dbConnection.js';

export const signup = (req , res  ) => {
    const { name , email , password } = req.body;
    query.execute(`SELECT email FROM users WHERE email = '${email}' `, ( err , [data] ) =>{
        if ( !data ) {
            query.execute(`INSERT INTO users (name, email, password) VALUES ( '${name}' , '${email}' ,'${password}' )`);
            res.json( { message : "Registration is successfully" } )
        }else{
            res.json( { message : "This email is reserved!!  Try another one :)" } )
        }
    })
}

export const signin = (req , res  ) => {
    const { email , password } = req.body;
    query.execute(`SELECT * from users WHERE email='${email}' ` , ( err , [data] ) =>{
        console.log(data);
        // data === undefined   has the same meaning >>> !data
        if ( !data) {
            res.json( { message : "Invalid Email" } )
        }else{
            if ( password == data.password){
                res.json( { message : "sign in successfully"  , userId : data.id} )
            }else{
                res.json( { message : "In correct Password" } )
            }   
        }
    })
}

export const getAllUsers = ( req , res  ) =>{
    const { email  , password} = req.body;
    query.execute(`SELECT * from users WHERE email='${email}' ` , ( err , [data] ) =>{
        console.log(data);
        // data === undefined   has the same meaning >>> !data
        if ( !data) {
            res.json( { message : "Invalid Email" } )
        }else{
            if ( data.user_type == "admin"){
                query.execute(`SELECT * from users`, (err , data) =>{
                    res.json( { message : "Get all Users data" , data} )
                } )  
            }else{
                res.json( { message : "You are not authorized!!!" } )
            }   
        }
    })


}