const fs = require('fs')
const parse = require('csv-parse/lib/sync')

const filePath = 'security.csv'

const data = fs.readFileSync(filePath)

let records = parse(data, {
  columns: true,
  skip_empty_lines: true
})


console.table(records[0])
