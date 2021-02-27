const fs = require('fs')
const parse = require('csv-parse/lib/sync')

const filePath = './data/staff.csv'

const data = fs.readFileSync(filePath)

let faculty = parse(data, {
  columns: true,
  skip_empty_lines: true
})


/* PROBLEM 1 */
/*
    Iterate over the faculty data and return a staff object containing 
    all the staff members formatted according to the "format.js" file 
    in this folder.  
*/

facultyImport = (array) => {
    let staff = {}

    for(person of array){
        
    }

    return staff
}

facultyImport(faculty)

