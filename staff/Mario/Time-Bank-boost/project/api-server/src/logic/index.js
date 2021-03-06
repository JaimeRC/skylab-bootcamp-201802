const { User, Service, Contract, Review } = require('../models')

function validateStringProp(prop, value) {
    if (typeof value === 'undefined' || !value.trim().length) throw Error(`${prop} cannot be undefined or empty`)
}

function validateStringProps(obj) {
    for (const prop in obj) {
        const value = obj[prop]

        validateStringProp(prop, value)
    }
}

function validateStringArrayProp(prop, arr) {
    if (typeof arr === 'undefined' || !arr.length) throw Error(`${prop} cannot be undefined or empty`)

    for (let i = 0; i < arr.length; i++)
        validateStringProp(`${prop}[${i}]`, arr[i])
}

const logic = {
    registerUser(name, surname, username, password, city, borough, email, serviceIds) {
        return Promise.resolve()
            .then(() => {
                validateStringProps({ name, surname, username, password, city, borough, email })
                validateStringArrayProp('serviceIds', serviceIds)

                return User.findOne({ username })
            })
            .then(user => {
                if (user) throw Error('username already exists')

                return Service.find({ _id: { $in: serviceIds } })
            })
            .then(_services => {
                if (!_services || _services.length !== serviceIds.length)
                    throw Error(`service ids are not valid ${serviceIds}`)

                const services = []

                for (service of _services)
                    services.push(service._id)

                const user = new User({ name, surname, username, password, city, borough, email, services })

                return user.save()
            })
            .then(user => user._id.toString())
    },

    listUsers() {
        return User.find({})
    },

    updateUser(id, name, surname, email, username, password, newUsername, newPassword) {
        // TODO
    },

    retrieveUser(_id) {
        return Promise.resolve()
            .then(() => {
                validateStringProps({ _id })

                //return User.findOne({ id }, 'id name surname email username') // WARN! it returns _id too!
                return User.findOne({ _id }, { _id: 0, password: 0 })
            })
            .then(user => {
                if (!user) throw Error('user does not exist')

                return user
            })
    },

    removeUser(id, username, password) {
        // TODO
    },

    listServices() {
        return Service.find()
    },

    listContractsServed(serverId) {
        // TODO
    },

    listContractsRequested(clientId) {
        // TODO
    },

    makeContract(serviceId, serverId, clientId) {
        // TODO
    },

    acceptContract(contractId, serverId, estimatedTime) {
        // TODO
    },

    rejectContract(contractId, serverId) {
        // TODO
    },

    markContractDone(contractId, serverId, dedicatedTime) {
        // TODO
    },

    validateContract(contractId, clientId, validatedTime) {
        // TODO
    },

    cancelContract(contractId, clientId) {
        // TODO
    },

    addUserReview(contractId, userId, comment, valuation) {
        // TODO
    },

    listUserReviews(userId) {
        // TODO
    }
}

module.exports = logic