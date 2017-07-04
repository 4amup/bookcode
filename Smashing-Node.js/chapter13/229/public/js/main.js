$(function () {
  $('form').submit(function (ev) {
    // 取消默认事件，然后使用ajax方式提交表单
    ev.preventDefault()
    let form = $(this)
    $.ajax({
      url: form.attr('action'),
      type: 'POST',
      data: form.serialize(), // 表单序列化为查询字符串
      success: function(obj) { // 请求成功时运行的函数
        let el = $('li')
        if($('#projects-list').length) {
          el
          .append($('a').attr('href', `/project/${obj.id}/tasks`).text(`${obj.title}`))
          .append($('a').attr('href', `/project/${obj.id}`).attr('class', 'delete').text('x'))
        } else {
          el
          .append($('span').text(`${obj.title}`))
          .append($('a').attr('href', `/task/${obj.id}`).attr('class', 'delete').text('x'))
        }
        $('ul').append(el)
      }
    })
    form.find('input').val('') // 清除input中的值
  })
})