const $db = require('./src/db/mysql_connection')
const readline = require('readline')
const $ = require('najax')
const uuid = require('./lib/uuid')
const parseUserObject = require('./lib/robtopParser')

const cin = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("Инициализация ThirdE Server")
const initialize = () => {
    
}
const createBotAcc = (url, prefix, email) => {
    const username = 'ThirdE'
    const password = passwordGen()
    const secret = "Wmfv3899gc9"
    $({
        url: `${url}/${prefix}/accounts/registerGJAccount.php`,
        method: 'POST',
        data: {
            userName: username,
            email,
            password,
            secret
        },
        complete: (status) => {
            if (parseInt(status) == 1) {
                console.log(`Аккаунт ${username} с паролем ${password} был успешно создан! Статус: ${status}`)
                $db.query(`INSERT INTO botConfig (url, prefix, username, email, password) VALUES (${url}, ${prefix}, ${username}, ${email}, ${password})`,(error, res) => {
                    if (error) {
                        throw new Error(error)
                    }
                    console.log("Данные успешно записали в базу данных")
                })
                return status
            }
            if (parseInt(status) <= -1) {
                console.log(`Аккаунт "${username}" с паролем "${password}" не был создан. Статус: "${status}"`)
                return status
            }
        }
    })
}

const loginBotAcc = (url, prefix) => {
    $db.query(`SELECT password FROM botConfig WHERE url = "${url}" AND prefix = "${prefix}"`, (error, res) => {
    if (error) {
        throw new Error(error)
    }

    const username = 'ThirdE'
    console.log(res)
    let password = res[0]["password"]
    const secret = "Wmfv3899gc9"
    let UUID = uuid()
    $({
        url: `${url}/${prefix}/accounts/loginGJAccount.php`,
        method: 'POST',
        data: {
            userName: username,
            udid: uuid(),
            password,
            secret
        },
        complete: (status) => {
            if (parseInt(status) == 1) {
                console.log(`Аккаунт ${username} с паролем ${password} успешно вошел в систему! Статус: ${status}. Аккаунт айди ${Array.from(JSON.stringify(status.split(',')))[2]}`)
            }
            const accountID = Array.from(JSON.stringify(status))[2]
            const userID = Array.from(JSON.stringify(status))[3/* Не знаю */] 
            console.log(accountID)
            $connection.query(`UPDATE botConfig SET accountID = \`${accountID}\`, userID = \`${userID}\`, UUID = \`${uuid}\``, (error, res) => {
                if (error) {
                    console.log(error)
                    return
                }
                console.log(res)
            })

                if (parseInt(status) != 1) {
                    console.log(`Аккаунт "${username}" с паролем "${password}" не вошел в систему по неизвестной причине. Статус: "${status}".`)
                }
            }
        })
    })
}

const passwordGen = () => {
    let code = ''
    let symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    
    for (let i = 0; i < 9; i++) {
        code = code + symbols.charAt(Math.floor(Math.random() * symbols.length))
    }
    return code
}

const addServer = () => {
    $db.query("SELECT * FROM gdpsList", (error, res) => {
        if (error) {
            throw new Error(error)
        }
        const serverlist = res
        console.log('_______________________________')
        console.log("Сохраненные приватные сервера:")
        if (!serverlist.length) {
            console.log("   У вас нету сохраненных приватных серверов.")
        } else {
            for (let i = 0; i < serverlist.length; i++) {
                const j = i + 1
                console.log(`   [${j}] - ${serverlist[i]["gdpsname"]} by ${serverlist[i]["author"]}`)
            }
            console.log("_______________________________\n")
        }
    
        cin.question("[A] - Добавить новый сервер\n[B] - Начать отслеживание.\nОтвет >>> ", answer => {
            switch (answer) {
                case "A":
                    cin.question("Введите URL (без последнего слеша): ", url => {
                        cin.question("Введите имя GDPS который желаете отслеживать: ", name => {
                            cin.question("Введите префикс GDPS который желаете отслеживать(пример: database): ", prefix => {
                                cin.question("Введите путь или url картинки GDPS который желаете отслеживать: ", img_path => {
                                    cin.question("Введите автора GDPS который желаете отслеживать: ", author => {
                                        $db.query(`INSERT INTO gdpsList(gdpsname, url, prefix, icon, author) VALUES ("${name}", "${url}", "${prefix}", "${img_path}", "${author}")`, (error, response) => {
                                            if (error) {
                                                console.log(error)
                                                return
                                            }
                                            createBotAcc(url, prefix, "thirde@sosi.hui")
                                            loginBotAcc(url, prefix)
                                            console.log('\x1b[32m', "Успешно ✓ Ответ:", response)
                                        })
                                    })
                                })
                            })
                        })
                    })
                    break
                case "B":
                    $db.query("SELECT * FROM GDPSList", (error, res) => {
                        if (error) {
                            throw new Error(error)
                        }
                        
                        res.forEach(r => {
                            let id = 1 
                            let j = 1
                            while (j < 2) {
                                $({
                                    url: `${r["url"]}/${r["prefix"]}/getGJUserInfo20.php`,
                                    method: 'POST',
                                    data: {
                                        targetAccountID: id,
                                        secret: "Wmfd2893gb7"
                                    },
                                    complete: response => {
                                        console.log(response)
                                        switch (response) {
                                            case "-1":
                                                break

                                            default:
                                                break
                                        }
                                    }
                                })
                                id++
                                j++
                            }
                            console.log(i)
                        })
                    })
                    
                    cin.close()
                    break
                default:
                    console.log("Такого выбора нет.") 
                    addServer()
                    cin.close()
                    break
            }
        })
    })
}
addServer()