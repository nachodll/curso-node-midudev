import mysql from 'mysql2/promise'
import 'dotenv/config'

const DEFAULT_CONFIG = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'moviesdb'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )
      if (genres.length === 0) return []
      const [{ id }] = genres

      const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
        FROM movie JOIN movie_genres 
        WHERE genre_id = ?;`, [id]
      )

      return movies
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )
    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
      FROM movie
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    return movies
  }

  static async create ({ input }) {
    const {
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    // faltaria crearlaas con genres

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )
    } catch (e) {
      // no enseñar error al usuario, puede ser comprometedor
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
      FROM movie
      WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
      FROM movie
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    if (movies[0]) {
      connection.query(
        'DELETE FROM movie WHERE id=UUID_TO_BIN(?);',
        [id]
      )
      return movies[0]
    }
    return []
  }

  static async update ({ id, input }) {
  }
}
