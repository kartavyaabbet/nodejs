// Firstly we have import_number the exprees 
const express = require('express');
// After that we have import_number the file system 
const port_number = 5000;
const fs = require('fs');
// after that we have set the './users.json'name
// const './users.json' = ;
// after that we call the object of the path
const app = express();
//now we are set up the port_number number 

// we will convert json data to json
app.use(express.json());

// req.body ko use karna ka liya // req.body ko get karwna ka liya .. raw
app.use(express.urlencoded({ extended: true })); //




// 1st method how to get the data form /users------------------------------------------------------------------------------------------------------------------





console.log("hello");

app.get('/users', (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        // utf8 possible character ko encode karna maha help karta hai
        if (err) {
           throw err;
        }
    // 
            res.send(JSON.parse(data));
     
        // catch(err){
        //     res.send(err);
        // }
       
    });
});




// 2nd method how to fetch the data from the given id---------------------------------------------------------------------------------------------------------



app.get('/users/:id', (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        if (err) {
            res.send('ERROR');
        }
        try{
            const value = JSON.parse(data);
            let given_id=req.params.id;
           
            let newdata = {};
            // we are iterating the data and check where the data is same
            for(let i=0; i<value.length; i++){

                if(value[i].id == given_id){
                    newdata = value[i];   
                    break;
                }
            }
    
            res.send(newdata); 
        }
        catch(err){
res.send(err);
        }
       
       
    });
});



// 3d Method  How to create a new id and all the data in it.---------------------------------------------------------------------------------------------------
 

// this function is use to generate a id for the new user
function new_number(){
    // 0-100
    return Math.floor(Math.random() * 101)
 }


 // now we have use the post keyword to create a new user
app.post('/user', (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        if (err) {
           res.send(err);
           
        }
       
   // this program use to check where the id is already present or not if present it will call the new_number automatically
    let flag=0;
    let values = JSON.parse(data);
    while(flag==0){
        var newid= new_number();
        for(let i=0; i<values.length; i++){
            if(values[i].id == newid){
               flag=1;   
                break;
            }
        }
        if(flag==1){
            flag=0;
        }
        else{
            flag=1;
        }
      
    }
  
   
  console.log("new id "+newid);
        let givenid=newid;
        let newdata = JSON.parse(data)
         console.log("newdata", newdata);
        console.log("req.body", req.body);
       
        let request_body = req.body;
    
        request_body.id = givenid;
        // use the spread operator and we will add all the things
        newdata = [...newdata, request_body];
        console.log("newdata", newdata);
        newupdated = JSON.stringify(newdata);
        console.log(newupdated);
        console.log("guys");
        fs.writeFileSync('./users.json', newupdated,"utf8", (err) => {
         
            if (err) {
         
            }
          
        });

    
        res.send();
    })


});



// Query to UPdate the data ...

app.put('/user/:id', (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        if (err) {
           
            throw err;
        }
        // we will get the id where we have to change
        const req_id = req.params["id"]; 
        console.log("req_id", req_id);
       // voverting the data
        let newdata = JSON.parse(data);

        console.log("req.body", req.body);
      // let us first find the id then 
        for (let key of newdata) {
            if (key.id == req_id) {
                key.name = req.body.name;
                key.address = req.body.address;
                key.pincode = req.body.pincode;
                key.state = req.body.state;
                key.hobbies = req.body.hobbies;
             
            }
        }
        // it use to stringfy it the data to send in json
        newupdated = JSON.stringify(newdata);
        fs.writeFile('./users.json', newupdated, "utf8", (err) => {
            if (err) {
          
            }
          
        });
        // it will send the staus code
        res.status(200).send(`upadated user with id: ${req_id}`);
    })
});
app.delete('/user/:id', (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        if (err) {
       
            throw err;
        }
        // we need only value of 1 ueser detail
        const req_id = req.params["id"];
    // we will store the data
        let newdata = JSON.parse(data);
        console.log("newdata", newdata);
       // we will filter the id whose id is not matched
        let updated_newdata = newdata.filter(usr => usr.id != req_id);

       // now convert the new file into the stringfy
        newupdated = JSON.stringify(updated_newdata);
        // after the we will write the file
        fs.writeFile('./users.json', newupdated, "utf8", (err) => {
            if (err) {
       
            }
     
        });
        // This is use to check the status code 
        res.status(200).send(`deleted user with id: ${req_id} `);
    });
});

// To run the server we have to use app.listen
 app.listen(port_number, () => console.log(`listening on port_number ${port_number}!`));