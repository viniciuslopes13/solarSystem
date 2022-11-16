class Orbita{

    constructor(planetMesh) {
		this.posicaoX = planetMesh.position.x;
	}

	getMesh() {
		if (this.mesh === undefined || this.mesh === null) {
            const geometria = new THREE.RingGeometry( this.posicaoX, this.posicaoX+0.2, 100 );
            const material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide } );
            this.mesh = new THREE.Mesh( geometria, material );
            this.mesh.rotation.x = Math.PI / 2;
		}
		return this.mesh;
	}

}