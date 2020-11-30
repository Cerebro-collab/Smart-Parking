const express = require('express');
const myrouter = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const dbName = 'booking';

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
myrouter.get('/filterUID/:id',(req,res) => {
    // eslint-disable-next-line consistent-return
    (async() => {
        try
        {
            let query = db.collection(dbName);  
            let response = [] ;

            await query.where("uid", '==', req.params.id).get().then(snap => {
                
                if(snap.empty){
                    console.log('No such data found.');
                    return res.status(404).json({data : "no data"})
                }
                else{
                    snap.forEach((doc) => {
                        response.push(doc.data());
                    })
                    console.log('----Read Required Data----');
                    return res.status(200).json(response);
                }
            })
       }
        catch(error) 
        {
            console.log('Error!');
            return res.status(500).json(error);
        }
    })();
});

//Filter by Month - GET
myrouter.get('/filterMonth/:month',(req,res) => {
    // eslint-disable-next-line consistent-return
    (async() => {
        try
        {
            let query = db.collection(dbName);  
            let response = [] ;

            await query.where("month", '==', req.params.month).get().then(snap => {
                
                if(snap.empty){
                    console.log('No such data found.');
                    return res.status(404).json({data : "no data"})
                }
                else{
                    snap.forEach((doc) => {
                        response.push(doc.data());
                    })
                    console.log('----Read Required Data----');
                    return res.status(200).json(response);
                }
            })
       }
        catch(error) 
        {
            console.log('Error!');
            return res.status(500).json(error);
        }
    })();
});

//Filter by Month Count
myrouter.get('/filterMonthCount/:month',(req,res) => {
    // eslint-disable-next-line consistent-return
    (async() => {
        try
        {
            let query = db.collection(dbName);  
            let response = [] ;

            await query.where("month", '==', req.params.month).get().then(snap => {
              response = {
                  "count": snap.size
              }  
              console.log(response);
              return res.status(200).json(response);
            })
       }
        catch(error) 
        {
            console.log(error);
            return res.status(500).json(error);
        }
    })();
});


//Filter by Date - GET
myrouter.get('/filterDate/:date1',(req,res) => {
    // eslint-disable-next-line consistent-return
    (async() => {
        try
        {
            let query = db.collection(dbName);  
            let response = [] ;

            await query.where("date1", '==', req.params.date1).get().then(snap => {
                
                if(snap.empty){
                    console.log('No such data found.');
                    return res.status(404).json({data : "no data"})
                }
                else{
                    snap.forEach((doc) => {
                        response.push(doc.data());
                    })
                    console.log('----Read Required Data----');
                    return res.status(200).json(response);
                }
            })
       }
        catch(error) 
        {
            console.log('Error!');
            return res.status(500).json(error);
        }
    })();
});

//Filter by Date and Time Slot
myrouter.get('/filterDateTime/:date1/:startTime/:endTime',(req,res) => {
    // eslint-disable-next-line consistent-return
    (async() => {
        try
        {
            let query = db.collection(dbName);  
            let response = [] ;

            await query.where("date1", '==', req.params.date1)
            .where("startTime", "==", req.params.startTime)
            .where("endTime", "==", req.params.endTime)
            .get().then(snap => {
                
                if(snap.empty){
                    console.log('No such data found.');
                    return res.status(404).json({data : "no data"})
                }
                else{
                    snap.forEach((doc) => {
                        response.push(doc.data());
                    })
                    console.log('----Read Required Data----');
                    return res.status(200).json(response);
                }
            })
       }
        catch(error) 
        {
            console.log('Error!');
            return res.status(500).json(error);
        }
    })();
});






module.exports = myrouter;
