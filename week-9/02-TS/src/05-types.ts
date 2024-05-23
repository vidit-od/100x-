// syntax difference in interface and type , = before {}
type User = {
    firstname: string,
    lastname: string,
    age: number,
} 

// union 
    // the id can be number or a string 
    type id = number | string

// intersection

type employee ={
    name: string;
    startDate: Date;
};

type manager = {
    name: string;
    department : string;
}

type teamleader = employee & manager;

const leader:teamleader={
    name:'vidit',
    startDate: new Date(),
    department: 'SDE'
}
console.log(leader);