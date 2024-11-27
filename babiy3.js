const readline = require('readline');

// Створення інтерфейсу для вводу
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

// Функція для отримання матриці від користувача
function getMatrix(rows, cols, callback) {
const matrix = [];
let rowIndex = 0;

// Запит для кожного елементу
function askForRow() {
if (rowIndex < rows) {
rl.question(`Введіть ${cols} елементів для рядка ${rowIndex + 1} (через пробіл): `, (input) => {
const row = input.split(' ').map(Number); // Перетворюємо на числа
if (row.length !== cols) {
console.log(`Будь ласка, введіть рівно ${cols} числа для цього рядка.`);
askForRow(); // Повтор запиту, якщо кількість елементів не відповідає
} else {
matrix.push(row);
rowIndex++;
askForRow();
}
});
} else {
callback(matrix); // Коли всі рядки введено, видати результат
}
}

askForRow();
}

// Множення матриць
function multiplyMatrices(matrix1, matrix2) {
const rows1 = matrix1.length;
const cols1 = matrix1[0].length;
const rows2 = matrix2.length;
const cols2 = matrix2[0].length;

// Перевірка на можливість множення матриць
if (cols1 !== rows2) {
console.log("Матриці не можна помножити. Кількість стовпців першої матриці повинна дорівнювати кількості рядків другої.");
return;
}

// Створення матриці-результату
const result = Array.from({ length: rows1 }, () => Array(cols2).fill(0));

for (let i = 0; i < rows1; i++) {
for (let j = 0; j < cols2; j++) {
let sum = 0;
for (let k = 0; k < cols1; k++) {
sum += matrix1[i][k] * matrix2[k][j];
}
result[i][j] = sum;
}
}

return result;
}

// Запит для створення першої матриці
rl.question("Введіть кількість рядків для першої матриці: ", (rows1) => {
rows1 = parseInt(rows1);

rl.question("Введіть кількість стовпців для першої матриці: ", (cols1) => {
cols1 = parseInt(cols1);

// Запит для створення другої матриці
rl.question("Введіть кількість рядків для другої матриці: ", (rows2) => {
rows2 = parseInt(rows2);

rl.question("Введіть кількість стовпців для другої матриці: ", (cols2) => {
cols2 = parseInt(cols2);

// Перевірка на можливість множення матриць
if (cols1 !== rows2) {
console.log("Матриці не можна помножити. Кількість стовпців першої матриці повинна дорівнювати кількості рядків другої.");
rl.close();
return;
}

// Візуалізація 1-ї матриці
getMatrix(rows1, cols1, (matrix1) => {
console.log('Перша матриця:');
console.table(matrix1);

//  Візуалізація 2-ї матриці
getMatrix(rows2, cols2, (matrix2) => {
console.log('Друга матриця:');
console.table(matrix2);

// Множення матриць
const result = multiplyMatrices(matrix1, matrix2);
console.log('Результат множення матриць:');
console.table(result);

rl.close(); // Закрити інтерфейс
});
});
});
});
});
});
