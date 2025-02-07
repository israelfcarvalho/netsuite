import { Router } from 'express'
import data from '../saved-search/settings/data.json' with {type: 'json'}

const employee = Router()

employee.get('/', (req, res) => {
    res.json(data)
})

export {
    employee
}