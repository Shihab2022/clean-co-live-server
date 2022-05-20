const express=require("express")

const app =express()
const port =process.env.PORT || 5000

app.get('/',async(req,res)=>{
    res.send('clinco ir running')
})
app.listen(port,()=>{
    console.log(`Clinco is running on ${port}`)
})