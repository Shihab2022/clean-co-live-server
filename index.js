const express=require("express")
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app =express()
const port =process.env.PORT || 5000
require("dotenv").config();
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.maixz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
     const serviceCollection= client.db("cleanCo").collection("service");

/**
 * get /service =>all data
 * post / add-service => create new data
 * put / update-service =>modify a data on collection
 * delete / delete-service => delete a data from collection 
 */

     app.get('/get-services',async(req,res)=>{
        const service=await serviceCollection.find({}).toArray()
        res.send(service)
     })

     app.post ('/add-service',async(req,res)=>{
         const data=req.body;
         const result =await serviceCollection.insertOne(data);
         res.send(result)
     })
     app.put('/update-service/:id',async(req,res)=>{

        const id=req.params.id;
        const data=req.body;
        const filter={_id:ObjectId(id)}
        const updateDoc={$set : data}
        const option={upsert : true}
        const result = await serviceCollection.updateOne(filter,updateDoc,option)
        res.send(result)
     })
     app.delete('/delete-service/:id',async(req,res)=>{

        const id=req.params.id;
      
        const filter={_id:ObjectId(id)}
        
        const result = await serviceCollection.deleteOne(filter)
        res.send(result)
     })




 
    }
    
    finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);



// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('mongobd us connected')
//   client.close();
// });


app.get('/user/data',async(req,res)=>{
    const data=req.body
    res.send(data)
})

app.get('/user/:id',async(req,res)=>{
    const id =req.params.id
    console.log(id)
    res.send(id)
})
app.get('/',async(req,res)=>{
    res.send('clinco ir running')
})
app.listen(port,()=>{
    console.log(`Clinco is running on ${port}`)
})