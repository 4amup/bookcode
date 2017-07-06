$(function () {
  console.log('main.js loaded!');
  $('form').submit(function (ev) {
    // 取消默认事件，然后使用ajax方式提交表单
    ev.preventDefault()
    let form = $(this)
    $.ajax({
      url: form.attr('action'),
      type: 'POST',
      data: form.serialize(), // 表单序列化为查询字符串
      success: function(obj) { // 请求成功时运行的函数
        let el = $('<li></li>')
        if($('#projects-list').length) {
          el
          .append($('<a></a>').attr('href', `/project/${obj.id}/tasks`).text(`${obj.title}`))
          .append($('<a></a>').attr('href', `/project/${obj.id}`).attr('class', 'delete').text('x'))
        } else {
          el
          .append($('<span></span>').text(`${obj.title}`))
          .append($('<a></a>').attr('href', `/task/${obj.id}`).attr('class', 'delete').text('x'))
        }
        $('ul').append(el)
      }
    })
    form.find('input').val('') // 清除input中的值
  })

  // 事件委托捕获所有delete类的连接，并发送delete请求
  $('ul').on('click' ,'a.delete', (ev) => {
    ev.preventDefault()
    // 对于委托事件，this关键字指向的是当前正在执行事件的元素
    let li = $(ev.target).closest('li')
    $.ajax({
      url: $(ev.target).attr('href'),
      type: 'DELETE',
      success: function (data) {
        console.log(data)
        li.remove()
      }
    })
    .done(() => {
      console.log('success.')
    })
    .fail(console.log('fail'))
  })
})