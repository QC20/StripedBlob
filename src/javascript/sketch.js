var width, height;
var container = document.getElementById('waves');

var scanvas = document.createElement('canvas'),
    scontext = scanvas.getContext('2d');

scanvas.height = height = container.offsetHeight;
scanvas.width = width = container.offsetWidth;

scontext.fillStyle = '#181818';
scontext.fillRect(0,0,width,height);

scontext.strokeStyle = '#fff';

scontext.beginPath();
scontext.lineWidth = 2;

for(var i = 1; i < height; i+=15){
	var w = (Math.random() * 50);
	while(w < width){
		var ex = (Math.random() * (width * 0.25)) + 80;
		
		scontext.moveTo(w,i);
		scontext.lineTo(w + ex, i);
		
		w += ex + ((Math.random() * 50) + 50);
	}
}
scontext.stroke();

//document.body.append(scanvas);



var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, container.offsetWidth / container.offsetHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( container.offsetWidth, container.offsetHeight );
container.appendChild( renderer.domElement );

var startTime = new Date().getTime();
var currentTime = 0;

//var geometry = new THREE.BoxGeometry(78, 15, 800, 800);
var geometry = new THREE.SphereGeometry( 15, 200, 200 );

var texture = new THREE.Texture(scanvas);
texture.needsUpdate = true;

var uniforms = {
	time: { value: 1.0 },
	image: { type: "t", value: texture }
}

var material = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
});

//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );


var plane = new THREE.Mesh( geometry, material );

plane.rotation.x = -(Math.PI * 0.5);
plane.rotation.z = Math.PI * 0.24;
//plane.rotation.y = -(Math.PI * 0.05);

scene.add( plane );


camera.position.y = 0;
camera.position.x = 0;
camera.position.z = 32;

function animate() {
	var now = new Date().getTime();
	currentTime = (now - startTime) / 100;
	uniforms.time.value = currentTime;

	plane.rotation.z += 0.001;
	plane.rotation.y += 0.001;
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();