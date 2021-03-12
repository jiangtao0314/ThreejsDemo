//绘制线条
function Createline(data) {
    var points = [];
    data.points.forEach(item => {
            let a = new THREE.Vector3(item.x, item.y, item.z)
            points.push(a)
        })
        //不闭合 此时已经使用数据闭合了
    let curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.0001);
    let point = curve.getPoints(1000);
    let geometry = new THREE.Geometry();
    geometry.setFromPoints(point);

    let material = new THREE.LineBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
    })
    let line = new THREE.Line(geometry, material);
    return [line, curve]
}