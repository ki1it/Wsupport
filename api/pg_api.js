var express = require('express')
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://kit:1@192.168.11.91:5432/wsup1'

const pool = new Pool({
  connectionString: connectionString
})

module.exports.pool = pool
