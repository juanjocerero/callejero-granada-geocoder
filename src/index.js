import * as csv from 'd3-dsv'
import * as maps from '@google/maps'
import * as fs from 'fs'
import * as path from 'path'

const load = file => fs.readFileSync(path.join(__dirname, `../data/${file}`), { encoding: 'utf8' })

const rawData = csv.csvParse(load('data.csv'))
const calles = rawData.map(d => `${d.calle_proper}, Granada, Spain`)

const mapsClient = maps.createClient({
  key: 'AIzaSyAG7y6UxZE1PkDPYXKJ0z-zvZgf9ghOiEs'
})

mapsClient.geocode({ address: calles[0] }, (err, response) => {
  if (err) throw new Error(err)
  console.log(response.json.results)
})
