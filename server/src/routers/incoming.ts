import { Router } from 'express'
import CrawlData from '../controllers/crawlData'

const router = Router()

router.get('/', CrawlData.index)

export default router
