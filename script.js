const calc = document.querySelector('.calc');
const result = document.querySelector('#result');
var tmp = '';
var buffer = '';
var rvt = '';
let a = '';
let b = '';
let c = '';
let sign = '';
let finish  = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '(', ')'];
const action = ['-', '+', '*', '/',];

calc.addEventListener('click', function(event) {
    if(!event.target.classList.contains('calc_btn')) return;

    const value = event.target.innerText;
    const key = event.target.textContent;

    let beforeDot = n => {
        n = 1 + Math.log10(n*n) / 2;
        return Math.max(n - n % 1, 1);
    }

    const afterDot = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );

    switch(value){
        case 'MS':
            tmp = result.innerText;
            break;
        case 'MC':
            tmp = '';
            break;
        case 'MR':
            result.innerText = tmp;
            break;
        case 'M+':
            let num1 = Number(result.innerText)
            let num2 = Number(tmp)
            buffer = num1 + num2;
            tmp = buffer;
            break;
        case 'M-':
            let num3 = Number(result.innerText)
            let num4 = Number(tmp)
            buffer = num3 - num4;
            tmp = buffer;
            break;
        case 'C':
            b = '';
            result.textContent = '';
            break;
        case 'AC':
            result.innerText = '';
            a = '';
            b = '';
            sign = '';
            finish = false;
            break;
        case '<-':
            if (b ==='' && sign === ''){
                a = a.substring(0, a.length-1);
                result.innerText = a;
            } else if (a!=='' && b!=='' && finish){
                a = result.innerText.substring(0, result.innerText.length-1);
                result.innerText = a;
            } else {
                b = b.substring(0, b.length-1);
                result.innerText = b;
            }
            break;
        case '+/-':
            if (b ==='' && sign === ''){
                a = -a;
                result.innerText = a;
            } else if (a!=='' && b!=='' && finish){
                a = -result.innerText
                result.innerText = a;
            } else {
                b = -b;
                result.innerText = b;
            }
            break;
        case '=':
            if (b ==='') b = a;
            switch (sign) {
                case "+":
                    a = (+a) + (+b);
                    break;
                case "-":
                    a = a - b;
                    break;
                case "*":
                    a = a * b;
                    break;
                case "/":
                    a = a / b;
                    break;
            }
            finish = true;
            result.innerText = parseFloat(a.toFixed(8));
            rvt = result.innerText;
            break;
        case 'Rvt':
            result.innerText = rvt;
            break;
        default:
            if (digit.includes(key)) {
                if (b ==='' && sign === '') {
                    if (beforeDot(Number(a)) >= 12){
                        alert('Максимум 12 знаков до запятой');
                        a = a.substring(0, a.length);
                        result.innerText = a;
                        return;
                    }
                    if(afterDot(a) >= 8){
                        alert('Максимум 8 знаков после запятой');
                        a = a.substring(0, a.length);
                        result.innerText = a;
                        return;
                    }
                    if (key === '.' && a.includes('.')) {
                        a += '';
                        result.innerText = a;
                        return
                    }
                    if (a.startsWith('0' + '0')){
                        a = '';
                        result.innerText = a;
                        return;
                    } 
                    else {
                        a += key;
                        result.innerText = a;
                        return;
                    }
                }
                else if (a!=='' && b!=='' && finish) {
                    b = key;
                    finish = false;
                    result.innerText = b;
                }
                else {
                    if (beforeDot(Number(b)) > 12){
                        alert('Максимум 12 знаков до запятой');
                        String(b);
                        b = b.substring(0, b.length-1);
                        result.innerText = b;
                    }
                    if(afterDot(b) >= 8){
                        alert('Максимум 8 знаков после запятой');
                        String(b);
                        b = b.substring(0, b.length-1);
                        result.innerText = b;
                    }
                    if (key === '.' && b.includes('.')) {
                        b += '';
                        result.innerText = b;
                    } 
                    else {
                        b += key;
                        result.innerText = b;
                    }
                }
                return;
            }
            if (action.includes(key)) {
                sign = key;
                result.innerText = sign;
                return;
            }
    }
});
