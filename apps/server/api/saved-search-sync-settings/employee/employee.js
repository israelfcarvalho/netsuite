import { Router } from 'express'

const employee = Router()

const employess = Array.from(
    {length: 2000}, (_, i) => ({
        id: `${i}`, name: `Employer ${i}`
    })
)

employee.get('/', (req, res) => {
    res.json(employess)
})

export {
    employee
}