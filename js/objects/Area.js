// 根据BuilldingData的数据结构创建Threejs库区
function Area(option) {
    let group = new THREE.Group();
    //分别设置四条边的长度
    for (let i = 0; i < 4; i++) {
        if (i >= 2) {
            var lineTop = new THREE.PlaneGeometry(option.width, option.topheight, 32);
        } else {
            var lineTop = new THREE.PlaneGeometry(option.width, option.height, 32);
        }

        let material = new THREE.LineBasicMaterial({
            color: 'yellow',
            side: THREE.DoubleSide,
        })
        let top = new THREE.Mesh(lineTop, material);
        top.position.y = option.position.y;
        top.rotateX(Math.PI / 2)
        group.add(top)
    }


    //设置四条边的位置
    group.children[0].position.x = option.left.position.x;
    group.children[0].position.z = option.left.position.z || 0;
    group.children[1].position.x = option.right.position.x;
    group.children[1].position.z = option.right.position.z || 0;

    group.children[2].rotateZ(option.top.rotation.z);
    group.children[2].position.z = option.top.position.z;
    group.children[2].position.x = option.top.position.x;

    group.children[3].rotateZ(option.bottom.rotation.z);
    group.children[3].position.z = option.bottom.position.z;
    group.children[3].position.x = option.bottom.position.x;

    group.children.forEach(item => {
        item.position.z += -50;
    })






    //文字模型
    let loader = new THREE.FontLoader();
    loader.load('../../gentilis.json', function(font) {
        let gem = new THREE.TextGeometry(option.font.text, {
            size: 60,
            font: font,
            height: 1,
        })
        let material = new THREE.MeshPhongMaterial({
            color: 'red'
        })
        let mesh = new THREE.Mesh(gem, material);
        mesh.position.x = option.font.position.x;
        mesh.position.z = option.font.position.z;
        mesh.position.y = option.font.position.y;

        mesh.rotateX(-Math.PI / 2);

        document.querySelector('.black').style.display = 'none';

        group.add(mesh)
    })

    return group
}