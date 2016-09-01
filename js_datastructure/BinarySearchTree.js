// 公用方法
var printNode = function printNode(value) {
  console.log(value);
}
function BinarySearchTree() {
    // 定义新节点的构造函数
  var Node = function(key){
    this.key = key;
    this.left = null;
    this.right = null;
  };
  var root = null;
  // 插入方法
  this.insert = function(key){
    // 本方法用到的私有辅助函数
    var insertNode = function (node,newNode) {
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left,newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right,newNode);
        }
      }
    };
    // 该方法主内容
    var newNode = new Node(key);
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root,newNode); // 调用insertNode私有辅助函数
    }
  };
  // 中序遍历
  this.inOrderTraverse = function(callback){
    // 本方法用到的私有辅助函数，用于递归
    var inOrderTraverseNode = function(node,callback){
      if (node!==null) {
        inOrderTraverseNode(node.left,callback);
        callback(node.key);
        inOrderTraverseNode(node.right,callback);
      }
    };
    // 该方法主内容
    inOrderTraverseNode(root,callback);
  };
}

var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

tree.inOrderTraverse(printNode);