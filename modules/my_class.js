'use strict'
const mongoose = require('mongoose')
// 连接mongodb
mongoose.connect('mongodb://localhost/test')
// 实例化连接对象
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})
// 创建schema
const classSchema = new mongoose.Schema({
    name: String,
    studentId: Number
})
// 创建model
const classModel = mongoose.model('newClass', classSchema) // newClass为创建或选中的集合

module.exports = classModel