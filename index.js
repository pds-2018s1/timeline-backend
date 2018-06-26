import start from './src/server'

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? process.env.PORT : 3001

start().listen(port, () => {
  /* eslint no-console: 0 */
  console.log(`Server running on port ${port}`)
})