const calc = document.querySelector('.calc');
const result = document.querySelector('#result');
var tmp = '';
var buffer = '';
var rvt = '';

calc.addEventListener('click', function(event) {
    if(!event.target.classList.contains('calc_btn')) return;

    const value = event.target.innerText;

    let count = n => {
        n = 1 + Math.log10(n*n) / 2;
        return Math.max(n - n % 1, 1);
    }

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
            esult.innerText = '';
            reak;
        case 'AC':
            result.innerText = '';
            break;
        case '<-':
            result.innerText = result.value.substring(0, result.value.length-1);
            break;
        case '+/-':
            result.innerText = result.value * -1
            break;
        case '=':
            if(result.innerText.search(/[^0-9*/+-.()]/mi) != -1) return;
            result.innerText = eval(result.innerText).toFixed(8);
            rvt = result.innerText;
            break;
        case 'Rvt':
            result.innerText = rvt;
            break;
        default:
            result.innerText += value;
        if (count(Number(result.innerText)) > 12){
            alert('Максимум 12 знаков')
            result.innerText = '';
            return;
        }
    }
});
