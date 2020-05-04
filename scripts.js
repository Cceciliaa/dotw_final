const space = document.getElementById('space');
const container = document.getElementById('container');
const pcbg = document.getElementById('pcbg');
const pcup = document.getElementById('pcup');
const cdup = document.getElementById('cdup');
const fwup = document.getElementById('fwup');

const c1 = document.getElementById('cv1');
const c2 = document.getElementById('cv2');
const c3 = document.getElementById('cv3');

c1.addEventListener('mousedown', () => {
  window.location.href = "http://i6.cims.nyu.edu/~zc1151/dotw_final/ny.html"
})
c2.addEventListener('mousedown', () => {
  window.location.href = "http://i6.cims.nyu.edu/~zc1151/dotw_final/sh.html"
})
c3.addEventListener('mousedown', () => {
  window.location.href = "http://i6.cims.nyu.edu/~zc1151/dotw_final/gz.html"
})

const context1 = c1.getContext('2d');
const context2 = c2.getContext('2d');
const context3 = c3.getContext('2d');

let pxScale;
let width;
let height;

function setup() {
  pxScale = window.devicePixelRatio;
  width = window.innerWidth / 6;
  height = window.innerHeight / 3;

  c1.style.width = 4 * width + 'px';
  c1.style.height = 2 * height + 'px';
  c1.width = 4 * width * pxScale;
  c1.height = 2 * height * pxScale;
  context1.scale(pxScale, pxScale);

  c2.style.width = 4 * width + 'px';
  c2.style.height = 2 * height + 'px';
  c2.width = 4 * width * pxScale;
  c2.height = 2 * height * pxScale;
  context2.scale(pxScale, pxScale);

  c3.style.width = 4 * width + 'px';
  c3.style.height = 2 * height + 'px';
  c3.width = 4 * width * pxScale;
  c3.height = 2 * height * pxScale;
  context3.scale(pxScale, pxScale);
}

function draw() {
  let w2 = c2.width / pxScale;
  let h2 = c2.height / pxScale;

  context1.clearRect(0, 0, w2, h2);
  context2.clearRect(0, 0, w2, h2);
  context2.clearRect(0, 0, w2, h2);

  context2.drawImage(pcbg, 0, 0, w2 / pxScale, h2 / pxScale);
  let backgroundData = context2.getImageData(0, 0, w2, h2);
  let bdata = backgroundData.data;
  context2.clearRect(0, 0, w2, h2);

  context1.drawImage(cdup, 0, 0, w2 / pxScale, h2 / pxScale);
  let cloudData = context1.getImageData(0, 0, w2, h2);
  let cdata = cloudData.data;
  context1.clearRect(0, 0, w2, h2);

  context2.drawImage(pcup, 0, 0, w2 / pxScale, h2 / pxScale);
  let frontData = context2.getImageData(0, 0, w2, h2);
  let fdata = frontData.data;
  context2.clearRect(0, 0, w2, h2);

  context3.drawImage(fwup, 0, 0, w2 / pxScale, h2 / pxScale);
  let flowerData = context3.getImageData(0, 0, w2, h2);
  let wdata = flowerData.data;
  context3.clearRect(0, 0, w2, h2);

  for (let y = 0; y < backgroundData.height; y++) {
    for (let x = 0; x < backgroundData.width; x++) {
      let index = (x + y * backgroundData.width) * 4;
      let gr = bdata[index + 0]; // red
      let gg = bdata[index + 1]; // green
      let gb = bdata[index + 2]; // blue
      let ga = bdata[index + 3]; // alpha

      let cr = cdata[index + 0]; // red
      let cg = cdata[index + 1]; // green
      let cb = cdata[index + 2]; // blue
      let ca = cdata[index + 3]; // alpha

      let fr = fdata[index + 0]; // red
      let fg = fdata[index + 1]; // green
      let fb = fdata[index + 2]; // blue
      let fa = fdata[index + 3]; // alpha

      let wr = wdata[index + 0]; // red
      let wg = wdata[index + 1]; // green
      let wb = wdata[index + 2]; // blue
      let wa = wdata[index + 3]; // alpha

      context1.fillStyle = 'rgba(' + gr + ', ' + gg + ', ' + gb + ', ' + '1)';
      context1.fillRect(x, y, 1, 1);

      context2.fillStyle = 'rgba(' + gr + ', ' + gg + ', ' + gb + ', ' + '1)';
      context2.fillRect(x, y, 1, 1);

      context3.fillStyle = 'rgba(' + gr + ', ' + gg + ', ' + gb + ', ' + '1)';
      context3.fillRect(x, y, 1, 1);

      if ((cr + cg + cb) / 3 < 225) {
        context1.fillStyle = 'rgba(' + cr + ', ' + cg + ', ' + cb + ', ' + '1)';
        context1.fillRect(x, y, 1, 1);
      }

      if ((fr + fg + fb) / 3 < 225) {
        context2.fillStyle = 'rgba(' + fr + ', ' + fg + ', ' + fb + ', ' + '1)';
        context2.fillRect(x, y, 1, 2.5);
      }

      if ((wr + wg + wb) / 3 < 225) {
        context3.fillStyle = 'rgba(' + wr + ', ' + wg + ', ' + wb + ', ' + '1)';
        context3.fillRect(x, y, 1, 1);
      }
    }
  }
}

let camera, scene, renderer;

function init() {
  scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 100, 800);
  scene.add(camera);

  light = new THREE.AmbientLight(0xfffff00, 0.6);
  light.position.set(0, 80, 0);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ alpha: 1, antialias: true });
  renderer.setSize(width, height);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  space.appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

function text() {
  let loader = new THREE.FontLoader();

  loader.load('helvetiker_regular.typeface.json', function (font) {

    let geometry = new THREE.TextGeometry('City Memories', {
      font: font,
      size: 120,
      height: 35,
      curveSegments: 15,
      bevelThickness: 1,
      bevelSize: 5,
      bevelEnabled: true
    });

    let material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0.4, side: THREE.DoubleSide } );
    let text = new THREE.Mesh( geometry, material );

    text.position.set(-450, 400, -100);
    scene.add(text);
  });

}

function animate() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
  setup();
  draw();
  init();
  text();
  animate();
}
);

window.addEventListener('resize', () => {
  while (space.childNodes.length > 0) {
    space.removeChild(space.childNodes[0]);
};
  setup();
  draw();
  init();
  text();
  animate();
}
);