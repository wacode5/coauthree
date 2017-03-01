var THREE = require("three");
var $ = require("jquery");
var orbitcontrol = require('three-orbitcontrols');

var renderer, lookupCanvas, ctx, lookupTexture;

function init_scene(canvas,  loadedFiles ){
    console.log("loaded files are " + loadedFiles);
	var scene = _build_scene( new THREE.Scene(), loadedFiles );
	var camera = _build_camera( scene );
    var controller = new orbitcontrol( camera );
	renderer = _build_renderer( canvas );

	renderer.render( scene, camera );
    console.log("finished rendering");

    return { scene: scene,
             controller: controller,
             camera: camera,
             city: loadedFiles[2]};
};

function _build_scene(scene, files){
	scene = _add_light(scene);
	scene = _add_earth(scene, files);
    scene = _add_cities( scene, files );
	return scene;
};

function _add_earth(scene, files){
	var geometry = new THREE.SphereGeometry(100, 40, 40);
    console.log("going to map texture for "+ files[0]);

    // create Textures from pre-loaded Image object
    var indexedMapTexture = new THREE.Texture( files[0] );
    indexedMapTexture.magFilter = THREE.NearestFilter;
    indexedMapTexture.minFilter = THREE.NearestFilter;
    indexedMapTexture.needsUpdate = true;

    var mapOutlineTexture = new THREE.Texture( files[1] );
    // mapOutlineTexture.magFilter = THREE.NearestFilter;
    // mapOutlineTexture.minFilter = THREE.NearestFilter;
    mapOutlineTexture.needsUpdate = true;

    lookupCanvas = document.createElement("canvas");
    lookupCanvas.width = 256;
    lookupCanvas.height = 1;
    ctx = lookupCanvas.getContext("2d");

    lookupTexture = new THREE.Texture( lookupCanvas );
    lookupTexture.magFilter = THREE.NearestFilter;
    lookupTexture.minFilter = THREE.NearestFilter;
    lookupTexture.needsUpdate = true;


    // make material
    var vertShader = $('#vertexshader').html();
    var fragShader = $('#fragmentshader').html();

    var uniforms = {
        'mapIndex': { type: 't', value: indexedMapTexture },
        'outline': { type: 't', value:  mapOutlineTexture },
        'lookup': { type: 't', value: lookupTexture },
        'outlineLevel': {type: 'f', value: 1}
    }

    var shaderMaterial = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader: fragShader,
        blending: THREE.NormalBlending,
        depthTest: false,
        transparent: true
     } );


	var earthMesh = new THREE.Mesh(geometry, shaderMaterial);
	scene.add(earthMesh);

	return scene;
};

function _build_renderer(canvas) {
	var renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setSize( canvas.clientWidth, canvas.clientHeight );
	renderer.autoClear = false;
	renderer.sortObjects = false;
	$("body").append( renderer.domElement );

	return renderer;
}

function _add_light(scene){
	scene.add( new THREE.AmbientLight( 0x505050 ) );

	var light1 = new THREE.SpotLight( 0xeeeeee, 3 );
	light1.position.x = 730;
	light1.position.y = 520;
	light1.position.z = 626;
	light1.castShadow = true;
	scene.add( light1 );

	var light2 = new THREE.PointLight( 0x222222, 14.8 );
	light2.position.x = -640;
	light2.position.y = -500;
	light2.position.z = -1000;
	scene.add( light2 );

	return scene;
};

function _build_camera(scene){
	var camera = new THREE.PerspectiveCamera(12,
			window.innerWidth / window.innerHeight,
			200);
	camera.position.z = 1400;
	camera.position.y = 0;
	// camera.lookAt(scene.width/2, scene.height/2);

	return camera;
};


function _add_cities( scene, files ){
    var cityinfo = files[2];
    console.log(cityinfo);
    return scene;
}


function highlight_cities( cityinfo ){
    var position = cityinfo.WASHINGTON;
    ctx.fillRect(position.lat, position.lon, 500, 500);
    ctx.fillStyle = 'rgb(255,00,00)';
    ctx.fill();
    lookupTexture.needsUpdate = true;
};


function animate( d ) {
    var controller = d.controller;
    var scene = d.scene;
    var camera = d.camera;
    var city = d.city;

    function _animate(){
        controller.update();
        highlight_cities( city );
        renderer.render( scene, camera );

        requestAnimationFrame( _animate );
    }
    _animate();
}


function listen(){
    // mock to write eventlistener
    return
};


var main = {init_scene: init_scene,
    animate: animate,
    listen: listen};

module.exports = main;

