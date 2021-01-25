const fs = require('fs')
const parse = require('csv-parse/lib/sync')

const filePath = 'security.csv'

const data = fs.readFileSync(filePath)

let records = parse(data, {
  columns: true,
  skip_empty_lines: true
})

/**
 * Locate the 'security.csv' file in the root folder.  Open and view it. 
 *    -->This is a typical csv file, each row is a new record with values separated by commas
 *    -->The first row contains a map of the column headers
 * We have imported some @records from a csv file; type 'npm run start' in your console to view @records
 *    -->It is an array of objects, the headers represent object keys, the columns hold the values
 *    -->Each row represent a different record
 *    -->When you are done, comment out the following return statement
 */
// return console.table(records)
 /* 
 * You will be asked to write a function putting this data into a structure we can save to MongoDB and use later
 * Here is the required format:
 *    ex.: '111111': { staffId: 111111, firstName: 'Billy', lastName: 'Cranston', email: 'billy@mmpr.org' }
 *         |__KEY__| |____________________________________VALUE___________________________________________|  
 *    ^The first record should look like an object with these key/value pairings
 *     Place all the records in a a variable object named "security"
 * */ 

 /* EXAMPLE */
const getSecurity = (array) => {
  let security = {} //Will be saved to the db after building
  //Iterate over array
  for(person of array) { 
    //Build a ranger object
    let ranger = { 
          "id":         person['ID'], //value from 'ID' column of this row
          "firstName":  person['FIRST_NAME'],
          "lastName":   person['LAST_NAME'],
          "email":      person['EMAIL']
    }
    //Add ranger to security object
    //Using the ranger's id as the key
    security[ranger.id] = ranger
  }
  console.table({security}) 
  console.log({security})
  return security
}
/* run the 'start' command in the console again to see the results*/
getSecurity(records)
/*
 * That's it; we take the data from the csv file and only use the information we need
 * to create a new JSON object of our security team.  Expand the 'problem1' folder,
 * explore it and open up 'import.js'.
*/

