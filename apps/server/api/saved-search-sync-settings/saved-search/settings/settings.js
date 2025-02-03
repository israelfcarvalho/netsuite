import { Router } from 'express'
import data from './data.json' with {type: 'json'}

const settings = Router()

settings.get('/', (req, res) => {
    return res.json(data)
})

export {
    settings
}