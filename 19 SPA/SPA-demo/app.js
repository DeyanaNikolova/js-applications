import { sum, product } from './module.js';
import { sum as secondSum} from './second.js';
import Person, {sayHello}  from './Person.js';

console.log(sum(3, 5));
console.log(product(2, 2));
console.log(secondSum(2, 2, 3));



const myPerson = new Person('Peter', 23);
console.log(myPerson);
sayHello(myPerson)

// export { data as transformedData} from './module.js';

// imports all from fileconst 

// import * as api from './module.js';

// console.log(api.renamedSum(3, 5));
// console.log(api.product(2, 2));
