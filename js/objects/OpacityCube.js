//半透明白色盒子           数据     颜色  透明度   是否是占有率透明方块
function GreenOpacityCube(object, color, opacity, green) {
    if (green) {
        this.Height = object.Height * 0.75
    } else {
        this.Height = object.Height;
    }

    this.Width = object.Width;
    this.Length = object.Length;


    this.Style = {
        transparent: true,
        opacity: opacity,
        color: color,
        depthTest: 0,
        THREE: 'DoubleSide'
    }

    let material = CommonFunction.createMaterial(this.Length, this.Width, this.Height, this.Style);
    let geometry = new THREE.BoxGeometry(this.Length, this.Height, this.Width)
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = object.Position.X
    cube.position.y = object.Position.Y
    cube.position.z = object.Position.Z
    cube.name = 'OpacityCube';
    if (green) {
        cube.name = 'Occupancy'
    }

    return cube
}