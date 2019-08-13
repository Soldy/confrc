const confrc = new (require('./index.js')).confrc();

console.log(confrc.get('test1'));
console.log(confrc.get('test2'));
console.log(confrc.get('test3'));
console.log(confrc.get('test4'));

