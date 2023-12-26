import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import cors from 'cors'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'

// 1.Forma aún no soportada (ya llegará) de importar json en ESModules
// import movies from './movies.json' with { type: 'json' }

// 2.Forma válida pero algo farragosa
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('movies.json', 'utf-8'))

// 3.La mejor forma que tenemos por ahora
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('./movies.json')

const app = express()
app.use(json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.disable('x-powered-by')

app.get('/', (req, res) => {
  return res.json({ message: 'hola mundo' })
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filterdMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filterdMovies)
  }
  return res.json(movies)
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({
      error: JSON.parse(result.error.message)
    })
  }
  const newMovie = {
    id: randomUUID(),
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.get('/movies/:id', (req, res) => { // path to regexp
  const { id } = req.params
  console.log(id)
  const movie = movies.find(movie => movie.id === id)
  console.log(movie)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ message: result.error.message })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex < 0) {
    res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie
  return res.status(200).json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log('Server listening on port http://localhost:1234')
})
