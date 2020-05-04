const canvas1 = document.querySelector('canvas');
const context1 = canvas1.getContext('2d');

const canvas2 = document.querySelectorAll('canvas')[1];
const context2 = canvas2.getContext('2d');

const nybd = document.getElementById('nybd');
const nycol1 = document.getElementById('nycol1');
const nycol2 = document.getElementById('nycol2');
const nycol3 = document.getElementById('nycol3');

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

    context1.drawImage(nybd, 0, 0, width / pxScale, height / pxScale);
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

            if ((br + bg + bb) / 3 < 130) {
                context1.fillStyle = '#777B7E';
                context1.fillRect(x, y, 1, 1);
            }
        }
    }
    drawbg();
}

let x = 0;
let y = 0;
let count = 5;

function drawbg() {

    context2.clearRect(0, 0, width, height);

    if (id == 1) {
        context2.drawImage(nycol1, 0, 0, width / (imgScale * pxScale), height / (imgScale * pxScale));
    }
    else if (id == 2) {
        context2.drawImage(nycol2, 0, 0, width / (imgScale * pxScale), height / (imgScale * pxScale));
    }
    else if (id == 3) {
        context2.drawImage(nycol3, 0, 0, width / (imgScale * pxScale), height / (imgScale * pxScale));
    }

    let pd = context2.getImageData(0, 0, width / imgScale, height / imgScale);
    let pdata = pd.data;

    context2.clearRect(0, 0, width, height);

    for (let y = 0; y < pd.height; y++) {
        for (let x = 0; x < pd.width; x++) {
            let index = (x + y * pd.width) * 4;

            let pr = pdata[index + 0]; // red
            let pg = pdata[index + 1]; // green
            let pb = pdata[index + 2]; // blue
            let pa = pdata[index + 3]; // alpha

            context2.fillStyle = 'rgba(' + pr + ',' + pg + ',' + pb + ', 0.4)';
            context2.fillRect(imgScale * x, imgScale * y, imgScale, imgScale);
        }
    }

    if (imgScale > 2 & count == 5) {
        imgScale -= 0.2;
    }
    else {
        if (count > 1) {
            count -= 1;
        }
        else {
            if (imgScale < 8) {
                imgScale += 0.1;
            }
            else {
                set = false;
                if (id < 3) {
                    id++;
                }
                else {
                    id = 1;
                    brightness = 1.1;
                    contrast = 0.7;
                }
                cancelAnimationFrame(anm);
                sceen = 0
                imgScale = 8;
                count = 5;
                drawbg();
            }
        }
    } 
    anm = requestAnimationFrame(drawbg);
}

window.addEventListener('load', () => {
    setup();
    draw();
    });
window.addEventListener('resize', () => {
    setup();
    draw();
});
