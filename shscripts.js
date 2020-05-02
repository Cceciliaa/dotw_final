const canvas1 = document.querySelector('canvas');
const context1 = canvas1.getContext('2d');

const canvas2 = document.querySelectorAll('canvas')[1];
const context2 = canvas2.getContext('2d');

const shbd = document.getElementById('shbd');
const shcol1 = document.getElementById('shcol1');
const shcol2 = document.getElementById('shcol2');

let width;
let height;
let pxScale = window.devicePixelRatio;
let anm;

function setup() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas1.style.width = width + 'px';
    canvas1.style.height = height + 'px';

    canvas1.width = width * pxScale;
    canvas1.height = height * pxScale;

    context1.scale(pxScale, pxScale);

    canvas2.style.width = width + 'px';
    canvas2.style.height = height + 'px';

    canvas2.width = width * pxScale;
    canvas2.height = height * pxScale;

    context2.scale(pxScale, pxScale);
}

let id = 1;
let imgScale = 8;

function draw() {

    context1.clearRect(0, 0, width, height);
    context2.clearRect(0, 0, width, height);

    context1.drawImage(shbd, 0, 0, width / pxScale, height / pxScale);
    context1.globalCompositeOperation = 'lighter';

    let buildingData = context1.getImageData(0, 0, width, height);
    let bdata = buildingData.data;

    context1.clearRect(0, 0, width, height);

    for (let y = 0; y < buildingData.height; y++) {
        for (let x = 0; x < buildingData.width; x++) {
            let index = (x + y * buildingData.width) * 4;

            let br = bdata[index + 0]; // red
            let bg = bdata[index + 1]; // green
            let bb = bdata[index + 2]; // blue
            let ba = bdata[index + 3]; // alpha

            if ((br + bg + bb) / 3 < 80) {
                context1.fillStyle = '#777B7E';
                context1.fillRect(x, y, 1, 1);
            }
        }
    }
}

window.addEventListener('load', () => {
    setup();
    draw();
    });
window.addEventListener('resize', () => {
    setup();
    draw();
});
