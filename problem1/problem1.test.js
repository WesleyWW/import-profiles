const fs = require('fs')
const parse = require('csv-parse/lib/sync')

const filePath = './problem1/data/staff.csv'

const data = fs.readFileSync(filePath)

const faculty = parse(data, {
  columns: true,
  skip_empty_lines: true
})
const facultyImport = require('./import')

const fac1 = {
    'aa526': {
        staffId: 'aa526',
        firstName: 'Master',
        lastName: 'Splinter',
        email: 'splinter@superu.edu'
    },
    'b0822': {
        staffId: 'b0822',
        firstName: 'Shuri',
        lastName: 'Of Wakanda',
        email: 'shuri@superu.edu'
    },
    '58fc6': {
        staffId: '58fc6',
        firstName: 'Charles',
        lastName: 'Xavier',
        email: 'professorx@superu.edu'
    },
    '241b3': {
        staffId: '241b3',
        firstName: 'Master',
        lastName: 'Yoda',
        email: 'yoda@superu.edu'
    },
    'cb4c1': {
        staffId: 'cb4c1',
        firstName: 'William',
        lastName: 'Kaplan',
        email: 'kaplan21@superu.edu',
        phone: expect.any(String)
    }
}

const fac2 = {
    'aa526': {
        staffId: 'aa526',
        firstName: 'Master',
        lastName: 'Splinter',
        email: expect.stringMatching(/Splinter@superU.edu|splinter@superu.edu/)
    },
    'b0822': {
        staffId: 'b0822',
        firstName: 'Shuri',
        lastName: 'Of Wakanda',
        email: expect.stringMatching(/Shuri@superU.edu|shuri@superu.edu/)
    },
    '58fc6': {
        staffId: '58fc6',
        firstName: 'Charles',
        lastName: 'Xavier',
        email: expect.stringMatching(/ProfessorX@superU.edu|professorx@superu.edu/)
    },
    '241b3': {
        staffId: '241b3',
        firstName: expect.stringMatching(/Master|MaSTeR/),
        lastName: expect.stringMatching(/Yoda|YOda/),
        email: expect.stringMatching(/Yoda@superU.edu|yoda@superu.edu/)
    },
    'cb4c1': {
        staffId: 'cb4c1',
        firstName: 'William',
        lastName: 'Kaplan',
        email: expect.stringMatching(/Kaplan21@superU.edu|kaplan21@superu.edu/),
        phone: expect.any(String)
    }
}


test('Sufficient', () => {
    expect(facultyImport(faculty)).toMatchObject(fac2)
})

test('Idealic', () => {
    expect(facultyImport(faculty)).toMatchObject(fac1)
})
