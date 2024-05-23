// declare generics with <t>
// say that the arg(i.e input) is of type t
// return type of the unction is t
// returns arg

function firstel<t>(arg: t[]):t{
    return arg[1];
}
const val = firstel(['hello','world','i am','vidit']);
console.log(val.toUpperCase());