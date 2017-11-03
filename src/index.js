import * as csv from 'd3-dsv'
import * as maps from '@google/maps'
import stringify from 'csv-stringify'
import * as fs from 'fs'
import * as path from 'path'

const load = file => fs.readFileSync(path.join(__dirname, `../data/${file}`), { encoding: 'utf8' })

const exportAsCsv = (data, fileName) => {
  stringify(data, (error, output) => {
    if (error) {
      throw new Error(error)
    }
    try {
      console.log(`Saving ${fileName}.csv`)
      fs.writeFileSync(
        path.join(
          __dirname, 
          `/../output/${fileName}.csv`
        ),
        output
      )
    } catch (error) {
      throw new Error(error)
    }
  })
}

const rawData = csv.csvParse(load('full_data.csv'))

const calles = rawData.map(d => ({
  searchString: `${d.calle_proper}, Granada, Spain`,
  calle: d.calle
}))

exportAsCsv(Array.from(calles.map(d => d.searchString)), 'gc')

const mapsClient = maps.createClient({
  key: 'AIzaSyAG7y6UxZE1PkDPYXKJ0z-zvZgf9ghOiEs'
})

// const geoCode = calle => {
//   return new Promise((resolve, reject) => {
//     mapsClient.geocode({ address: calle.searchString }, (err, response) => {
//       if (err) reject(err)
//       resolve({
//         calle: calle.searchString,
//         calle_old: calle.calle,
//         latitude: response.json.results[0].geometry.location.lat,
//         longitude: response.json.results[0].geometry.location.lng
//       })
//     })
//   })
// }

// Promise.all(calles.map(c => geoCode(c)))
// .then(values => {
//   console.log(values)
//   exportAsCsv(values, '1')
// })