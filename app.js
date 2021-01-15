const express = require('express');
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const database = admin.firestore()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/add", async (req, res) => {
    
       try {
        data = req.body
        const user=await database.collection("user").doc().set({
             name: data.name,
             email: data.email,
             password: data.password,
             number: data.number
         })
         console.log("created");
         res.json(user)

           
       } catch (error) {
           console.log(error);
       }
     

})
app.put("/update/:id", async (req, res) => {
    
       try {
        data = req.body
        
        const user= await database.collection("user").doc(req.params.id).update({
            
             name: data.name,
             email: data.email,
             password: data.password,
             number: data.number
         })
         console.log("changed");
         res.json(user)
           
       } catch (error) {
           console.log(error);
       }
     

})
app.delete("/remove/:id", async (req, res) => {
    
       try {
        data = req.body
        
        const user= await database.collection("user").doc(req.params.id).delete()
         console.log("deleted");
         res.json(user)
           
       } catch (error) {
           console.log(error);
       }
     

})
app.get("/get/:id", async (req, res) => {
    
       try {
        data = req.body
        
        const user= await database.collection("user").doc(req.params.id).get()
        // if(!user.exists){
        //     res.json({message:"no user found"})
        //     return
        // }
        // console.log(user.exists);
        console.log(user);
        res.json(user)
         
           
       } catch (error) {
           console.log(error);
       }

     

})
app.get("/get",async(req,res)=>{
    try {
        const user=await database.collection("user").get()
        // console.log(user);
        user.forEach(u=>res.json(u.data()))
        // res.json(user)
        
    } catch (error) {
        console.log(error);
    }
})
app.get("/query",async(req,res)=>{
    try {
        console.log(req.query);
        
        let user=await database.collection("user").where("name","==","sample").get()
        // console.log(user);
        user.forEach(u=>user=u.data())
        console.log(user);
        res.json(user)
        
        
    } catch (error) {
        console.log(error);
    }
})



app.listen(5000, () => console.log("running"))
