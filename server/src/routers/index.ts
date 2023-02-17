import { Express } from 'express'
import router from './incoming'
function routerIndex(app: Express) {
  app.use('/crawl', router)
}

export default routerIndex
