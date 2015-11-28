var GoogleSpreadsheet = require("google-spreadsheet");
var dateFormat = require('dateformat');
var my_sheet = new GoogleSpreadsheet('10Q6yoPV8rdH8ia-hq7piLEfo4QeYoksFwtRUlQKU3P0');
var creds = require('./smarthome-bbf394ad2e8a.json');

module.exports =  function(temp) {    
    my_sheet.useServiceAccountAuth(creds, function(err){
        // getInfo returns info about the sheet and an array or "worksheet" objects 
        my_sheet.getInfo( function( err, sheet_info ){
            if (err) console.log(err)
            else {
                console.log( 'Google Sheet "' + sheet_info.title + '" is loaded' );
                // use worksheet object if you want to stop using the # in your calls 
                var sheet1 = sheet_info.worksheets[0];
                // column names are set by google and are based 
                // on the header row (first row) of your sheet 
                sheet1.addRow({ 
                    Date: dateFormat(new Date(),'mm-dd-yyyy'), 
                    Hour: dateFormat(new Date(), 'HH:MM'), 
                    Temperature: temp
                }, function(err){
                    if (err) console.log(err)
                })
            }
            
        });
     
      
     
    })
}
