"use strict"

function solveEquation(a, b, c) {
  let arr = new Array();
  let d = Math.pow(b,2) - 4*a*c;

  if (d === 0) {
    arr[0] = -b/(2*a);
  } else if (d > 0 ) { 
    arr[0] = (-b + Math.sqrt(d)) / (2*a);
    arr[1] = (-b - Math.sqrt(d)) / (2*a);
  }

  return arr; 
}

function calculateTotalMortgage(percent, contribution, amount, date) {

  let totalAmount = 0;
  let numberError = new Array;
  let lastDate = new Date(date);
  let dateToday = new Date();

  if (isNaN(percent)){
    numberError.push(`Параметр "Процентная ставка" содержит неправильное значение - ${percent}`);
  }
  if (isNaN(contribution)){
    numberError.push(` Параметр "Начальный взнос" содержит неправильное значение - ${contribution}`);
  }
  if (isNaN(amount)){
    numberError.push(` Параметр "Общая стоимость" содержит неправильное значение - ${amount}`);
  }
  if (numberError.length !== 0) {
    return numberError;
  }

// Платеж = S * (P + (P / (((1 + P)^n) - 1)))
// где: S - тело кредита, P - 1/12 процентной ставки (от 0 до 1), n - количество месяцев ^ - возведение в степень

  let p = percent/100/12;
  let s = (amount - contribution);
  let n = (lastDate.getFullYear() - dateToday.getFullYear())*12 - (dateToday.getMonth() - lastDate.getMonth());
  let payment = s * (p + (p / (Math.pow((1+p), n) - 1)));
  totalAmount = Math.round((payment * n) * Math.pow(10, 2)) / Math.pow(10, 2);;
  
  return totalAmount;
}
