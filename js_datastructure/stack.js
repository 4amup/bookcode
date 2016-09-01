// 定义栈
function Stack() {
  // 栈容器
  var items = [];

  this.push = function(element){
    items.push(element);
  };
  this.pop = function () {
    return items.pop();
  };
  this.peek = function () {
    return items[items.length-1];
  };
  this.isEmpty = function () {
    return items.length == 0;
  };
  this.size = function () {
    return items.length;
  };
  this.clear = function () {
    items = [];
  };
  this.print = function () {
    console.log(items.toString());
  };
}
// 新建一个栈
var stack = new Stack();
// 测试栈是否为空
console.log(stack.isEmpty());

stack.push(5);
stack.push(8);
stack.print();