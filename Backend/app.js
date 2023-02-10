const express = require("express");
const qs = require("qs");
const axios = require("axios");
const app = express();
const mongoose = require("mongoose");
const needle = require("needle");
app.use(express.json());
const cors = require("cors");
app.use(cors(
  {
    origin:["http://localhoast:3000","https://mern-task-appf.onrender.com"]
  }
));
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));



const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "gfjgfhjhhkhgkhg67867867686()gggkk?[]uyuiyy68587587ghgg[]]fhfjgfj6786";
const mongoUrl = "mongodb+srv://dbuser:1234@cluster0.sq9rrxz.mongodb.net/test";

const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAADjylAEAAAAAm3Et7T%2F2fJfd1biJoQTO1bkgLnk%3DrSlBZvRUlnC1LjmhQxfxE5XAGfTV4BfgpxjfhRqO1xCtnc5aog";
  const LINKEDIN_CLIENT_ID = "774pwec0qf8bfq";
  const LINKEDIN_CLIENT_SECRET = "UeOe2d8CSJMjfUlB";
  const LINKEDIN_REDIRECT_URI = "http://localhost:3000/linkedin";
  
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");
const Admin = mongoose.model("AdminInfo");





app.post("/register", async (req, res) => {
  const { name, email, type, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    if (!(name && email && password && type)) {
      return res.send({ error: "All inputs are Required" });
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      name,
      email,
      type,
      password: encryptedPassword,
      
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "All inputs are Required" });
  }
});

app.post("/id", async (req, res) => {
  const { twitid, linkid, emi } = req.body;

  try {
    if (!(twitid && linkid)) {
      return res.send({ error: "All inputs are Required" });
    }
    console.log(twitid, linkid, emi);
    const filter = { email: emi };
const update = { twitid: twitid,linkid:linkid };
   await User.findOneAndUpdate(filter, update);
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Some error" });
  }
});
app.post("/earn", async (req, res) => {
  const { val, emi } = req.body;

  try {
    console.log(val, emi);
    const filter = { email: emi };
    const update = { credit: val };
    await User.findOneAndUpdate(filter, update);
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Some error" });
  }
});

app.post("/credii", async (req, res) => {
  const { emi } = req.body;

  try {
    console.log(emi);
    var oldUser = await User.find({ email: emi });

    res.send({ status: "ok", data: oldUser[0].credit });
  } catch (error) {
    res.send({ status: "Some error" });
  }
});

app.post("/addit", async (req, res) => {
  const {  namee,mail,tweetid,linkedid,from} = req.body;

  try {
    
    console.log(mail);
    console.log(from);
    const filter = { email: from };
;
   await User.updateOne(filter,{ $push: { arri: [namee,mail,tweetid,linkedid] } });
   
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Some error" });
  }
});
app.post("/delit", async (req, res) => {
  const { namee,mail,tweetid,linkedid,from} = req.body;

  try {
    
    console.log(mail);
    console.log(from);
    const filter = { email: from };
;
   await User.updateOne(filter,{ $pull: { arri: [namee,mail,tweetid,linkedid] } });
   
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Some error" });
  }
});


