const z = require('zod')

const movieEschema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Movie poster must be a valid url'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama',
      'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']),
    {
      required_errpr: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be in array of enum Genre'
    }
  )
})

function validateMovie (input) {
  return movieEschema.safeParse(input)
}

function validatePartialMovie (input) {
  return movieEschema.partial().safeParse(input)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
