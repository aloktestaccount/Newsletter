const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;


    const data = {
        
            members: [
              {
                
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName,
                }
    }
]
    }

const jsonData = JSON.stringify(data);

const url = "https://us13.api.mailchimp.com/3.0/lists/018d40d119";


const option  = {
    method : "POST",
    auth :"alok:e3a479449dd352843f9614e785b8cc65-us13"

    
}
const request = https.request(url,option,function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html"); 
    }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();
});

app.post("/failure",function(req, res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("server started at port 3000");
});

//API KEY
//e3a479449dd352843f9614e785b8cc65-us13
//list id
//018d40d119
