// 先定义一个常量空数组
const a = []
// 输出空数组的内容
console.log(a)
// 返回结果[]

//开始向常量a中添加元素
a.push(2)
// 输出添加了元素后的a
console.log(a)
// 返回结果[ 2 ]

// 如果想让a指向一个新数组就会报错
a = []
// 返回"TypeError:Assignment to constant variable"