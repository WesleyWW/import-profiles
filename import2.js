function getGradeFromRoman(roman){
    let grade = 0
    const romans = { "I": 1, "V": 5, "X": 10 }
    const letters = roman.split('')
    for(let i=0; i < letters.length; i++){
        if(letters[i] < letters[i+1]){
            grade -= romans[letters[i]]
        }else{
            grade += romans[letters[i]]
        }
    }
    return grade
}


module.exports = {


    testImport: function*(db, settings, initiator){
         //files to parse
         let staff       = $staff._resource;
         let students    = $students._resource;

         //input object for data after parsing
        var input = {users: {}, students: {}, rosters: {}, contacts: {}}

        /* 
            Loop through staff file for users
            Loop through students file for students & rosters
        */

        staff.forEach(s => {
            // s = "ID","LAST_NAME","FIRST_NAME","LOCATION","TYPE","EMAIL","WEB_ID"

            let user = {
                staffId: s['ID'],
                firstName: s['FIRST_NAME'].trim(),
                lastName: s['LAST_NAME'].trim(),
                subSchools: {},
                subSchoolsArray: [],
                notificationPrefs: { email: s['EMAIL']} //???
            }

            //if phone number add to user

            if(s['EMAIL']){
                user.email = s['EMAIL'].trim().toLowerCase()
            }

            if(s['LOCATION'] && s['LOCATION'] != ""){
                if(!user.subSchools[s['LOCATION']]){
                    user.subSchools[s['LOCATION']] = true
                }
                if(!subSchoolsArray.includes(s['LOCATION'])){
                    subSchoolsArray.push(s['LOCATION'])
                }
            }

            //add item to input
            addItem(input.users, user, 'staffId');
        })


        students.forEach(s => {
            /*
                s = "ID","STUDENT_NAME","ST_SORT_KEY","CURRENT_GRADE","ADVISOR_NAME","SCHOOL_ID","SCHOOL_ID_SORT",
                "COURSE_ID","SECTION_ID","COURSE_FULL_NAME","COURSE_TYPE","FACULTY_ID","FACULTY_FULL_NAME",
                "FACULTY_SORT_KEY","NO_STUDENTS_SCHED","TERM1","TERM2","TERM3","TERM4","FACULTY_ID_2","FACULTY_FULL_NAME_2","FACULTY_SORT_KEY_2"
            */
            //build student
            let studentId = s['ID']
            let student = {}
            if(!input.students[studentId]){
                const name = s['ST_SORT_KEY'].split(',')
                const lastName = name[0].trim() //caps
                const firstName = name[1].trim() //caps
                const grade = getGradeFromRoman(s['CURRENT_GRADE'])

                student = {
                    studentId,
                    firstName,
                    lastName,
                    grade,
                    // subSchools, //is this needed?
                    // subSchoolsArray //is this needed?
                }

                //add item to input
                addItem(input.students, student, 'studentId');
            }

            //create or add to roster
            const classId = s['SECTION_ID']
            const sectionId = s['COURSE_FULL_NAME'] + ' - ' + classId
            const staffId = s['FACULTY_ID']
            let staffId2
            
            //roster build
            let roster = {
                classId,
                sectionId,
                students: [
                    studentId
                ],
                users: [
                    staffId
                ]
            }

            //if staff2, add to build or exisiting roster
            if(s['FACULTY_ID_2'] && s['FACULTY_ID_2'] != ''){
                staffId2 = s['FACULTY_ID_2']
                if(input.rosters[classId].users.indexOf(staffId2) == -1){
                    input.rosters[classId].users.push(staffId2)
                }else{
                    roster.users.push(staffId2)
                }
            }

            //add student to existing roster
            if(input.rosters[classId] && input.rosters[classId].students.indexOf(studentId) == -1){
                //update roster with student and other staff
                input.rosters[classId].students.push(studentId)
            }else{
                //add roster item to input
                addItem(input.rosters, roster, 'classId')
            }
        })

        const updateDB = updateDB(() => {
            //do some stuff
            return 'stuff'
        })
 
        return updateDB
    }

}
