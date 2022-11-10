
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

function addEmOrbita(objetoFilho, distancia, objetoPai){
	objeto.translateX(distancia);
	objetoPai.add(objetoFilho);
}

function criarLuz(){
	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.set(10, 50, 30);
	scene.add(pointLight);
}

const texturaLua = new THREE.TextureLoader().load('textures/lua.jpg');
const lua = criaPlaneta(2,texturaLua,20);

const texturaTerra = new THREE.TextureLoader().load('textures/earth.jpeg');
const terra = criaPlaneta(10,texturaTerra,70);
terra.add(lua);

const texturaSol = new THREE.TextureLoader().load('textures/sun.jpeg');
const sol = criaPlaneta(20,texturaSol,0);
sol.add(terra);

criarLuz();

function rotacionarSol(){
	var matrizRotacao = new THREE.Matrix4();
	matrizRotacao.makeRotationY(calcularRadianos(1));
	sol.applyMatrix(matrizRotacao);
}

function rotacionarObjeto(objeto, tranlacao, rotacao){
	var matrizRotacaoY = new THREE.Matrix4();
	matrizRotacaoY.makeRotationY(calcularRadianos(tranlacao));
	terra.applyMatrix(matrizRotacaoY);

	var matrizRotacaoEixo = new THREE.Matrix4();
	var	matrizTranslacaoPosicao = new THREE.Matrix4();
	var	matrizTranslacaoOrigem = new THREE.Matrix4();
	var	posicao = objeto.position;

	matrizRotacaoEixo.makeRotationY(calcularRadianos(rotacao));
	matrizTranslacaoPosicao.makeTranslation(posicao.x, posicao.y, posicao.z);
	matrizTranslacaoOrigem.makeTranslation(-posicao.x, -posicao.y, -posicao.z);

	objeto.applyMatrix(matrizTranslacaoOrigem);
	objeto.applyMatrix(matrizRotacaoEixo);
	objeto.applyMatrix(matrizTranslacaoPosicao);
}

function rotacionarTerra(){
	var matrizRotacaoY = new THREE.Matrix4();
	matrizRotacaoY.makeRotationY(calcularRadianos(1));
	terra.applyMatrix(matrizRotacaoY);

	var matrizRotacaoEixo = new THREE.Matrix4();
	var	matrizTranslacaoPosicao = new THREE.Matrix4();
	var	matrizTranslacaoOrigem = new THREE.Matrix4();
	var	posicao = terra.position;

	matrizRotacaoEixo.makeRotationY(calcularRadianos(1.5));
	matrizTranslacaoPosicao.makeTranslation(posicao.x, posicao.y, posicao.z);
	matrizTranslacaoOrigem.makeTranslation(-posicao.x, -posicao.y, -posicao.z);

	terra.applyMatrix(matrizTranslacaoOrigem);
	terra.applyMatrix(matrizRotacaoEixo);
	terra.applyMatrix(matrizTranslacaoPosicao);
}

function rotacionarLua(){
	var matrizRotacaoY = new THREE.Matrix4();
	matrizRotacaoY.makeRotationY(calcularRadianos(6));
	lua.applyMatrix(matrizRotacaoY);

	var matrizRotacaoEixo = new THREE.Matrix4();
	var	matrizTranslacaoPosicao = new THREE.Matrix4();
	var	matrizTranslacaoOrigem = new THREE.Matrix4();
	var	posicao = lua.position;

	matrizRotacaoEixo.makeRotationY(calcularRadianos(0.6));
	matrizTranslacaoPosicao.makeTranslation(posicao.x, posicao.y, posicao.z);
	matrizTranslacaoOrigem.makeTranslation(-posicao.x, -posicao.y, -posicao.z);

	lua.applyMatrix(matrizTranslacaoOrigem);
	lua.applyMatrix(matrizRotacaoEixo);
	lua.applyMatrix(matrizTranslacaoPosicao);
}

function calcularRadianos(grau){
	return grau * Math.PI / 180;
}

const controls = new THREE.OrbitControls( camera, renderer.domElement );

//controls.update();

function animate(){
	renderer.render(scene, camera);

	rotacionarObjeto(sol,0,1);
	//rotacionarObjeto(terra,0.1,2);
	//rotacionarObjeto(lua,5,3);

	rotacionarLua();
	rotacionarTerra();
	//rotacionarObjeto(terra,0.1,1.5);
	//rotacionarObjeto(lua,0.1,1);
	//rotacionarSol();

	//controls.update();

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