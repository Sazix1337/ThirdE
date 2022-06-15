const $mysql = require('mysql2')
const $connection = $mysql.createConnection({
    user: '...',
    password: '...',
    database: '...',
    host: '...'
})

$connection.connect((error) => {
    if (error) {
        console.log("Error with connection. ".concat(error))
        return
    }

    console.log(`Подключен к айди ветки: ${$connection.threadId}`)
})

module.exports = $connection