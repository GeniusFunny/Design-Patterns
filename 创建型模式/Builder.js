class Builder {
  // Builder只定义接口，而具体的实现由其子类实现
  constructor() {}
  BuildA() {}
  BuildB() {}
  BuildC() {}
  GetApp() {}
}

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

let superBuildCase = new SuperBuilder()
let superBuildCaseWithoutC = new SuperBuilder()
let instance = init(superBuildCase)
let instanceWithoutC = initWithoutC(superBuildCaseWithoutC)
console.log(instance)
console.log(instanceWithoutC)
