// 加载AGV小车
function AGVCar() {
    let objloader = new THREE.OBJLoader();
    let mtlloader = new THREE.MTLLoader();
    let a = null

    function mtl() {
        return new Promise(res => {
            mtlloader.load('../../models/AGV.mtl', function(material) {
                res(material)
            })
        })
    }

    function objload(material) {
        return new Promise((res) => {
            objloader.setMaterials(material);
            objloader.load('../../models/AGV.obj', function(obj) {
                obj.scale.set(0.1, 0.1, 0.1);
                obj.name = "AGV小车";
                obj.position.set(-100, 40, 100);
                obj.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
                        child.material.transparent = true;
                    }
                });
                res(obj)
            })
        })
    }
    async function main() {
        let material = await mtl();
        let obj = await objload(material);
        return obj
    }
    return main()
}