//imports
const express = require ("express") ;                              //express
const mysql = require ("mysql") ;                                  //sql
const cors = require ("cors") ;                                    //for cors error
const nodemailer = require("nodemailer");                          //for sending emails

//---------------------------------------------------------------------------------------------------------------------------------------- \\
const app = express();            //creating express application 

app.use(cors());                  //using cors 
app.use(express.json());          //using express application 


const db = mysql.createConnection({                 //database connection
    user : "root",                                  //mysql username
    host : "localhost",                             //host
    password : "",                                  //mysql password
    database : "registeration",                     //name of database
});

app.post ("/create",(req, res)=>{                   //endpoint for post with data values to fetch from frontend
    const firstName = req.body.firstName; 
    const lastName = req.body.lastName; 
    const email = req.body.email; 
    const contact = req.body.contact; 
    const pincode = req.body.pincode;

//sql query to check if the email alredy exists

    db.query('select * from student where email="'+email+'" ', (err, result) => {
        if (err)
        {
            console.log(err)
        }
        else if (result.length>0)                 //condition to check if e-mail exists
        {
           
          res.send("user already exists");
        }
        else
        {
//sql query to insert values into database table

    db.query("INSERT INTO student (firstName,lastName,email,contact,pincode) VALUES (?,?,?,?,?)",
    [firstName,lastName,email,contact,pincode],
    (err,result) => 
        {
          if(err)
           {
             console.log(err);
           }
    else
            {
            res.send("Values Inserted Successfully");

// nondemailer function to send an e-mail after registeration

            const transport = nodemailer.createTransport({
                service: "Hotmail",                      //service provider
                auth: {
                    user: "arifmajed007.as@outlook.com", // e-mail address of sender
                    pass: "313786@Rif"                   // e-mail password
                }
            });
            
            let code = Math.floor(Math.random() * 1000000);
            

            let mailOptions = {
                from: 'arifmajed007.as@outlook.com', // sender address
                to: email, 
                subject: `message subject`, // Subject line
                text: 'Your 6 digit OTP is => ' +  code,  //e-mail body
                
                
            };
        
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log('Error while sending mail: ' + error);
                } else {
                    console.log('Message sent: %s', info.messageId);
                }
                transport.close(); // shut down the connection pool, no more messages.
            });
            }
        }
    );

        }
                                                                                    } 
             )                         });


          
app.listen(3001,()=>{
    console.log("Server is running successfully");
});
