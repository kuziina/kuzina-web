let key1 = [[0, 1, 0, 1, 1, 0, 0, 1],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0]];

let key2 = [[0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0],
            [1, 1, 1, 0, 0, 1, 0, 0]];

let key3 = [[1, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0, 1, 1],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 1],
            [0, 0, 0, 1, 0, 0, 1, 0]];

let key4 = [[0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 1, 0]];

let key5 = [[0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 1],
            [0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0],
            [1, 0, 1, 0, 0, 0, 1, 0]];

let key6 = [[0, 0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 1],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [1, 1, 0, 1, 1, 0, 1, 0]];


function printMatrix(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            document.writeln(arr[i][j]);
        }
        document.writeln('<br>');
    }
    document.writeln('<br>');
}

function colorMatrix(arr, arr1){
    let html = '<table border="1" cellspacing="0" cellpadding="10">';
    for (let i = 0; i < arr.length; i++) {
        html += '<tr>';
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === 1) {
                html += `<td bgcolor="black" style="color: white">${ arr1[i][j] }</td>`;
            } else {
                html += '<td bgcolor="white"></td>';
            }
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

function rotateMatrix(arr) {
    const rows = arr.length;
    const cols = arr[0].length;
    let rotated = [];
    for (let i = 0; i < rows; i++) {
        rotated[i] = [];
        for (let j = 0; j < cols; j++) {
            rotated[i][j] = arr[j][i];
        }
    }
    rotated.forEach(element => {
        element = element.reverse();
    });
    return rotated;
}

function decodeText(key, matrix){
    let resultText = '';
    document.writeln(colorMatrix(key, matrix));
    document.writeln('<br>');
    let k = 0;
    while (k < 4) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (key[i][j] === 1) {
                    resultText += matrix[i][j];
                }
            }
        }
        key = rotateMatrix(key);
        document.writeln(colorMatrix(key, matrix));
        document.writeln('<br>');
        k++;
    }
    return resultText;
}



let text = 'ОКО_ЙВАХ_ЕЩИМ_ЫО_К_КА_ГОВОНАКОРИ_ВСМТО_ЕГДА_РАС_З_ННЫХ_РТОЯЫЗЫБХ';

let m = [];
let k = 0;
for (let i = 0; i < 8; i++) {
    m[i] = [];
    for (let j = 0; j < 8; j++) {
        m[i][j] = text[k];
        k++;
    }
}
printMatrix(m);
document.writeln('<br>');

const keys = [key1, key2, key3, key4, key5, key6]
for (let i in keys) {
    document.writeln(decodeText(keys[i], m));
    document.writeln('<hr><br>');
}