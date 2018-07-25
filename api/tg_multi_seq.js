const {Client} = require('tglib')
var pgapi = require('../api/pg_api')
var db = require('../db_seq/db_init')
async function initClients() {
    const clients = {}
    const credentials = {
        agent_tp1: {type: 'user', value: '+79069624310'},
        //agent_tp2: {type: 'user', value: '+79628079299'}
    }
    for (const key in credentials) {
        try {
            const client = new Client({
                apiId: '363213',
                apiHash: 'a10073265584d54055a4c3ad0e16af62',
                auth: credentials[key]
            })
            await client.ready
            clients[key] = client
        } catch (e) {
            console.log(`Cannot create ${key}: `, e.message)
        }
    }

    return clients
}

async function call() {
    const clients = await initClients()
    console.log('telegram loaded')
    for (const cl in clients) {
        //if (!object.hasOwnProperty(key)) continue;
        clients[cl].registerCallback('td:update', async (update) => {
            if (update['@type'] === 'updateNewMessage') {
                let repl_time = undefined

                console.log('Got update:', JSON.stringify(update, null, 2))
                if (update['message']['reply_to_message_id'] != 0 && update['message']['is_outgoing']) {
                    await db.messages_group.findById(update['message']['reply_to_message_id']).then(function (res) {
                        repl_time = update['message']['date'] - res.timestamp
                        console.log(repl_time)
                    })
                        .catch(e =>
                            console.error(e.stack))
                    // await pgapi.pool.query('select new_schema.messages_group.timestamp from new_schema.messages_group where id = $1', [update['message']['reply_to_message_id']])
                    //     .then(res =>
                    //         repl_time = update['message']['date'] - res.rows[0].timestamp)
                    //     .catch(e =>
                    //         console.error(e.stack))
                    //console.log(err, res)
                    // pgapi.pool.query('INSERT INTO new_schema.messages_group(react_time) VALUES($1)', [update['message']['date']-res.rows[0].timestamp], (err, res) => {
                    //     console.log(err, res)
                    // })


                }
                if (update['message']['chat_id'] > 0) {
                    await pgapi.pool.query('INSERT INTO new_schema.messages(id, sender_user_id, data, text, to_id, chat_id, from_tp, timestamp, react_time) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [update['message']['id'],
                        update['message']['sender_user_id'], new Date(update['message']['date'] * 1000), update['message']['content']['text']['text'],
                        clients[cl].options.auth.value, update['message']['chat_id'], update['message']['is_outgoing'], update['message']['date'], repl_time], (err, res) => {
                        console.log(err, res)
                    })
                } else {
                    await pgapi.pool.query('select exists(select * from new_schema.list_projects where chat_id = $1);', [update['message']['chat_id']], (err, res) => {
                        if (res.rows[0].exists === false) {
                            pgapi.pool.query('INSERT INTO new_schema.list_projects(name, chat_id) VALUES($1, $2) RETURNING *', ['undef', update['message']['chat_id']], (err, res) => {
                                console.log(err, res)
                            })
                        }
                        console.log(err, res)
                    })
                    if( update['message']['is_outgoing'] === false) {
                        await pgapi.pool.query('delete from new_schema.messages_group where id = $1 and from_tp = false', [update['message']['id']], (err, res) => {
                            console.log(err, res)
                        })
                    }
                    await pgapi.pool.query('INSERT INTO new_schema.messages_group(id, sender_user_id, data, text, to_id, chat_id, from_tp, timestamp, react_time) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [update['message']['id'],
                        update['message']['sender_user_id'], new Date(update['message']['date'] * 1000), update['message']['content']['text']['text'],
                        clients[cl].options.auth.value, update['message']['chat_id'], update['message']['is_outgoing'], update['message']['date'], repl_time], (err, res) => {
                        console.log(err, res)
                    })
                }
            }
        })

        clients[cl].registerCallback('td:error', (update) => {
            console.error('Got error:', JSON.stringify(update, null, 2))
        })
    }
    // pgapi.pool.end();
    // }
}

module.exports.call = call
