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
 *    -->This is a typical csv file, each row is a new record with values in separated by commas
 *    -->The first row contains a map of the column headers
 * We have imported some @records from a csv file; type 'npm run start' in your console to view @records
 *    -->It is an array of objects, the headers represent object keys, the columns hold the values
 *    -->Each row represent a different record
 *    -->When you are done, comment out the following return statement
 */
// return console.table(records)
 /* 
 * You will be asked to write a function putting this data into a structure we can save to MongoDB and use later
 * Here is the format:
 *    ex.: '111111': { staffId: 111111, firstName: 'Billy', lastName: 'Cranston', email: 'billy@mmpr.org' }
 *         |__KEY__| |____________________________________VALUE___________________________________________|  
 *    ^The first record should look like an object with these key/value pairings
 *     Place all the records in a a variable object named "security"
 * */ 

 /* EXAMPLE */
const getSecurity = (array) => {
  let security = {}
  //Iterate over array
  array.forEach(person => { 
    let ranger = { 
          "id":         person['ID'], 
          "firstName":  person['FIRST_NAME'],
          "lastName":   person['LAST_NAME'],
          "email":      person['EMAIL']
        }
    const id = ranger.id
    security[id] = ranger
  })
  console.table(security)
}

getSecurity(records)