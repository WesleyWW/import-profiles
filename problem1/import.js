const fs = require('fs')
const parse = require('csv-parse/lib/sync')

const filePath = './problem1/data/staff.csv'

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
        let staffId = person['TEACHER_ID']//+""
        let email = person['EMAIL'].toLowerCase().trim()
        let phone = person['PHONE']+""

        let user = { staffId, firstName: person['FIRST_NAME'], lastName: person['LAST_NAME'], email }
        
        if(phone && phone.length > 0){
          user.phone = phone
        }

        staff[staffId] = user
    }
    console.log({staff})
    return staff
}

facultyImport(faculty)

module.exports = facultyImport;