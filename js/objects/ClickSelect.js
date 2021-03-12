//鼠标点击事件
function ClickSelect(camera, scene, outline) {
    let outlineObject = [];
    let showdata = document.querySelector('.showMessage')
    window.addEventListener('click', mouseClick)

    function mouseClick(e) {
        let mouse = {
            x: 0,
            y: 0,
        };
        //坐标系转换
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        let intersects = raycaster.intersectObjects(scene.children);
        // console.log(intersects[0]);
        //判断点击的类型
        // console.log(intersects);
        outlineObject.pop();
        if (intersects.length > 0 && (intersects[0].object.name == 'OpacityCube' || intersects[0].object.type == 'StoreGoods')) {
            new ShowData(showdata, intersects[0]);
            outlineObject.push(intersects[0].object);
            // console.log(outline);
            outline.selectedObjects = outlineObject;
            //修改定位
            showdata.style.left = e.clientX + 'px'
            showdata.style.top = e.clientY + 'px'

            showdata.style.display = 'block';
        } else {
            showdata.style.display = 'none'
        }
    }
}