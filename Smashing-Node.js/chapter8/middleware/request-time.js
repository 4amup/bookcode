// 自己根据书上写的一个请求事件中间件
// 选项：
// -'time':(Number) 超时阙值：默认是100

module.exports = (opts) => {
  let time = opts.time || 100;

  return (req, res, next) => {
    // 超时函数
    function longtime() {
      console.log(`${req.method} ${req.url} is taking too long!`);
    }
    
    // 设置setTimeout
    let timer = setTimeout(longtime, time);
    
    // 重写res.end 
    let end = res.end;

    res.end = (chunk, encoding) => {
      res.end = end;
      res.end(chunk, encoding);
      clearTimeout(timer);
    };
    next();
  };
};