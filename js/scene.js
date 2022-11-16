
var ORIGEM = new THREE.Vector3(0, 0, 0);

var fovy = 75,
	aspectRatio = window.innerWidth / window.innerHeight,
	near = 1,
	far = 300;

const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load("textures/galaxy.jpg");


const camera = new THREE.PerspectiveCamera( fovy, aspectRatio, near, far );
camera.position.set(75, 75, 75);
camera.lookAt(ORIGEM);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const sol = new Planet(20,0,"textures/sun.jpeg");
const solMesh = sol.getMesh();
const sistemaSolar = new THREE.Group();
sistemaSolar.add(solMesh);

scene.add(sistemaSolar);

const terra = new Planet(4, 50, "/textures/earth.jpeg");
const terraMesh = terra.getMesh();
const terraSistema = new THREE.Group();
terraSistema.add(terraMesh);
const orbitaTerra = new Orbita(terraMesh);
sistemaSolar.add(orbitaTerra.getMesh());

const luaTerra = new Planet(0.5, 5, "/textures/lua.jpg");
const luaTerraMesh = luaTerra.getMesh();
const luaTerraSistema = new THREE.Group();
luaTerraSistema.add(luaTerraMesh);
/* Adiciona lua a órbita do planeta Terra*/
terraMesh.add(luaTerraSistema);

const mercurio = new Planet(0.37*terra.raio, 30, "/textures/mercury.png");
const mercurioMesh = mercurio.getMesh();
const mercurioSistema = new THREE.Group();
mercurioSistema.add(mercurioMesh);
const orbitaMercurio = new Orbita(mercurioMesh);
sistemaSolar.add(orbitaMercurio.getMesh());

const venus = new Planet(0.92*terra.raio, 40, "/textures/venus.jpeg");
const venusMesh = venus.getMesh();
const venusSistema = new THREE.Group();
venusSistema.add(venusMesh);
const orbitaVenus = new Orbita(venusMesh);
sistemaSolar.add(orbitaVenus.getMesh());

const marte = new Planet(0.51*terra.raio, 60, "/textures/mars.jpeg");
const marteMesh = marte.getMesh();
const marteSistema = new THREE.Group();
marteSistema.add(marteMesh);
const orbitaMarte = new Orbita(marteMesh);
sistemaSolar.add(orbitaMarte.getMesh());

const jupiter = new Planet(2*terra.raio, 75, "/textures/jupiter.jpg");
const jupiterMesh = jupiter.getMesh();
const jupiterSistema = new THREE.Group();
jupiterSistema.add(jupiterMesh);
const orbitaJupiter = new Orbita(jupiterMesh);
sistemaSolar.add(orbitaJupiter.getMesh());

const saturno = new Planet(2*terra.raio, 95, "/textures/saturno.jpg");
const saturnoMesh = saturno.getMesh();
const saturnoSistema = new THREE.Group();
saturnoSistema.add(saturnoMesh);
const orbitaSaturno = new Orbita(saturnoMesh);
sistemaSolar.add(orbitaSaturno.getMesh());
const geometriaAnelSaturno = new THREE.RingGeometry(saturno.raio+1, saturno.raio+4, 100 );
const materialAnelSaturno = new THREE.MeshBasicMaterial( { color: 0xF5F6CE, side: THREE.DoubleSide } );
const anelSaturno = new THREE.Mesh( geometriaAnelSaturno, materialAnelSaturno );
anelSaturno.position.x = saturnoMesh.position.x;
anelSaturno.rotation.x = Math.PI / 1.5;
saturnoSistema.add(anelSaturno);

const urano = new Planet(1.5*terra.raio, 115, "/textures/urano.jpg");
const uranoMesh = urano.getMesh();
const uranoSistema = new THREE.Group();
uranoSistema.add(uranoMesh);
const orbitaUrano = new Orbita(uranoMesh);
sistemaSolar.add(orbitaUrano.getMesh());

const neturno = new Planet(1.5*terra.raio, 130, "/textures/neturno.jpg");
const neturnoMesh = neturno.getMesh();
const neturnoSistema = new THREE.Group();
neturnoSistema.add(neturnoMesh);
const orbitaNeturno = new Orbita(neturnoMesh);
sistemaSolar.add(orbitaNeturno.getMesh());



sistemaSolar.add(terraSistema,mercurioSistema,venusSistema,marteSistema,jupiterSistema, saturnoSistema, uranoSistema, neturnoSistema);

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

addLinhaRotacao(terraMesh,terraSistema);

function animate(){
	renderer.render(scene, camera);

	rotacionarObjeto(solMesh,0.001);
	
	rotacionarObjeto(mercurioSistema,EARTH_YEAR*4);

	rotacionarObjeto(venusSistema,EARTH_YEAR*2);

	rotacionarObjeto(terraSistema,EARTH_YEAR);
	rotacionarObjeto(terraMesh,EARTH_DAY);
	rotacionarObjeto(luaTerraSistema,EARTH_DAY);

	rotacionarObjeto(marteSistema,EARTH_YEAR/2);
	rotacionarObjeto(marteMesh,EARTH_DAY);

	rotacionarObjeto(jupiterSistema, EARTH_YEAR/3);
	rotacionarObjeto(jupiterMesh, EARTH_DAY*2);

	rotacionarObjeto(saturnoSistema, EARTH_YEAR/4);
	rotacionarObjeto(saturnoMesh, EARTH_DAY*1.8);
	rotacionarObjeto(anelSaturno, EARTH_DAY*1.8);

	rotacionarObjeto(uranoSistema, EARTH_YEAR/5);
	rotacionarObjeto(uranoMesh, EARTH_DAY*1.7);

	rotacionarObjeto(neturnoSistema, EARTH_YEAR/6);
	rotacionarObjeto(neturnoMesh, EARTH_DAY*1.5);

	controls.update();
	requestAnimationFrame(animate);
}

animate();
