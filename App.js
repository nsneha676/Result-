const express = require('express');
var app = express();
const bodyparser = require('body-parser');

//configuration
app.use(bodyparser.json());
app.set("view engine", "hbs");
app.set("views","./view");
app.use(express.static(__dirname + "/public"));

//SQL Connection
const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'ResultManagement'
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log("DB Connection Success");
    else
        console.log("DB Connection Failed\n Error: "+ JSON.stringify(err,undefined,2));

})

app.listen(3000, ()=> console.log("Running at localhost:3000"));


//index - localhost:3000/
app.get('/',(req,res)=>{
            res.render("index");
})
//add -  localhost:3000/add
app.get('/add',(req,res)=>{
    res.render("adddetails");
})
//search -  localhost:3000/search
app.get('/search',(req,res)=>{
    res.render("search");
})
/*alldetails -  localhost:3000/all
app.get('/alldetails',(req,res)=>{
    res.render("alldetails");
})
*/

//all students
app.get('/alldetails',(req,res)=>{
    mysqlConnection.query('select * from studentsdb',(err,results)=>{
        if(err)
            console.log(err);
        else{
            res.render("alldetails",{data : results});
        }
    })
})

//db connection things 
//add - students post.
//Add new Student
app.get('/addstudents',(req,res)=>{
    mysqlConnection.query('Select * from studentsdb where RollNo = ?',[req.query.RollNo],(err,rows)=>{
        if(!err){
            if(rows.length>0){
                res.render("adddetails",{msgF : true});
            }
            else{
                mysqlConnection.query('Select MAX(id) as maxs from studentsdb',(err,allrow)=>{
                    const a = allrow[0].maxs;
                    mysqlConnection.query('insert into studentsdb values(?,?,?,?,?)',[a+1,req.query.Name,req.query.RollNo,req.query.DOB,req.query.Score], (er,result)=>{
                        if(result.affectedRows > 0){
                            res.render("adddetails",{msg : true});
                        }
                    });
                });
            }
        }
        else
            console.log(err);
    })
})


//db connection things 
//search students
app.get('/searchstudent',(req,res)=>{
    mysqlConnection.query('Select * from studentsdb where RollNo = ? and DOB = ?',[req.query.RollNo, req.query.DOB],(err,rows)=>{
        if(!err){
            if(rows.length == 0){
                res.render("search", {msgF: true});
            }
            else
                res.render("search", {msg : true, Name : rows[0].Name, RollNo: rows[0].RollNo, DOB: rows[0].DOB, Score: rows[0].Score})
        }
        else
            console.log(err);
    })
})



/*Show all students JSON format.
app.get('/details',(req,res)=>{
    mysqlConnection.query('Select * from studentsdb',(err,rows)=>{
        if(!err)
            res.render(rows);
        else
            console.log(err);
    })
}) */


//particular student for update
app.get('/details/:id',(req,res)=>{
    mysqlConnection.query('Select * from studentsdb where id = ?',[req.params.id],(err,rows,feilds)=>{
        if(!err)
            res.render("update",{data : rows});
        else
            console.log(err);
    })
})

//update student
app.get('/updatedetails',(req,res)=>{
    mysqlConnection.query('UPDATE studentsdb SET Name=?, RollNo = ?, DOB = ?, Score = ? WHERE id = ?',[req.query.Name,req.query.RollNo,req.query.DOB,req.query.Score,req.query.id],(err,rows)=>{
        if(!err)
            res.redirect("/alldetails")
        else
            console.log(err);
    });
})

//delete student
app.get('/delete/:id',(req,res)=>{
    mysqlConnection.query('Delete from studentsdb where id = ?',[req.params.id],(err,rows,feilds)=>{
        if(!err)
            res.redirect("/alldetails");
        else
            console.log(err);
    });
})