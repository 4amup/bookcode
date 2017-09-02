// 校验中间件

// 解析entry[name]符号
function parseField (field) {
  return field.split(/\[|\]/).filter(s => {return s})
}

// 基于parseField的结果查找属性
function getField (req, field) {
  let val = req.body
  field.forEach(prop => {
    val = val[prop]
  })
  return val
}

// 导出
module.exports = {
  // 验证两个必填字段是否都写上了
  required: function (field) {
    field = parseField(field) // 解析输入域一次
    return function (req, res, next) {
      if (getField(req, field)) {
        next() // 如果有，直接进下一个中间件
      } else {
        res.error(field.join(' ') + ' is required')
        res.redirect('back')
      }
    }
  },
  lengthAbove: function (field, len) {
    field = parseField(field)
    return function (req, res, next) {
      if (getField(req, field).length > len) {
        next()
      } else {
        res.error(field.join(' ') + ' must have more than ' + len + ' characters')
        res.redirect('back')
      }
    }
  }
}