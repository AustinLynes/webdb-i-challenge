const express = require('express');

const db = require('./data/dbConfig.js');

function find(id) {
    if (id) {
        return db('accounts').where('id', id).first()
    } else {
        return db('accounts')
    }
}

function insert(account) {
    return db('accounts').insert(account)
}

function update(id, changes){
    return db('accounts').update(changes).where('id', id)
}

function remove(id){
    return db('accounts').where('id', id).del()
}
const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
    find()
        .then((_account) => {
            if (!_account) {
                res.status(404).json({ messege: 'sorry boss cant get that' })
            } else {
                res.status(200).json(_account)
            }
        }).catch((err) => {
            res.status(500).json({ messege: 'sorry boss Internal Error:', err })

        })
})
server.get('/accounts/:id', (req, res) => {
    const id = req.params.id
    find(id)
        .then((_account) => {
            if (!_account) {
                res.status(404).json({ messege: 'sorry boss cant get that' })
            } else {
                res.status(200).json(_account)
            }
        }).catch((err) => {
            res.status(500).json({ messege: 'sorry boss Internal Error:', err })

        })
})

server.post('/accounts', (req, res) => {
    const account = req.body
    insert(account)
        .then((_account) => {
            if (!_account) {
                res.status(404).json({ messege: 'sorry boss cant get that' })
            } else {
                res.status(201).json({messege:'account created successfully Boss!', account})
            }
        })
        .catch(() => {
            res.status(500).json({ messege: 'sorry boss Internal Error:', err })
        })
})

server.put('/accounts/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
 
    update(id, changes)
        .then((_account) => {
           
            if (!_account) {
                res.status(404).json({ messege: 'sorry boss cant get that' })
            } else {
                res.status(200).json({messege:'account Updated successfully Boss!', _account})
            }
        })
        .catch((err) => {
            res.status(500).json({ messege: 'sorry boss Internal Error:', err })
        })
})

server.delete('/accounts/:id', (req, res) => {
    const id = req.params.id
 
    remove(id)
        .then((_account) => {
           
            if (!_account) {
                res.status(404).json({ messege: 'sorry boss cant get that' })
            } else {
                res.status(200).json({messege:'account Deleted successfully Boss... its gone forever!', _account})
            }
        })
        .catch((err) => {
            res.status(500).json({ messege: 'sorry boss Internal Error:', err })
        })
})

module.exports = server;