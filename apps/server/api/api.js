import { Router } from 'express'
import { savedSearchSyncSettings } from './saved-search-sync-settings/saved-search-sync-settings.js'


const api = Router()

api.use('/saved-search-sync-settings', savedSearchSyncSettings)

export {
    api
}