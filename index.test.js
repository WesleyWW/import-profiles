const fs = require('fs')
const parse = require('csv-parse/lib/sync')

const filePath = 'security.csv'

const data = fs.readFileSync(filePath)

const faculty = parse(data, {
  columns: true,
  skip_empty_lines: true
})
const getSecurity = require('./index')


const sacuridy = {
    '11111': {
      id: '11111',
      firstName: 'Billy',
      lastName: expect.stringMatching(/CRANSTON|Cranston/),
      email: expect.stringMatching(/Billy@mmpr.org|billy@mmpr.org/)
    },
    '22222': {
      id: '22222',
      firstName: 'Kimberly',
      lastName: 'Hart',
      email: expect.stringMatching(/Kimberly@mmpr.org|kimberly@mmpr.org/)
    },
    '33333': {
      id: '33333',
      firstName: 'Trini',
      lastName: 'Kwan',
      email: expect.stringMatching(/Trini@mmpr.org|trini@mmpr.org/)
    },
    '44444': {
      id: '44444',
      firstName: 'Jason',
      lastName: 'Lee',
      email: expect.stringMatching(/Jason@mmpr.org|jason@mmpr.org/)
    },
    '55555': {
      id: '55555',
      firstName: 'Zack',
      lastName: 'Taylor',
      email: expect.stringMatching(/Zack@mmpr.org|zack@mmpr.org/)
    }
}
const sacuridy2 = {
  '11111': {
    id: '11111',
    firstName: 'Billy',
    lastName: 'Cranston',
    email: 'billy@mmpr.org'
  },
  '22222': {
    id: '22222',
    firstName: 'Kimberly',
    lastName: 'Hart',
    email: 'kimberly@mmpr.org'
  },
  '33333': {
    id: '33333',
    firstName: 'Trini',
    lastName: 'Kwan',
    email: 'trini@mmpr.org'
  },
  '44444': {
    id: '44444',
    firstName: 'Jason',
    lastName: 'Lee',
    email: 'jason@mmpr.org'
  },
  '55555': {
    id: '55555',
    firstName: 'Zack',
    lastName: 'Taylor',
    email: 'zack@mmpr.org'
  }
}

test('Sufficient', () => {
    expect(getSecurity(faculty)).toMatchObject(sacuridy)
})

test('Idealic', () => {
    expect(getSecurity(faculty)).toMatchObject(sacuridy2)
})
