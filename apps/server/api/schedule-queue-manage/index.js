import { Router } from 'express'

const scheduleQueueManage = Router()

const getScheduleQueueManage = (deploymentId) => {
    return {
        script: `script for deployment id ${deploymentId}`,
        deployment: `deployment for deployment id ${deploymentId}`,
        scriptType: `scriptType for deployment id ${deploymentId}`,
        lastExecutedDate: new Date().toDateString(),
        lastExecutedBy: 'api',
        lastExecutionStatus: `status for deployment id ${deploymentId}`
    }
}

scheduleQueueManage.get('/', async (req, res) => {
    const { scheduleQueueManager } = req.query

    if(scheduleQueueManager === undefined){
        res.status(400).send(JSON.stringify({
            error: {
                code: 'development server error',
                message: 'no deployment id was provided'
            }
        }))
    }

    await new Promise(res => {
        setTimeout(() => {
            res()
        }, 1000)
    })

    return res.json(getScheduleQueueManage(scheduleQueueManager))
})

const success = {"status":"error","message":"This script deployment is already running"}
const error = {"status":"success","message":"Script execution successfully queued"}

const response = [success, error]
let count = 0

scheduleQueueManage.post('/', async (req, res) => {
    const { scheduleQueueManager } = req.body

    if(scheduleQueueManager === undefined){
        res.status(400).send(JSON.stringify({
            error: {
                code: 'development server error',
                message: 'no deployment id was provided'
            }
        }))
    }

    await new Promise(res => {
        setTimeout(() => {
            res()
        }, 1000)
    })

    res.json(response[count++ % 2])
})

export {
    scheduleQueueManage
}