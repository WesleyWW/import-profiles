/* FORMAT FOR STAFF DATA */

let staff = {} //Object to be sent to the DB

/* Build a teacher object like this */
let teacher = {
    "staffId":      "BC3899", //Unique identifier,  {string}
    "firstName":    "Amanda", //camel case          {string}
    "lastName":     "Frizzle", //camel case         {string}
    "email":        "thefrizz@msb.edu", //lowercase {string}
    "phone":        "235-555-8496",//10 digits      {string}
}

/* 
    After bulding each teacher object, add it to the staff map using 'staffId' 
    as the key and the teacher object as the value
     Hint:
    staff[teacher.id] = teacher 
*/
