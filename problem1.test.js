const fs = require('fs')
const parse = require('csv-parse/lib/sync')

const filePath = './problem1/data/staff.csv'

const data = fs.readFileSync(filePath)

const faculty = parse(data, {
  columns: true,
  skip_empty_lines: true
})
const facultyImport = require('./problem1/import')

const fac1 = {
    'aa526': {
        id: 'aa526',
        firstName: 'Master',
        lastName: 'Splinter',
        email: 'splinter@superu.edu'
    },
    'b0822': {
        id: 'b0822',
        firstName: 'Shuri',
        lastName: 'Of Wakanda',
        email: 'shuri@superu.edu'
    },
    '58fc6': {
        id: '58fc6',
        firstName: 'Charles',
        lastName: 'Xavier',
        email: 'professorx@superu.edu'
    },
    '241b3': {
        id: '241b3',
        firstName: 'Master',
        lastName: 'Yoda',
        email: 'yoda@superu.edu'
    },
    'cb4c1': {
        id: 'cb4c1',
        firstName: 'Bill',
        lastName: 'William',
        email: 'kaplan21@superu.edu'
    }
}

const fac2 = {
    'aa526': {
        id: 'aa526',
        firstName: 'Master',
        lastName: 'Splinter',
        email: expect.stringMatching(/Splinter@superU.edu|splinter@superu.edu/)
    },
    'b0822': {
        id: 'b0822',
        firstName: 'Shuri',
        lastName: 'Of Wakanda',
        email: expect.stringMatching(/Shuri@superU.edu|shuri@superu.edu/)
    },
    '58fc6': {
        id: '58fc6',
        firstName: 'Charles',
        lastName: 'Xavier',
        email: expect.stringMatching(/ProfessorX@superU.edu|professorx@superu.edu/)
    },
    '241b3': {
        id: '241b3',
        firstName: expect.stringMatching(/Master|MaSTeR/),
        lastName: expect.stringMatching(/Yoda|YOda/),
        email: expect.stringMatching(/Yoda@superU.edu|yoda@superu.edu/)
    },
    'cb4c1': {
        id: 'cb4c1',
        firstName: 'Bill',
        lastName: 'William',
        email: expect.stringMatching(/Kaplan21@superU.edu|kaplan21@superu.edu/),
        phone: expect.any(String)
    }
}


test('Sufficient', (fac2) => {
    expect(facultyImport(faculty)).toMatchObject(sacuridy)
})

test('Idealic', (fac1) => {
    expect(facultyImport(faculty)).toMatchObject(sacuridy2)
})
