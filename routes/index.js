'use strict'
const classModel = require('../modules/my_class')
const routes = (app) => {
    // 首页
    app.get('/', (req, res, next) => {
        let response = res
        classModel.find({}, (err, result, res) => {
            if(err) return console.log(err)
            response.render('index', { result })
        })
    })
    // 增加学生信息
    app.get('/create', (req, res, next) => {
        res.render('create', {})
    })
    app.post('/create', (req, res, next) => {
        let newStudent = [{
            name: req.body.name,
            studentId: req.body.student_id
        }]
        classModel.create(newStudent, (err) => {
            if(err) return console.log(err)
            res.send("<a href='/'>添加成功，点击返回首页</a>")
        })
    })
    // 删除学生信息
    app.get('/del', (req, res, next) => {
        let response = res
        classModel.find({}, (err, result, res) => {
            if(err) return console.log(err)
            response.render('del', { result })
        })
    })
    app.post('/del', (req, res, next) => {
        classModel.remove({_id: req.body.student}, (err, result) => {
            if(err) return console.log(err)
            console.log(result.result)
            res.send("<a href='/'>删除成功，点击返回首页</a>")
        })
    })
    // 修改学生信息
    app.get('/update', (req, res, next) => {
        let response = res
        classModel.find({}, (err, result, res) => {
            if(err) return console.log(err)
            response.render('update', { result })
        })
    })
    app.post('/update', (req, res, next) => {
        console.log(req.body)
        let num = req.body.num,
            condiction = {_id: req.body._id[num]},
            query = {$set: {name: req.body.name[num], studentId: req.body.student_id[num]}}
        classModel.update(condiction, query, (err, result) => {
            if(err) {
                console.log(err)
                res.send('<script>alert("请勾选待修改的学生")</script>')
            }
            res.send("<a href='/'>修改成功，点击返回首页</a>")
        })
    })
    // 查找学生
    app.get('/reach', (req, res, next) => {
        let result = null
        res.render('reach', { result })
    })
    app.post('/reach', (req, res, next) => {
        console.log(req.body)
        let response = res
        let reachType = req.body.reach_type,
            keyWord = req.body.keyword
        if (reachType == 0) {
            classModel.find({name: keyWord}, (err, result) => {
                if(err) return console.log(err)
                response.render('reach', { result })
            })
        } else {
            classModel.find({studentId: keyWord}, (err, result) => {
                if(err) return console.log(err)
                response.render('reach', { result })
            })
        }
    })
}
module.exports = routes
