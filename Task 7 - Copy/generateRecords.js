const fs = require('fs');

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomData(id) {
  const firstNames = ["Raj", "Aman", "Vikram", "Kunal", "Neha", "Priya", "Anjali", "Ravi"];
  const lastNames = ["Solanki", "Mehta", "Patel", "Singh", "Sharma", "Verma", "Reddy", "Das"];
  
  return {
    id: id,
    firstName: getRandomElement(firstNames),
    lastName: getRandomElement(lastNames),
    Age: Math.floor(Math.random() * 30) + 20,
    Salary: Math.floor(Math.random() * 900000) + 100000
  };
}

const data = [];

for (let i = 1; i <= 50000; i++) {
  data.push(generateRandomData(i));
}

fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');
console.log("Saved 50,000 records to data.json");
