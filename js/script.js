var scene, camera, renderer;
var geometry, material, mesh;



var userOpts = {
    range: 150,
    duration: 100,
    delay: 0,
    easing: 'Elastic.EaseInOut'
};

var coinOpts = {
    range: 350,
    duration: 500,
    delay: 0,
    //easing: 'Elastic.EaseOut'
};


init();
animate();

function init() {
    
    // Background music
    var bgm = new Audio('wav/SMBTheme.mp3');
    bgm.play();
    
    // Set Scene
    scene = new THREE.Scene();

    // Set camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    // Add textures
    var cubetexture = new THREE.ImageUtils.loadTexture('img/cubeTexture.jpg');
    var cointexture = new THREE.ImageUtils.loadTexture('img/coin.png');
    
    // Add geometries

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({map: cubetexture});
    
    geometry2 = new THREE.BoxGeometry(150, 150, 0);
    material2 = new THREE.MeshBasicMaterial({map: cointexture});

    mesh = new THREE.Mesh(geometry, material);
    mesh2 = new THREE.Mesh(geometry2, material2);
    scene.add(mesh);
    scene.add(mesh2);

    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function setupTween() {

    var update = function () {
        mesh.position.y = current.y;
        mesh2.position.y = current2.y;
    };
    var current = {y: userOpts.range};
    var current2 = {y: coinOpts.range};


    TWEEN.removeAll();


    //var easing	= TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];


    var tweenHead = new TWEEN.Tween(current)
        .to({y: 0}, userOpts.duration)
        //.delay(userOpts.delay)
        //.easing(easing)
        .onUpdate(update);


    var tweenBack = new TWEEN.Tween(current)
        .to({y: 0}, userOpts.duration)
        //.delay(userOpts.delay)
        //.easing(easing)
        .onUpdate(update);
    
    var tweenBack2 = new TWEEN.Tween(current2)
        .to({y: 0}, coinOpts.duration)
        //.delay(userOpts.delay)
        .easing(TWEEN.Easing.Exponential.In)
        .onUpdate(update);

    


    //tweenBack.chain(tweenHead);
    //tweenHead.chain(tweenBack);
    //tweenBack.start();
    tweenHead.start();
    tweenBack.start();
    tweenBack2.start();
    
    
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
