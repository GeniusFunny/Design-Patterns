##创建型模式

创建型模式**抽象了实例化过程**；分为两大类：类创建型模式（使用继承来改变被实例化的类），对象创建模式（将实例化委托给另一个对象）。

### 抽象工厂（对象创建型模式）

#### 目的

提供一个创建一系列相关或相互依赖对象的接口，而无需制定他们具体的类。

#### 动机

创建一系列UI组件，不同的视感风格为诸如Button、Input、Dialog等组件定义了不同的外观和行为。一个应用不应该为一个特定的视感外观硬编码它的窗口组件。

所以我们可以定一个WidgetFatory类，这个类声明了一个用来创建每一类窗口组件的接口；每一类窗口组件有一个抽象类，具体的子类则实现了窗口组件的特定视感风格。对于每个抽象窗口组件类，WidgetFatory都有一个返回新窗口组件对象的操作。

**用户仅与抽象类定义的接口交互，而不是用特定的具体类的接口**

#### 适用场景

1. 一个系统要独立于它的产品的创建、组合和表示时
2. 一个系统要由多个产品系列中的一个来配置时
3. 当你要强调一系列相关的产品对象的设计以便进行联合使用时
4. 当你提供一个产品类库，而只想显示他们的接口而不是实现时

#### 结构

![](https://i.loli.net/2019/01/25/5c4b1d532c73d.png)

#### 效果

1. 一个工厂封装创建产品对象的责任和过程，它将用户与类的实现**分离**。（init并不知道A、B是怎么构造的）
2. 可以轻松升级工厂的产品（A、B），只需改变具体的工厂即可实现不同的产品配置。（更改ConcreteFactoryxxxx）
3. 有利于产品的一致性，当一个系列中的产品对象被设计为一起工作时，一个应用一次只能使用一个系列中的对象，AbstractFactory很容易实现这一点
4. 难以拓展工厂制造的产品，比如增加一个C。（AbstractFactory已经限定了制造的产品只有A、B两种）

#### 实现

```javascript
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

// 这里的factory其实是AbstractFactory类型（理论上），init这个函数仅仅知道AbstractFatory类，并不知道A、B具体实现的类是什么；
//	Both Super or Normal are OK！！！
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

```

### 生成器（对象创建型）

#### 目的

将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示

#### 动机

考虑一个Rich Text Format文档交换格式的阅读器应该能将RTF格式转换为多种正文格式。因为可转换为的格式应该是无限的，所以需要很容易的增减可转换的格式而不用改变RTF阅读器。

#### 适用场景

1. 当创建复杂对象的算法应该独立于该对象的组成部分以及它们的装配方式时
2. 当构造过程必须允许被构造的对象有不同的表示时

#### 结构

![](https://i.loli.net/2019/01/26/5c4bfa901d89a.png)

#### 效果

1. 可以改变一个产品的内部表示；Builder对象提供给导向器一个构造产品的抽象接口，该接口使得生成器可隐藏这个产品的表示和内部结构。产品是通过抽象接口构造的，在改变产品的内部表示时所要做的仅仅是定义一个新的生成器
2. 构造代码和表示代码分离；客户不需要知道定义产品内部结构的类的所有信息，这些类是不会出现在Builder的接口中；每个ConcreteBuilder包含了创建和装配一个特定产品的所有代码；不同的导向器可以复用它以在相同部件集合的基础上构造不同的产品。
3. 可对构造过程进行更加精细的控制（导向者的init函数一步一步build产品，在最后一步才将产品取回）；Builder接口相比其他创建型模式能更好地反映产品的构造过程。

#### 实现

```javascript
 // 抽象Builder只定义接口，而具体的实现由其子类实现
class Builder {
  constructor() {}
  BuildA() {}
  BuildB() {}
  BuildC() {}
  GetApp() {}
}

// 具体的builder实现，这里为Super Builder；当然也可以为Normal Builder
class SuperBuilder extends Builder {
  constructor() {
    super()
  }
  BuildA() {
    this.A = 'SuperA'
  }
  BuildB() {
    this.B = 'SuperB'
  }
  BuildC() {
    this.C = 'SuperC'
  }
  log() {
    console.log(`${this.A} ${this.B} ${this.C}`)
  }
  GetApp() {
    console.log('建造完成')
    return this
  }
}

// 导向器
function init(builder) {
  builder.BuildA()
  builder.BuildB()
  builder.BuildC()
  return builder.GetApp()
}
function initWithoutC(builder) {
  builder.BuildA()
  builder.BuildB()
  return builder.GetApp()
}

// 测试
let superBuildCase = new SuperBuilder()
let superBuildCaseWithoutC = new SuperBuilder()
let instance = init(superBuildCase)
let instanceWithoutC = initWithoutC(superBuildCaseWithoutC)
console.log(instance)
console.log(instanceWithoutC)

```

