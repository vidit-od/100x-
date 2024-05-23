// declaring interfaces 
interface person{

    // compulsory in the interface
    name:string;
    age:number;
    greet(phrase: string):void;

    // optional 
    email?:string;
}


// interfaces implementation
class Employee implements person{
    name: string;
    age: number;
    
    constructor(n:string, a:number){
        this.name = n;
        this.age= a;
    }

    greet(phrase: string): void {
        console.log(`${phrase} ${this.name}`)
    }
}

const vidit = new Employee('vidit',22);

console.log(vidit);