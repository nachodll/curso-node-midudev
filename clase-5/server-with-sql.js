import { MovieModel } from './models/my-sql/movie.js'
import { createApp } from './app.js'

createApp({ movieModel: MovieModel })
