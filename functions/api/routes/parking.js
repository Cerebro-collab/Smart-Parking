const express = require('express');
const myrouter = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const dbName = 'parking';

//Read All ~ GET
myrouter.get('/read', (req,res) => {
    ( async() => {
        try
        {
            let query = db.collection(dbName);
            let response = [] ;

            await query.get().then(snap => {
                snap.forEach(doc => {
                    response.push(doc.data())
                })
                return response; 
            })

            console.log('----Read All Data----');
            return res.status(200).json(response);
       }
        catch(error) 
        {
            console.log('Error');
            return res.status(500).json(error);
        }
    })();
    
    });



//Read by ID ~ GET
/*myrouter.get('/read/:id', (req,res) => {
    ( async() => {
        try
        {
            const document = db.collection(dbName).doc(req.params.id); 
            let user = await document.get();  
            let response = user.data();  
            console.log('----Read Data----');
            return res.status(200).json(response);
       }
        catch(error) 
        {
            console.log('Error');
            return res.status(500).json(error);
        }
    })();
    //next();
    }); 
*/







module.exports = myrouter;
