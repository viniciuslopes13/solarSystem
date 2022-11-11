
var ORIGEM = new THREE.Vector3(0, 0, 0);

var fovy = 75,
    	aspectRatio = window.innerWidth / window.innerHeight,
    	near = 1,
    	far = 300;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( fovy, aspectRatio, near, far );
camera.position.set(75, 75, 75);
camera.lookAt(ORIGEM);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function criaPlaneta(raio, textura, orbita){
	const geometriaPlanet = new THREE.SphereGeometry(raio, 20, 20);
	const materialPlanet = new THREE.MeshBasicMaterial({map: textura});
	const planet = new THREE.Mesh(geometriaPlanet, materialPlanet);
	planet.translateX(orbita);
	scene.add(planet);
	return planet;
}

const sol = new Planet(20,0,"textures/sun.jpeg");
const solMesh = sol.getMesh();
const sistemaSolar = new THREE.Group();
sistemaSolar.add(solMesh);

scene.add(sistemaSolar);

const mercurio = new Planet(2, 30, "/textures/mercury.png");
const mercurioMesh = mercurio.getMesh();
const mercurioSistema = new THREE.Group();
mercurioSistema.add(mercurioMesh);

const venus = new Planet(3, 40, "/textures/venus.jpeg");
const venusMesh = venus.getMesh();
const venusSistema = new THREE.Group();
venusSistema.add(venusMesh);

const terra = new Planet(4, 50, "/textures/earth.jpeg");
const terraMesh = terra.getMesh();
const terraSistema = new THREE.Group();
terraSistema.add(terraMesh);

const marte = new Planet(5, 60, "/textures/mars.jpeg");
const marteMesh = marte.getMesh();
const marteSistema = new THREE.Group();
marteSistema.add(marteMesh);

const luaTerra = new Planet(0.5, 5, "/textures/lua.jpg");
const luaTerraMesh = luaTerra.getMesh();
const luaTerraSistema = new THREE.Group();
luaTerraSistema.add(luaTerraMesh);

/* Adiciona lua a órbita do planeta Terra*/
terraMesh.add(luaTerraSistema);

sistemaSolar.add(terraSistema,mercurioSistema,venusSistema,marteSistema);

function rotacionarObjeto(objeto, rotacao){
	var matrizRotacaoEixo = new THREE.Matrix4();
	var	matrizTranslacaoPosicao = new THREE.Matrix4();
	var	matrizTranslacaoOrigem = new THREE.Matrix4();
	var	posicao = objeto.position;

	matrizRotacaoEixo.makeRotationY(rotacao);
	matrizTranslacaoPosicao.makeTranslation(posicao.x, posicao.y, posicao.z);
	matrizTranslacaoOrigem.makeTranslation(-posicao.x, -posicao.y, -posicao.z);

	objeto.applyMatrix(matrizTranslacaoOrigem);
	objeto.applyMatrix(matrizRotacaoEixo);
	objeto.applyMatrix(matrizTranslacaoPosicao);
}


const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);
const EARTH_DAY = 2 * Math.PI * (1 / 10) * (1 / 10);

function addLinhaRotacao(planetaMesh, planetaSitema, mostrarLinha = true){
	const linhaRotacao = new Rotation(planetaMesh,mostrarLinha);
	const linhaRotacaoMesh = linhaRotacao.getMesh();
	planetaSitema.add(linhaRotacaoMesh);
}


addLinhaRotacao(marteMesh,marteSistema);
/*addLinhaRotacao(terraMesh,terraSistema);
addLinhaRotacao(venusMesh,venusSistema);
addLinhaRotacao(mercurioMesh,mercurioSistema);*/


function animate(){
	renderer.render(scene, camera);

	rotacionarObjeto(solMesh,0.001);
	
	rotacionarObjeto(mercurioSistema,EARTH_YEAR*4);

	rotacionarObjeto(venusSistema,EARTH_YEAR*2);

	rotacionarObjeto(terraSistema,EARTH_YEAR);
	rotacionarObjeto(terraMesh,EARTH_DAY);

	//rotacionarObjeto(marteSistema,EARTH_YEAR/2);
	rotacionarObjeto(marteMesh,EARTH_DAY*2);

	

	

	

	rotacionarObjeto(luaTerraSistema,EARTH_DAY);

	controls.update();
	requestAnimationFrame(animate);
}

animate();




















/*
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;

	renderer.render( scene, camera );
};

animate();*/