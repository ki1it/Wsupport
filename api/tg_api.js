var express = require('express')
const {Client} = require('tglib')
var pgapi = require('../api/pg_api')
async function call () {
  const client = new Client({
    apiId: '363213',
    apiHash: 'a10073265584d54055a4c3ad0e16af62',
    auth: {
      type: 'user',
      value: '+79069624310'
    }
  })
  await client.ready
  // await client.fetch({'@type': 'logOut'});
  client.registerCallback('td:update', async (update) => {
    if (update['@type'] === 'updateNewMessage') {
      console.log('Got update:', JSON.stringify(update, null, 2))
      if (update['message']['chat_id'] > 0) {
        pgapi.pool.query('INSERT INTO new_schema.messages(id, sender_user_id, data, text, to_id, chat_id, from_tp, timestamp) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [update['message']['id'],
          update['message']['sender_user_id'], new Date(update['message']['date'] * 1000), update['message']['content']['text']['text'],
          client.options.auth.value, update['message']['chat_id'], update['message']['is_outgoing'], update['message']['date']], (err, res) => {
          console.log(err, res)
        })
      } else {
        pgapi.pool.query('select exists(select * from new_schema.list_projects where chat_id = $1);', [update['message']['chat_id']], (err, res) => {
          if (res.rows[0].exists === false) {
            pgapi.pool.query('INSERT INTO new_schema.list_projects(name, chat_id) VALUES($1, $2) RETURNING *', ['undef', update['message']['chat_id']], (err, res) => {
              console.log(err, res)
            })
          }
          console.log(err, res)
        })
        pgapi.pool.query('INSERT INTO new_schema.messages_group(id, sender_user_id, data, text, to_id, chat_id, from_tp, timestamp) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [update['message']['id'],
          update['message']['sender_user_id'], new Date(update['message']['date'] * 1000), update['message']['content']['text']['text'],
          client.options.auth.value, update['message']['chat_id'], update['message']['is_outgoing'], update['message']['date']], (err, res) => {
          console.log(err, res)
        })
      }
    }
  })

  client.registerCallback('td:error', (update) => {
    console.error('Got error:', JSON.stringify(update, null, 2))
  })
  // pgapi.pool.end();
}
module.exports.call = call()
