var scene, camera, renderer;
var geometry, material, mesh;



var userOpts = {
    range: 150,
    duration: 100,
    delay: 200,
    easing: 'Elastic.EaseInOut'
};


init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    var texture1 = new THREE.ImageUtils.loadTexture('img/cubeTexture.jpg');

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({map: texture1});

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function setupTween() {

    var update = function () {
        mesh.position.y = current.y;
    };
    var current = {y: -userOpts.range};


    TWEEN.removeAll();


    //var easing	= TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];


    var tweenHead = new TWEEN.Tween(current)
        .to({y: +userOpts.range}, userOpts.duration)
        //.delay(userOpts.delay)
        //.easing(easing)
        .onUpdate(update);


    var tweenBack = new TWEEN.Tween(current)
        .to({y: -userOpts.range}, userOpts.duration)
        //.delay(userOpts.delay)
        //.easing(easing)
        .onUpdate(update);

    tweenHead.chain(tweenBack);


    tweenBack.chain(tweenHead);

    tweenHead.start();
}

function animate() {

    requestAnimationFrame(animate);

    //mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    TWEEN.update();
    renderer.render(scene, camera);

}

//JUMP

window.addEventListener("keypress", function () {
    //mesh.position.y += 150;


    //TWEEN.start();
    setupTween();

    var audio = new Audio('wav/smb_coin.wav');
    audio.play();
});


//RESIZE
window.addEventListener("resize", function () {
    onWindowResize();
});

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
