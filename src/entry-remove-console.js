class People {
  constructor (name) {
    this.name = name
  }
  sayName () {
    const msg = `Hello, I'm ${this.name}`
    alert(msg)
    console.log(msg)
  }
}

const lily = new People('Lily')
lily.sayName()
