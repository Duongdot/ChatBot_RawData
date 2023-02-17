import express from 'express'
import cors from 'cors'
import routerIndex from './routers'
const app = express()

const PORT = 8005
app.use(cors())
routerIndex(app)
app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
