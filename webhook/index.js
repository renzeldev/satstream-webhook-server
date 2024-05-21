var express = require('express');
var router = express.Router();

router.post('/stream-notification', (req, res) => {

    console.log(req.body);
    const socketIo = req.app.get('socketIo');
    
    var payload = {
        StreamId: Number(req.body.StreamId), 
        Description: req.body.StreamName, 
        CustomerId: Number(req.body.CustomerId), 
        MerchantId: Number(req.body.MerchantId),
        AmountRate: Number(req.body.AmountRate), 
        StreamStatusId: Number(req.body.StreamStatusId)
    };
    socketIo.emit('StreamNotification', payload); // to send socket emit

    res.status(200).json(payload);
})

router.post('/deposit-notification', async (req, res) => {
    const socketIo = req.app.get('socketIo');
    var payload = {
        DepositId: Number(req.body.DepositId), 
        CustomerId: Number(req.body.CustomerId), 
        Amount: Number(req.body.Amount), 
        StatusId: Number(req.body.DepositStatusId),
        CreationDate: req.body.CreationDate, 
        UpdateDate: req.body.UpdateDate
    };
    socketIo.emit('DepositNotification', payload);
    res.status(200).send(payload)
})

router.post('/withdrawal-notification', async (req, res) => {
    const socketIo = req.app.get('socketIo');
    var payload = {
        WithdrawalId: Number(req.body.WithdrawalId), 
        CustomerId: Number(req.body.CustomerId), 
        AmountRatea: Number(req.body.AmountRate), 
        WithdrawalStatusId: Number(req.body.WithdrawalStatusId),
        CreationDate: req.body.CreationDate, 
        UpdateDate: req.body.UpdateDate
    };
    socketIo.emit('WithdrawalNotification', payload);
    res.status(200).send(payload)
})

router.post('/customer-balance-notification', async (req, res) => {
    const socketIo = req.app.get('socketIo');
    var payload = {
        CustomerId: Number(req.body.CustomerId), 
        balance: Number(req.body.Balance), 
    };
    socketIo.emit('CustomerBalanceNotification', payload);
    res.status(200).send(payload)
})

router.post('/merchant-balance-notification', async (req, res) => {
    const socketIo = req.app.get('socketIo');
    var payload = {
        MerchantId: Number(req.body.MerchantId), 
        balance: Number(req.body.Balance), 
    };
    socketIo.emit('MerchantBalanceNotification', payload);
    res.status(200).send(payload)
})

router.get('/test', async (req, res) => {
    const socketIo = req.app.get('socketIo');
    socketIo.emit('TestNotification', {Test: 1});

    res.status(200).send({
        status: 'success'
    })
})
module.exports = router;