const qs = require('querystring')

// 辅助函数
function sendHtml (res, html) {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Content-Length', Buffer.byteLength)
  res.end(html)
}

function showArchived (db, res) {
  show(db, res, true)
}

function parseRecivedData (req, cb) {
  let body = ''
  req.setEncoding('utf8')
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', () => {
    cb(qs.parse(body))
  })
}

function actionForm (id, path, label) {
  let html = `
  <form method="POST" action="${path}">
    <input type="hidden" name="id" value="${id}">
    <input type="submit" value="${label}">
  </form>
  `
  return html
}

function workHitlistHtml (rows) {
  let html = `<table>`
  rows.forEach((value, index) => {
    // to-do
    html +=`<tr>`
    html += `
    <td>${value.date}</td>
    <td>${value.hours}</td>
    <td>${value.description}</td>
    `
    if (value.archived) {
      tds += `<td>${workArchiveForm(value.id)}</td>`
    }
    tds += `<td>${workDeleteForm(value.id)}</td>`
    tds += `</tr>`
  })
  html += `</table>`
  return html
}

// 渲染html表单
function workFormHtml () {
  let html =
  `<form method="POST" action="/">
    <p>
      <label for="date">Date (YYYY-MM-DD):</label>
      <input name="date" type="text">
    </p>
    <p>
      <label for="description">Description:</label>
      <textarea name="description"></textarea>
    </p>
    <p>
      <input type="submit" value="Add">
    </p>
  </form>`
  return html
}

// 渲染归档按钮表单
function workArchiveForm (id) {
  return actionForm(id, '/archive', 'Archive')
}

// 渲染删除按钮表单
function workDeleteForm (id) {
  return actionForm(id, '/delete', 'Delete')
}

// 增-增加一条工作记录
function add (db, req, res) {
  parseRecivedData(req, work => {
    db.query(
      `INSERT INTO work(hours, data, description)
      VALUES
      (?, ?, ?)`, // ???占位符，防止SQL注入攻击
      [work.hours, word.date, work.description], // 数据解析
      err => {
        if (err) throw err
        show(db, res)
      }
    )
  })
}

// 删-删除数据
function deleteItem (db, req, res) {
  parseRecivedData(req, work => {
    db.query(
      `DELETE FROM work WHERE id=?`,
      [work.id],
      err => {
        if (err) throw err
        show(db, res)
      }
    )
  })
}

// 改-更新一条工作记录
function archive (db, req, res) {
  parseRecivedData(req, work => {
    db.query(
      `UPDATE work SET archived=1 WHERE id=?`,
      [work.id],
      err => {
        if (err) throw err
        show(db, res)
      }
    )
  })
}

// 查-显示函数
function show (db, res, showArchived) {
  let query = `
  SELECT * FROM work
  WHERE archived=?
  ORDER BY date DESC`
  let archiveValue = (showArchived) ? 1 : 0
  db.query(query, [archiveValue], (err, rows) => {
    if (err) throw err
    html = (showArchived)
    ? ''
    : `<a href="/archived">Archived Work</a>`
    html += workHitlistHtml(rows)
    html += workFormHtml()
    sendHtml(res, html)
  })
}

module.exports = {
  // 以下是增删查改了
  add: add,
}