import { Router } from 'express'
import { settings } from './settings/settings.js'

const savedSearch = Router()

savedSearch.use('/settings', settings)
export {
    savedSearch
}