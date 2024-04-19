
class Animal {
  constructor(name, legCount) {
    this.name = name
    this.legCount = legCount
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`
  }
}

let Dog = new Animal
Dog.name= "doggo"
Dog.legCount = 4

let cat = new Animal
cat.name = "meow"
cat.legCount = 4

console.log(Dog.describe())
console.log(cat.describe())


class Building{
  constructor(name,address,date){
    this.name = name
    this.address = address
    this.date = date
  }

  building_details(){
    return `Name of building : ${this.name} \nAddress of building: ${this.address} \nDate of constuction ${this.date}`
  }
}

let my_home = new Building

my_home.name = 'vidit'
my_home.address = 'gandhinagar'
my_home.date = '2007'

console.log(my_home.building_details())