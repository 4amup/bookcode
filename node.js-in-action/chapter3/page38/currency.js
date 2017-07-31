const canadianDollar = 0.91

function roundTwoDecimals (amount) {
  return Math.round(amount * 100) / 100
}

// 推荐任何时候都直接使用module.exports形式导出模块
module.exports = {
  canadianToUS: function (canadian) {
    return roundTwoDecimals(canadian)
  },
  UStoCanadian: function (us) {
    return roundTwoDecimals(us / canadianDollar)
  }
}