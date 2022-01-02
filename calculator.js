function calculate(num) {
  stringValidation(num)
  romesOrArabicNumber(num)
  const initCalc = init(num)
  return initCalc
}

// Функция, которая запускает римский или арабский калькулятор, в зависимости от значения строки.
function init(string) {
  let arabic = string.split(/[IVX]/g)
  let number = arabic.map(parseFloat)
  if (!isNaN(number)) {
    const rOa = romesOrArabicNumber(string)
    return rOa
  } else {
    
    const r2a = romain2arabic(string)
    return r2a
  }
  
 
}

// 1 - шаг. Валидируем принимаемые в строке значения.
function stringValidation(string) {
  let simvol = /[^IVX0-9+*\/-\s]/g
  let operators = /[+*\/-]{2,}/g

  if ([...string.matchAll(simvol)].length >= 1) {
    throw new Error("В строке есть некорректные симвылы")
  } else if ([...string.matchAll(operators)].length >= 1) {
    throw new Error("Строка указана некорректно, в строке более одного операнда для вычисления")
  }

  
}

// 2 - шаг. Определяем какие символы ввели римские или арабские.
function romesOrArabicNumber(string) {
  const romesValid = /^[IVX]+$/
  let arrNumbers = string.match(/[IVX0-9]/g)
  const countRoman = arrNumbers.reduce(function(accumulator, currValue, index, array) {
    return accumulator + romesValid.test(currValue)}, 0)
    
    if (countRoman===1) {
      throw new Error("Оба числа должны быть римскими или арабскими")
    } else if (countRoman===2) {
      
    }
    // Вычисления арабских цифр.
    let number = arrNumbers.map(parseFloat)
    let operator = string.match(/[+*\/-]/g)[0]
    let result =''
    if (operator === '+') {
      result = number[0] + number[1]
    } else if (operator === '-') {
      result = number[0] - number[1]
    } else if (operator === '*') {
      result = number[0] * number[1]
    } else if (operator === '/') {
      result = number[0] / number[1]
    } 
    
  return result
    
    
}

// 3 - шаг. Преобразование чисел римские в арабские и приведение строки к числу, вычисление и конвертация обратно в римские.
function romain2arabic(string) {
  
  /**
   * Строку string проверяю для исключения из массива ([+*\/-]);
   * Строку string проверяю чтобы получить знак математического оператора ([+*\/-]);
   */
  let arrSimvol = string.split(/[+*\/-]/g)
  let operator = string.match(/[+*\/-]/g)[0]
  
  // Сравниваю значения из строки string с массивом римских цифр, онвертирую в арабские.
  let arrNum = []
  for (let i = 0; i < arrSimvol.length; i++) {
    let res = 0
    arrSimvol[i].replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(i) {
      res += {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, III:3, II:2, I:1}[i]
    })
  
    arrNum.push(res)
    
  }

  // Вычисления арабских цифр.
  let result =''
  if (operator === '+') {
    result = arrNum[0] + arrNum[1]
  } else if (operator === '-') {
    result = arrNum[0] - arrNum[1]
  } else if (operator === '*') {
    result = arrNum[0] * arrNum[1]
  } else if (operator === '/') {
    result = arrNum[0] / arrNum[1]
  }

  // Конвертирую значение вычислений в римское число.
  let lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}
  let roman = ''
  let i
  for ( i in lookup ) {
    while ( result >= lookup[i] ) {
      roman = roman + i
      result = result - lookup[i]
    }
  }
  return roman;
  
  
}

console.log(calculate('1 + 2')) // вернется строка '3')
console.log(calculate('VI / III')) // вернется строка 'II'
console.log(calculate('VII / III')) // вернётся строка II'
console.log(calculate('I + II')) // вернется строка 'III'
console.log(calculate('I - II')) // вернётся строка '' (пустая строка) т.к. в римской системе нет отрицательных чисел
console.log(calculate('I + 1')) // вернётся исключение (ошибка) throws Error т.к. используются одновременно разные системы счисления
console.log(calculate('I')) // вернётся исключение throws Error т.к. строка не является математической операцией
console.log(calculate('1 + 1 + 1')) // вернётся исключение throws Error т.к. формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)