const select = document.getElementById('calculatedValue');
window.onload = display();

function display() {
    const selected = document.querySelector('input[name="indata"]:checked');
    const id = selected.id;
    let block = document.getElementsByClassName('input_data')[0];
    let masSides = {
        'Нижнее основание a: ': 'a',
        'Верхнее основание b: ': 'b',
        'Боковая сторона c: ': 'c',
        'Угол между боковой стороной и основанием α: ' : 'angle'
    };
    if (id === 'indata_sides' && !block.querySelector('#c')) {
        document.getElementsByTagName('img')[0].setAttribute('src', 'trap1.png');
        if (block.querySelector('#angle')) {
            let label = block.children[4];
            let text = Object.keys(masSides);
            let input = label.querySelector('input');
            label.textContent = text[2];
            input.id = masSides[text[2]];
            label.appendChild(input);
        } else {
            for (let key in masSides) {
                if (key !== 'Угол между боковой стороной и основанием α: ') {
                    let newElem = document.createElement('label');
                    newElem.innerHTML = key;
                    let newElemInput = document.createElement('input');
                    newElemInput.setAttribute('type', 'number');
                    newElemInput.setAttribute('id', masSides[key]);
                    newElem.appendChild(newElemInput);
                    block.appendChild(newElem);
                    let br = document.createElement('br');
                    block.appendChild(br);
                }
            }
        }
    } else if (id === 'indata_angle' && !block.querySelector('#angle')){
        document.getElementsByTagName('img')[0].setAttribute('src', 'trap2.png');
        if (block.querySelector('#c')) {
            let label = block.children[4];
            let text = Object.keys(masSides);
            let input = label.querySelector('input');
            label.textContent = text[3];
            input.id = masSides[text[3]];
            label.appendChild(input);
        } else {
            for (let key in masSides) {
                if (key !== 'Боковая сторона: ') {
                    let newElem = document.createElement('label');
                    newElem.innerHTML = key;
                    let newElemInput = document.createElement('input');
                    newElemInput.setAttribute('type', 'number');
                    newElemInput.setAttribute('id', masSides[key]);
                    newElem.appendChild(newElemInput);
                    block.appendChild(newElem);
                    let br = document.createElement('br');
                    block.appendChild(br);
                }
            }
        }
    }
}

function calculate(data) {
    let a = +data.a.value;
    let b = +data.b.value;
    if (Number(a) <= 0 || isNaN(a) || a === b) { 
        data.a.classList.add("error"); 
    } 

    if (Number(b) <= 0 || isNaN(b) || a === b) { 
        data.b.classList.add("error");
    }

    let c;
    let angle;
    if (data.c) {
        c = +data.c.value;
        if (Number(c) <= 0 || isNaN(c)) { 
            data.c.classList.add("error");
        }
    }
    if (data.angle) {
        angle = () =>{
            return +data.angle.value * (Math.PI / 180);
        };
        if (Number(angle()) <= 0 || isNaN(angle()) || angle() * (180 / Math.PI) >=90 || angle() * (180 / Math.PI) <= 0) { 
            data.angle.classList.add("error");
        }
    }

    let text = document.getElementsByTagName('b')[0];
    if (select.selectedOptions.length === 0) {
        text.classList.add('errorText');
    }

    if (data.a.classList.contains("error") ||
        data.b.classList.contains("error") ||
        text.classList.contains("errorText"))  {
            return false;
    }   

    if (data.c && data.c.classList.contains("error")) {
            return false;    
    } else if (data.angle && data.angle.classList.contains("error")) {
         return false;
    }

    let diffSides = Math.abs(a - b);
    let h = () => {
        if (data.c) {
            return Math.sqrt(c ** 2 - diffSides ** 2);
        } else {
            return diffSides * Math.tan(angle());
        }
    };
    let output = document.getElementById('output'); 
    output.innerHTML = "<p class='result'>Результат:</p>"; 
    if (document.getElementById('d').selected) {
        let d1 = Math.round(Math.sqrt(h() ** 2 + a ** 2) * 100) / 100;
        let d2 = Math.round(Math.sqrt(h() ** 2 + b ** 2) * 100) / 100;
        output.innerHTML += `<p>d1 = ${ d1 }</p><p>d2 = ${ d2 }</p>`;
    }
    if (document.getElementById('p').selected) {
        if (data.angle) {
            c = (a - b) / Math.cos(angle());
        }
        let p = Math.round((a + b + c + h()) * 100) / 100;
        output.innerHTML += `<p>P = ${ p }</p>`;
    }
    if (document.getElementById('s').selected) {
        let s = Math.round((a + b) * h() / 2 * 100) / 100;
        output.innerHTML += `<p>S = ${ s }</p>`;
    }
}

function clearErrorClass(object) {
    object.classList.remove('error');
}

let inputA = document.getElementById('a');
let inputB = document.getElementById('b');
inputA.addEventListener('focus', () => clearErrorClass(inputA));
inputB.addEventListener('focus', () => clearErrorClass(inputB));

if (document.getElementById('c')) {
    let inputC = document.getElementById('c');
    inputC.addEventListener('focus', () => clearErrorClass(inputC));
}

if (document.getElementById('angle')) {
    let inputAngle = document.getElementById('angle');
    inputAngle.addEventListener('focus', () => clearErrorClass(inputAngle));
}

select.onfocus = function() { 
    document.getElementsByTagName('b')[0].classList.remove('errorText'); 
};

function clearData() {
    document.getElementById('a').value = '';
    document.getElementById('b').value = '';
    if (document.getElementById('c')) {
        document.getElementById('c').value = '';
    } else {
        document.getElementById('angle').value = '';
    }
    document.getElementById('output').innerHTML = '';
    for (let i = 0; i < select.options.length; i++) {
        select.options[i].selected = false;
    }
}