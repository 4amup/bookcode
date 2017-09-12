class Animal {
  constructor(name) {
    this.nickName = name
  }
}

class Cat extends Animal {
  constructor(name) {
    // 这里的super关键字其实时为了调用其继承父类的构造函数
    // 由此将子类的this初始化，然后才能在后面的代码中调用this.props 或者 this.state
    super(name)
    console.log(this.nickName)
  }
}

const myCat = new Cat('Tom')