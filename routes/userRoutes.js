const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'cantores.json')

const getUser = () => {
    const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : []

        try {
            return JSON.parse(data)
        } catch (error) {
            return []
        }
}
 const saveUser = (cantores) => fs.writeFileSync(filePath, JSON.stringify(cantores, null, '\t'))


const userRoutes = (app) => {
    app.route('/cantores/:id?')
    .get((req, res) => {
        const cantores = getUser()

        res.send({ cantores })
    })
    .post((req, res) => {
        const cantores = getUser()
        
        cantores.push(req.body)
        saveUser(cantores)

        res.status(200).send('OK')
    })
    .put((req, res) => {
        const cantores = getUser()

        saveUser(cantores.map(cantor => {
            if (cantor.id === req.params.id) {
                return {
                    ...user,
                    ...req.body
                }
            }
            return cantor
        }))
        res.status(200).send('OK')
    })
    .delete((req, res) => {
        const cantores = getUser()

        saveUser(cantores.filter(cantor => cantor.id !== req.params.id))

        res.status(200).send('OK')
    })
}
module.exports = userRoutes