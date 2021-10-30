const express = require("express");
const items = require('./fakeDB')
const router = new express.Router();

router.get('/', (req, res) => {
    res.json(items)
})

router.post('/', (req, res) => {
    const newItem = {name : req.body.name, price : req.body.price}
    items.push(newItem)
    return res.status(201).json(newItem)
})

router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (!foundItem) {
        return res.status(400).send("Item not found")
    }
    return res.status(200).json(foundItem)
})

router.patch('/:name', (req, res) => {
    const requestedItem = items.find(item => item.name === req.params.name)
    if (!requestedItem) {
        return res.status(400).send("Item not found")
    }
    let newName = req.body.name
    let newPrice = req.body.price
    if (!newName || !newPrice) {
        return res.status(400).send("Invalid JSON")
    }
    requestedItem.name = req.body.name
    requestedItem.price = req.body.price
    return res.status(200).json(requestedItem)
})

router.delete('/:name', (req, res) => {
    const requestedItem = items.find(item => item.name === req.params.name)
    if (!requestedItem) {
        return res.status(400).send("Item not found")
    }
    items.splice(requestedItem,1)
    return res.status(200).json({"message": "Deleted"})
})

module.exports = router