const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {
    const {params: { query } } = req
    logic.searchLeagues(query)
        .then(leagues => res.json(success(leagues)))
        .catch(err => res.json(fail(err.message)))
}