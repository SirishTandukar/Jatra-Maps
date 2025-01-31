const User = require("../models/user.model");

const getUsers = async (req, res) => {
  
  const email = req.query.email;
  console.log(req.query);
  if(email){
    const user = await User.findOne({email});
    
    if(user){
      console.log(user.password);
      if(user.password === req.query.password){
            console.log("lamooo1111111");
            return res.status(200).json(user);
            
        }
      }
      else {
              return res.status(404).json({message: "User not found"});
            }

          }
    
  
  
  //  try {
    
  
  // if(email){
  //     const user = await User.findOne({email});
  //     if(user){
  //       // res.status(200).json(user);
  //       if(user.password === req.query.password){
  //         // console.log(user);
  //         return res.status(200).json(user);
  //       }
        
  //     } else {
  //       res.status(404).json({message: "User not found"});
  //     }
  //     return;
  //   }
  //   const users = await User.find({});
  //   res.status(200).json(users);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
};

const createUser = async (req, res) => {
  try {
    console.log("ougyo")
    const newUser = await User.create(req.body);  // Changed variable name from User to newUser
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

module.exports = {
  getUsers,
  createUser,
};