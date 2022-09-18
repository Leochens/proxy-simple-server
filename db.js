const DB = require(`${__dirname}/db.json`)
const fs = require('fs')

function get(path, defaultVale) {
    const names = path.replace(/\[(\w+)\]/g, ".$1") // a[0].b.c -> a.0.b.c
        .replace(/\[\"(\w+)\"\]/g, ".$1") // a["hello"].b -> a.hello.b
        .replace(/\[\'(\w+)\'\]/g, ".$1") // a["hello"].b -> a.hello.b
        .split(".");
    // 变成[a,0,b,c]的形式

    let res = DB;
    for (let name of names) {
        res = res[name] || defaultVale;
    }
    return res == undefined ? defaultVale : res;
}

function put(newDB) {
    fs.writeFile(`${__dirname}/db.json`, JSON.stringify(newDB), 'utf-8', err => {
        if (err) console.log(err);
        console.log('\n 写入成功 \n');
    })
}
module.exports = {
    DB,
    get,
    put
}