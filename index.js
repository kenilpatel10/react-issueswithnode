import express from "express";
import cors from "cors";
import mongoose from "mongoose";
 
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/static', express.static('public'));

mongoose.connect(
  "mongodb://localhost:27017/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
    () => {
      console.log("DB connected......");
  }
);
const userSchema = new mongoose.Schema({
   
  isUser:  { type:String,
      require:true,
},
  username:  { type:String,
  require:true,
},
   phone:  { type: Number,
             require:true,
},
   email:  { type:String,
    require:true,
},
   password: { type:String,
    require:true,
}
});
const dataSchema = new mongoose.Schema({
  userId : {
    type:String,
    require:true,
  },  
  userName:  { type:String,
  require:true,
},
media:  { type:String,
  require:true,
},
  title:  { type:String,
    require:true,
},
 describe:  { type:String,
  require:true,
    },
  

  status: { type:String,
    require:true,
},
  time: { type:String,
  require:true,
}
});
const User = new mongoose.model("user", userSchema);
const Data = new mongoose.model("data", dataSchema);


app.listen(8000, () => {
  console.log("started at port 8000");
});


app.post("/login", (req, res) => {
  const { email, password}=req.body;
  User.findOne({email: email}, (err, user)=>{
    if(user){
      if(password === user.password ){
        res.send({message:"Login Successfull" , user: user})

      }else{
        res.send({message:"password didnt match"})
      }
     
    }else{
      res.send({message:"user not registered"})
    }
  })
});

app.get("/register",async (req, res) => {
  // const { title , description, status}=req.body;
  try {
    const registered = await User.find()
    res.json(registered);
    
  } catch (error) {
    console.log("users ---->",resgistered)
  }

});
app.post("/data", (req, res) => {
  const { title , describe, status,userId,userName,time}=req.body;

  const data = new Data({
   title,
   describe,
   status,
   userId,
   time,
   media: req.body.file,
   userName
 })
  data.save(err =>{
    if(err) {
      res.send(err)
    }else{
      res.send({ message:"Successfully instered" })
    }
 
  })
});
app.put("/data/:id",async (req, res) => {
  // const { title , describe, status,userId,userName,time}=req.body;
  if(User){
    let data= await Data.findOneAndUpdate({_id: req.params.id},{
      $set:{
       title:req.body.title,
      //  describe:describe,
       status:req.body.status,
      //  time:time
      
       
      }
    },{new:true})
    res.send(data);
  }else{
      res.send("error")
  }

});

app.delete("/data/:id",async (req, res) =>{
  try {
    const deleted = await Data.findByIdAndDelete({_id: req.params.id})
    res.json(deleted);
    
  } catch (error) {
    console.log("users ---->",deleted)
  }
})
app.get("/data",async (req, res) => {
  // const { title , description, status}=req.body;
  try {
    const alldata = await Data.find()
    res.json(alldata);
    
  } catch (error) {
    console.log("alldata ---->",alldata)    
  }

});

app.get("/data/:id",async (req, res) => {
  // const { title , description, status}=req.body;
  try {
    const alldata= await Data.findById(req.params.id)
    res.json(alldata);  
    
  } catch (error) {
    console.log("alldata ---->",alldata)
  }

});

app.post("/register", (req, res) => {
 const {phone, isUser ,username , email, password}=req.body;
User.findOne({email: email}, (err, user)=>{
  if(user){
    res.send({message:"user already registered"})
  }else{
    const user = new User({
      isUser,
      username,
      email,
      phone,
      password
   })
   user.save(err =>{
     if(err) {
       res.send(err)
     }else{
       res.send({ message:"Successfully Registered" })
     }
  
   })
  }
})
  
});
 

