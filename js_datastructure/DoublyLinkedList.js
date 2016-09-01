function DoublyLinkedList() {
  var Node = function(element){
    this.element = element;
    this.next = null;
    this.prev = null;
  }

  var length = 0;
  var head = null;
  var tail = null; //小尾巴

  // 以下是各种方法
  this.insert = function(position,element){
    if (position>=0 && position<=length) {

      var node = new Node(element);
      var current = head;
      var previous;
      var index = 0;

      if (position == 0) { // 列表开头添加一个节点
        if (!head) {
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node;
          head = node;
        }
      } else if (position == length) { // 列表结尾添加一个节点
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      }else{
        while(index++ < position){
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;

        current.prev = node;
        node.prev = previous;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  this.removeAt = function(position){
    // 检查越界情况
    if (position > -1 && position < length) {
      var current = head;
      var previous;
      var index = 0;

      // 移除第一项
      if (position == 0) {
        head = current.next;
        // 如果只有一项，更新tail
        if (length == 1) {
          tail = null;
        } else {
          current.next.prev = null;
        }
      }else if(position == length-1){ // 最后一项
        current = tail;
        tail = current.prev;
        tail.next = null;
      }else{
        while(index++<position){
          previous = current;
          current = current.next;
        }
        // 将previous与current的下一项链接起来
        previous.next = current.next;
        current.next.prev = previous;
      }
      length--;
      return current.element;
    }else{
      return null;
    }
  };
}