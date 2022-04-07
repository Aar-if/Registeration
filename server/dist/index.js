//imports
const express = require("express"); //express
const mysql = require("mysql"); //sql
const cors = require("cors"); //for cors error
const nodemailer = require("nodemailer"); //for sending emails
//---------------------------------------------------------------------------------------------------------------------------------------- \\
const app = express(); //creating express application 
app.use(cors()); //using cors 
app.use(express.json()); //using express application 
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "registeration", //name of database
});
app.post("/create", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contact = req.body.contact;
    const pincode = req.body.pincode;
    //sql query to check if the email alredy exists
    db.query('select * from student where email="' + email + '" ', (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result.length > 0) //condition to check if e-mail exists
         {
            res.send("user already exists");
        }
        else {
            //sql query to insert values into database table
            db.query("INSERT INTO student (firstName,lastName,email,contact,pincode) VALUES (?,?,?,?,?)", [firstName, lastName, email, contact, pincode], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("Values Inserted Successfully");
                    // nondemailer function to send an e-mail after registeration
                    const transport = nodemailer.createTransport({
                        service: "Hotmail",
                        auth: {
                            user: "arifmajed007.as@outlook.com",
                            pass: "313786@Rif" // e-mail password
                        }
                    });
                    let one = Math.floor(Math.random() * 10);
                    let two = Math.floor(Math.random() * 10);
                    let three = Math.floor(Math.random() * 10);
                    let four = Math.floor(Math.random() * 10);
                    let five = Math.floor(Math.random() * 10);
                    let six = Math.floor(Math.random() * 10);
                    let mailOptions = {
                        from: 'arifmajed007.as@outlook.com',
                        to: email,
                        subject: `message subject`,
                        text: 'Your 6 digit OTP is => ' + one + two + three + four + five + six, //e-mail body
                    };
                    transport.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log('Error while sending mail: ' + error);
                        }
                        else {
                            console.log('Message sent: %s', info.messageId);
                            res.send("OTP has been sent via e-mail");
                        }
                        transport.close(); // shut down the connection pool, no more messages.
                    });
                }
            });
        }
    });
});
app.listen(3001, () => {
    console.log("Server is running successfully");
});
//# sourceMappingURL=index.js.map