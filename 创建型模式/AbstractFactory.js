class AbstractFactory {
  constructor() {}
  createProductA() {
    return new A()
  }
  createProductB() {
    return new B()
  }
}
class A {
  constructor() {
    this.kind = 'A'
  }
}

class B {
  constructor() {
    this.kind = 'B'
  }
}

class SuperA extends A {
  constructor() {
    super()
    this.kind += 'Super'
  }
}
class SuperB extends B {
  constructor() {
    super()
    this.kind += 'Super'
  }
}

class ConcreteFactorySuper extends AbstractFactory {
  createProductA() {
    return new SuperA()
  }
  createProductB() {
    return new SuperB()
  }
}
class NormalA extends A {
  constructor() {
    super()
    this.kind += 'Normal'
  }
}
class NormalB extends B {
  constructor() {
    super()
    this.kind += 'Normal'
  }
}
class ConcreteFactoryNormal extends AbstractFactory {
  createProductA() {
    return new NormalA()
  }
  createProductB() {
    return new NormalB()
  }
}

function init(factory) {
  let A = factory.createProductA()
  let B = factory.createProductB()
  console.log(A)
  console.log(B)
}

let baseTest = new ConcreteFactoryNormal()
let superTest = new ConcreteFactorySuper()
let normalTest = new ConcreteFactoryNormal()

init(baseTest)
init(superTest)
init(normalTest)
