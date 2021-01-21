const fs = require('fs')
const parse = require('csv-parse/lib/sync')


const $staff = fs.readFileSync('./data1/Staff.csv')
const $students = fs.readFileSync('./data1/Student.csv')
const $courses = fs.readFileSync('./data1/CourseSection.csv')
const $enrollments = fs.readFileSync('./data1/Enrollment.csv')


console.log(records)
module.exports = {

    testImport: function*(db, settings, initiator){
        //files to parse
        let staff       = parse($staff, { columns: true, skip_empty_lines: true })
        let students    = parse($students, { columns: true, skip_empty_lines: true })
        let classes     = parse($courses, { columns: true, skip_empty_lines: true })
        let enrollments = parse($enrollments, { columns: true, skip_empty_lines: true })

        //input object for data after parsing
        var input = {users: {}, students: {}, rosters: {}, contacts: {}}

        /* 
            Loop through each file
            format data
            add to corresponding input object
        */
       staff.forEach(s => {
            //s = id,first_name,last_name,email,phone,homeroom
            let user = { 
                staffId: s['id'].trim(), 
                firstName: s['first_name'].trim(), 
                lastName: s['last_name'].trim()
            } //subSchools, subSchoolsArray, memberSchools, notificationPrefs

            //if email
            if(s['email']){
                user.email = s['email'].trim()
            }
            //if phone
            if(s['phone']){
                user.notificationPrefs = {sms: s['phone']}
            }


            //add item to input
            addItem(input.users, user, 'staffId');
       })

       students.forEach(s => {
            //s = id,first_name,last_name,grad_year,grade,email,phone
            let student = {
                studentId: s['id'].trim(),
                firstName: s['first_name'].trim(),
                lastName: s['last_name'].trim(),
                grade: s['grade'].trim(),
                studentEmail: s['email'].trim()
            }

            //if phone
            if(s['phone']) {
                student.studentPhone = s['phone']
            }

            //add item to input
            addItem(input.students, student, 'studentId');
       })

       classes.forEach(c => {
        //course_name,course_id,section_id,faculty_id
        let classId = c['course_id']   + " - " + c['section_id']
        let sectionId = c['course_name'] + " - " + classId

        let staffId = c['faculty_id']

        let roster = {
            classId,
            sectionId,
            students: [],
            users: []
        }

        //add item to input
        addItem(input.rosters, roster, 'classId')

        //add staffId to users if doesn't exist
        if(input.rosters[classId].users.indexOf(staffId) == -1){
            input.rosters[classId].users.push(staffId)
        }
       })

       enrollments.forEach(e => {
           //"student_id","course_id","section_id"

           //add students to rosters
           let classId   = e['course_id'];
           let studentId = e['student_id'];
     
           if(input.rosters[classId] && input.rosters[classId].students.indexOf(studentId) == -1){
             input.rosters[classId].students.push(studentId);
           }
       })


       const updateDB = (input) => {
           //check the input
           console.log(input.staff)
       }

       updateDB(input)
    }
}

testImport()
