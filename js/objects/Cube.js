//立方体类函数封装

function Cube(option) {
    this.length = option.length || 1;
    this.width = option.width || 1;
    this.height = option.height || 1;

    this.Name = option.objName;

    this.positionX = option.position.x || 0;
    this.positionY = option.position.y || 0;
    this.positionZ = option.position.z || 0;
    this.rotationX = option.rotation.x || 0;
    this.rotationY = option.rotation.y || 0;
    this.rotationZ = option.rotation.z || 0;


    this.style = option.style || { color: 0xFF0000 };
    //跳转CommonFunction 创建新的立方体
    let curmaterial = CommonFunction.createMaterial(this.length, this.width, this.height, this.style);

    let cubeGeometry = new THREE.BoxGeometry(this.length, this.height, this.width);

    let cube = new THREE.Mesh(cubeGeometry, curmaterial);
    cube.name = this.Name;
    cube.position.x = this.positionX;
    cube.position.y = this.positionY;
    cube.position.z = this.positionZ;
    cube.rotation.set(this.rotationX, this.rotationY, this.rotationZ, 'XYZ')

    return cube;
}