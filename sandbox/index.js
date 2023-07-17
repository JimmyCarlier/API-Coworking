const arr1 = [5, 4, 7];

const arr2 = [3, 5, 8];

const newArr = [...arr1, ...arr2];

const secondArr = [1, ...arr2, "hello", "world"];

console.log(secondArr);

console.log(newArr);

//////////////////////////////////////////

const amir = {
  name: "amir",
  age: 36,
};

const amirWithEmail = {
  ...amir,
  age: 15,
};

console.log(amirWithEmail);

//////////////////////////////////////////

const array1 = ["bonjour", "tout", "le monde"];
const array2 = ["salut", "à tous"];
const array3 = ["je m'appelle", "mon nom est"];
const array4 = ["jimmy", "carlier"];
const array5 = ["antoine", "dupont"];

const result1 = [...array1, array3[0], ...array5];

const result2 = [...array2, array3[1], ...array4];

console.log(result1.join(" "), result2.join(" "));
console.log(result1.toString());

/////////////////////////////////////////////

function sum(...params) {
  let total = 0;
  return params.reduce((a, b) => a + b, total);
}

console.log(sum(1, 5, 8, 9, 7));
