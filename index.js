const express = require('express')
const app = express()
const port = 3000
const {
    put,
    DB:db
} = require('./db.js')

app.get('/get', function (req, res) {
    return res.json(db)
})

app.get('/pac', function (req, res) {
    const {
        id,
    } = req.query
    res.setHeader('content-type',"text/html; charset=utf-8")
    // 此处还可以针对不同host进行定向代理
    // function FindProxyForURL(url, host){
    //     if(host == "xxxx" ) {
    //     return "PROXY 192.168.2.82:8888";
    //     }
    //     return "DIRECT";
    // }
    console.log("查询"+id+'的代理配置');
    const {ip,port} = db[id]
    return res.send(`
    function FindProxyForURL(url, host){
        return "PROXY ${ip}:${port};DIRECT";
    }
    `)
})

app.get('/set', function (req, res) {
    const {
        id,
        ip,
        port
    } = req.query
    console.log(ip, port)
    db[id] = {
        ip,
        port
    }
    put(db)
    return res.json(db)
})


app.listen(port, () => {
    console.log("started at: " + port)
})