app.post("/twitty",async (req, res) => {
  
  const {userId} = req.body;
const url = `https://api.twitter.com/2/users/${userId}/tweets`;

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

  const getPage = async (params, options, nextToken) => {
    if (nextToken) {
      params.pagination_token = nextToken;
    }
  
    try {
      const resp = await needle("get", url, params, options);
  
      if (resp.statusCode != 200) {
        console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
        return;
      }
      return resp.body;
    } catch (err) {
      throw new Error(`Request failed: ${err}`);
    }
  };
  try {
    
    let userTweets = [];

  // we request the author_id expansion so that we can print out the user name later
  let params = {
    max_results: 100,
    "tweet.fields": "created_at",
    expansions: "author_id",
  };

  const options = {
    headers: {
      "User-Agent": "v2UserTweetsJS",
      authorization: `Bearer ${bearerToken}`,
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  let userName;
  console.log("Retrieving Tweets...");

  
    let resp = await getPage(params, options, nextToken);
    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      userName = resp.includes.users[0].username;
      if (resp.data) {
        userTweets.push.apply(userTweets, resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  

    return res.send({ status: "ok" ,data:userTweets,len:userTweets.length,name:userName,id:userId});
  } catch (error) {
    return res.send({ status: "Some error" });
  }
})
app.post("/admin-register", async (req, res) => {
  const { name, email, type, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    if (!(name && email && password && type)) {
      return res.send({ error: "All inputs are Required" });
    }

    const oldUser = await Admin.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await Admin.create({
      name,
      email,
      type,
      password: encryptedPassword,
      linkid:"",
      twitid:"",

    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "All inputs are Required" });
  }
});
app.post("/login-user", async (req, res) => {
  const { email, type, password } = req.body;
  if (!(email && password && type)) {
    return res.send({ error: "All inputs are Required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ error: "User Not found" });
  }
  if (
    user &&
    (await bcrypt.compare(password, user.password)) &&
    type == user.type
  ) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token, typo: type });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/login-admin", async (req, res) => {
  const { email, type, password } = req.body;
  if (!(email && password && type)) {
    return res.send({ error: "All inputs are Required" });
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.send({ error: "User Not found" });
  }
  if (
    admin &&
    (await bcrypt.compare(password, admin.password)) &&
    type == admin.type
  ) {
    const token = jwt.sign({ email: admin.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token, typo: type });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/adminData", async (req, res) => {
  const { token } = req.body;
  try {
    const admin = jwt.verify(token, JWT_SECRET);
    console.log(admin);

    const adminemail = admin.email;
    Admin.findOne({ email: adminemail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});


app.post("/useraccount", async (req, res) => {
  
  try {
   
    // const arr=User.getUsers();
    // const data=[];
    // arr.forEach(o => data.push(o.name));
    User.find({})
    .then((data) => {
      console.log(data)
      res.send({ status: "ok", data: data });
    })
    .catch((error) => {
      res.send({ status: "error", data: error });
    });
      
      
  } catch (error) {}
});

app.post("/connaccount", async (req, res) => {
  
  const { from } = req.body;
  try {
    

 
    User.findOne({ email: from })
      .then((data) => {
        res.send({ status: "ok", data: data.arri });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
  
});

app.post("/infor", async (req, res) => {
  
  const { mail } = req.body;
  try {
    

 
    User.findOne({ email: mail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
  
});
app.post('/connert', (req, res) => {
  const { from } = req.body;

 
  try {
    const LI_ACCESS_TOKEN_EXCHANGE_URL =
      "https://www.linkedin.com/oauth/v2/accessToken";

    axios({
      method: "post",
      url: LI_ACCESS_TOKEN_EXCHANGE_URL,
      data: qs.stringify({
        code: from,
        grant_type: "authorization_code",
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: LINKEDIN_REDIRECT_URI,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        console.log(result.data);
       
          res.send({ status: "ok", data: result.data.access_token });
        
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: "Some error" });
      });
  } catch (error) {
    res.send({ status: "Some error" });
  }
});


app.post('/coneeeeee', (req, res) => {
    const { from } = req.body;
  
  try {
    console.log(from)
    const LI_PROFILE_API_ENDPOINT = "https://api.linkedin.com/v2/me";
    axios({
      method: "get",
      url: LI_PROFILE_API_ENDPOINT,

      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + from,
      },
    })
      .then((result) => {
        console.log(result.data);

        res.send({ status: "ok", data: result.data });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: "Some error" });
      });
  } catch (error) {
    res.send({ status: "Some error" });
  }
});

app.post('/again', (req, res) => {
    
  try {
    const {from,val,texi } = req.body;
    console.log(from)
    console.log(val)
    console.log(texi)
    const LI_PROFILE_API_ENDPOINT = "https://api.linkedin.com/v2/ugcPosts";
    const title = "Title title";
    const text = "Text text";
    
    const headers = {
        'Authorization': "Bearer " +from,
        "Access-Control-Allow-Origin": "*",
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0',
        "content-type": "text/plain",
    }
    axios( {
      url:LI_PROFILE_API_ENDPOINT,
        method: "POST",
        headers: headers,
        data: {
       
          author: "urn:li:person:"+val,
          lifecycleState: "PUBLISHED",
          specificContent: {
              "com.linkedin.ugc.ShareContent": {
                  "shareCommentary": {
                      "text": texi
                  },
                  "shareMediaCategory": "NONE"
              }
          },
          visibility: {
              "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
          }
          
      },
    })
      .then((result) => {
        console.log("get "+result);

        res.send({ status: "ok",data:result });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: "Some error" });
      });

    
  } catch (error) {
    res.send({ status: "Some error" });
  }
});


app.listen(5000, () => {
  console.log("Server Started");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bristi0654@gmail.com",
        pass: "rurrrurr",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "thedebugarena@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});
