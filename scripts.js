const canvas1 = document.querySelector('canvas');
const context1 = canvas1.getContext('2d');

const canvas2 = document.querySelectorAll('canvas')[1];
const context2 = canvas2.getContext('2d');

const nybd = document.getElementById('nybd');
const nycol = document.getElementById('nycol');
const nylight = document.getElementById('nylight')

let width;
let height;
let pxScale = window.devicePixelRatio;

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

    draw();
}

let imgScale = 10;
let anm;

function draw() {
    context1.clearRect(0, 0, width, height);
    context2.clearRect(0, 0, width, height);

    context1.drawImage(nybd, 0, 0, width / (imgScale * pxScale), height / (imgScale * pxScale));
    context1.globalCompositeOperation = 'lighter';

    context2.drawImage(nycol, 0, 0, width / (imgScale * pxScale), height / (imgScale * pxScale));

    let buildingData = context1.getImageData(0, 0, width / imgScale, height / imgScale);
    let bdata = buildingData.data;

    let paintingData = context2.getImageData(0, 0, width / imgScale, height / imgScale);
    let pdata = paintingData.data;

    context1.clearRect(0, 0, width, height);
    context2.clearRect(0, 0, width, height);

    for (let y = 0; y < buildingData.height; y++) {
        for (let x = 0; x < buildingData.width; x++) {
            let index = (x + y * buildingData.width) * 4;

            let br = bdata[index + 0]; // red
            let bg = bdata[index + 1]; // green
            let bb = bdata[index + 2]; // blue
            let ba = bdata[index + 3]; // alpha

            let pr = pdata[index + 0]; // red
            let pg = pdata[index + 1]; // green
            let pb = pdata[index + 2]; // blue
            let pa = pdata[index + 3]; // alpha

            if ((br + bg + bb) / 3 < 80) {
                context1.fillStyle = 'rgba(' + pr + ',' + pg + ',' + pb + ', 1)';
                context1.fillRect(x * imgScale, y * imgScale, imgScale, imgScale);
            }

            context2.fillStyle = 'rgba(' + pr + ',' + pg + ',' + pb + ', 0.5)';
            context2.fillRect(x * imgScale, y * imgScale, imgScale, imgScale);

        }
    }
    imgScale -= 0.1;
}

function anmDraw() {
    if (imgScale >= 1) {
        anm = requestAnimationFrame(draw);
    }
    if (imgScale >= 1 & imgScale <= 3) {
        nylight.style.opacity += 0.05;
    }
}

window.addEventListener('load', setup);
window.addEventListener('resize', setup);

window.addEventListener('mousemove', anmDraw);