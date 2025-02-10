import { Router } from 'express'
import { savedSearchSyncSettings } from './saved-search-sync-settings/saved-search-sync-settings.js'
import { scheduleQueueManage } from './schedule-queue-manage/index.js'


const api = Router()

api.use('/schedule-queue-manage', scheduleQueueManage)
api.use('/saved-search-sync-settings', savedSearchSyncSettings)

export {
    api
}