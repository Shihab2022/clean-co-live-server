const express=require("express")
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
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

     app.get('/services',async(req,res)=>{

        const service=await serviceCollection.find({}).toArray()
        res.send(service)
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


app.get('/',async(req,res)=>{
    res.send('clinco ir running')
})
app.listen(port,()=>{
    console.log(`Clinco is running on ${port}`)
})