import { Router } from 'express'
import { employee } from './employee/employee.js'

const savedSearchSyncSettings = Router()

savedSearchSyncSettings.use('/employee', employee)

const savedSearchSyncData = Array.from({length: 10}, (_, index) => ({
    id: index,
    name: 'All Transactions',
    isInactive: false,
    savedSearch: {
        id: '1994',
        name: 'DM | Transactions'
    },
    dateFilterField: 'trandate',
    period: {
        id: '1',
        name: 'monthly'
    },
    destinyFolderPath: 'Isaac SM Testing',
    fileNamePrefix: 'sm-isaac-testing',
    appendExecutionDateToFileName: true,
    createPeriodFolder: true,
    notificationSettings: {
        id: '1',
        name: 'Main Notification'
    },
    storageSettings: {
        id: '1',
        name: 'Isaac Sharepoint'
    }
}))

/**
 * @param {number} pageSize 
 * @param {number} pageIndex 
 * @returns {object}
 */
const getSavedSearchSyncSettings = (pageSize, pageIndex) => {

    return {
        summary: {
            page: {
                count: 1,
                index: 0,
                isLast: true,
                isFirst: true
            },
            result: {
                currentCount: 1,
                totalCount: 1
            }
        },
        data: savedSearchSyncData
    }
}

savedSearchSyncSettings.get('/', (req, res) => {
    const { pageSize, pageIndex, action, id } = req.query

    if(action === 'by-id'){
        if(id === undefined || !id.length){
            return res.status(400).json({error: {
                code: '400',
                message : `Invalid id ${id}`
            }})
        } else {
            const savedSearchSyncSetting = savedSearchSyncData.find(item => item.id === Number(id))

            if(savedSearchSyncSetting === undefined){
                return res.status(404).json({error: {
                    code: '404',
                    message : `Saved Search Sync Setting with id ${id} not found`
                }})
            }

            return res.json(savedSearchSyncSetting)
        }
    }

    return res.json(getSavedSearchSyncSettings(pageSize, pageIndex))
})

export {
    savedSearchSyncSettings
}