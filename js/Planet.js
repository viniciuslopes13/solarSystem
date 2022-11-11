
class Planet {

    constructor(raio, posicaoX, textureFile) {
        this.raio = raio;
        this.posicaoX = posicaoX;
        this.textureFile = textureFile;
    }

    getMesh() {
        if (this.mesh === undefined || this.mesh === null) {
            const geometriaPlaneta = new THREE.SphereGeometry(this.raio);
            const textura = new THREE.TextureLoader().load(this.textureFile);
            const material = new THREE.MeshBasicMaterial({ map: textura });
            this.mesh = new THREE.Mesh(geometriaPlaneta, material);
            this.mesh.position.x += this.posicaoX;
        }
        return this.mesh;
    }

}
