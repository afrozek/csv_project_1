
exports.upload = function(req,res){
    console.log(req.files);
    //res.end("File uploaded.");

    //OPEN FILE
var fs = require('fs');
var file = fs.readFileSync('./uploads/file.csv', "utf8");
//console.log(file);

//DATA INTO MONGO  

var School = require('../models/school.js');  

var data = file;                                                                                                        

data = data.split('\n');                                                                                                                                                     

data.forEach(function(line) {                                                                                                                                                
    line = line.split(',');   

    if (line.length != 3)
        return;                                                                                                                                               

    /* Create an object representation of our CSV data. */                                                                                                                   
    var new_school = {                                                                                                                                                         
        name: line[0],                                                                                                                                                   
        state: line[1], 
        details: line[2],                                                                                                                                                  
    };                                                                                                                                                                       

    /* Store the new entry in MongoDB. */                                                                                                                                    
    School.create(new_school, function(err, school) {                                                                                                                            
        //console.log('Created new rank!', rank);                                                                                                                              
    });                                                                                                                                                                      
});

// database query, getting from mongo
// School.find(function (err, schools) {
//   if (err) return console.error(err);
//   console.log(schools)
// })
School.find(function (err, schools) {
  if (err) return console.error(err);
  console.log(schools)
})

//render the page
  School.find({}, function(err, schools) {
    res.render('schools', { 
      title: 'Schools', 
      schools: schools
    });
 });
};

