
exports.upload = function(req,res){
   
//OPEN FILE AND ASSIGN TO VARIABLE
var fs = require('fs');
var data = fs.readFileSync('./uploads/file.csv', "utf8");

var School = require('../models/school.js');  
//School.find({}).remove().exec();
// School.remove({}, function(err) { 
//    console.log('collection removed') 
// });
                                                                                                       
//SPLIT STRING INTO ROWS,TURNS INTO ARRAY
var data = data.split('\n');       

//SPLIT STRING INTO COLUMNS,TURNS INTO ARRAY
//LOOP TO CREATE NEW SCHOOL OBJECT FOR EACH DOCUMENT
data.forEach(function(line) {                                                                                                                                                
    line = line.split(',');   

    if (line.length > 66)//number of columns
        return;                                                                                                                                               

    //makes object                                                                                                                 
    var new_school = {                                                                                                                                                         
					UNITID :line[  0 ],
          INSTNM  :line[  1 ],
          ADDR  :line[  2 ],
          CITY  :line[  3 ],
          STABBR  :line[  4 ],
          ZIP :line[  5 ],
          FIPS  :line[  6 ],
          OBEREG  :line[  7 ],
          CHFNM :line[  8 ],
          CHFTITLE  :line[  9 ],
          GENTELE :line[  10  ],
          FAXTELE :line[  11  ],
          EIN :line[  12  ],
          OPEID :line[  13  ],
          OPEFLAG :line[  14  ],
          WEBADDR :line[  15  ],
          ADMINURL  :line[  16  ],
          FAIDURL :line[  17  ],
          APPLURL :line[  18  ],
          NPRICURL  :line[  19  ],
          SECTOR  :line[  20  ],
          ICLEVEL :line[  21  ],
          CONTROL :line[  22  ],
          HLOFFER :line[  23  ],
          UGOFFER :line[  24  ],
          GROFFER :line[  25  ],
          HDEGOFR1  :line[  26  ],
          DEGGRANT  :line[  27  ],
          HBCU  :line[  28  ],
          HOSPITAL  :line[  29  ],
          MEDICAL :line[  30  ],
          TRIBAL  :line[  31  ],
          LOCALE  :line[  32  ],
          OPENPUBL  :line[  33  ],
          ACT :line[  34  ],
          NEWID :line[  35  ],
          DEATHYR :line[  36  ],
          CLOSEDAT  :line[  37  ],
          CYACTIVE  :line[  38  ],
          POSTSEC :line[  39  ],
          PSEFLAG :line[  40  ],
          PSET4FLG  :line[  41  ],
          RPTMTH  :line[  42  ],
          IALIAS  :line[  43  ],
          INSTCAT :line[  44  ],
          CCBASIC :line[  45  ],
          CCIPUG  :line[  46  ],
          CCIPGRAD  :line[  47  ],
          CCUGPROF  :line[  48  ],
          CCENRPRF  :line[  49  ],
          CCSIZSET  :line[  50  ],
          CARNEGIE  :line[  51  ],
          LANDGRNT  :line[  52  ],
          INSTSIZE  :line[  53  ],
          CBSA  :line[  54  ],
          CBSATYPE  :line[  55  ],
          CSA :line[  56  ],
          NECTA :line[  57  ],
          F1SYSTYP  :line[  58  ],
          F1SYSNAM  :line[  59  ],
          F1SYSCOD  :line[  60  ],
          COUNTYCD  :line[  61  ],
          COUNTYNM  :line[  62  ],
          CNGDSTCD  :line[  63  ],
          LONGITUD  :line[  64  ],
          LATITUDE  :line[  65  ],                                                                                                                                         
    };                                                                                                                                                                       

    /* Store the new entry in MongoDB. */                                                                                                                                    
    School.create(new_school, function(err, school) {                                                                                                                            
        //console.log('newschool:', school);                                                                                                                              
    });                                                                                                                                                                      
}); 
//END LOOP

//LOG RESULTS
School.find(function (err, schools) {
  if (err) return console.error(err);
  console.log(schools)
})

//RENDER PAGE
  School.find({}, function(err, schools) {
    res.render('schools', { 
      title: 'Schools', 
      schools: schools
    });
 });
};//END EXPORT


//SCHOOL DETAILS
exports.findByName = function (req, res) {
	var School=require('../models/school.js');  

 School.find({UNITID:req.params.name}, function(err, schools) {
    res.render('school_details', { 
      title: 'Schools', 
      schools: schools
    });
 });

}; //END EXPORT


