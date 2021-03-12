//材质函数封装

function CommonFunction() {}

/**
 * 判断当前对象是否为空对象
 */
CommonFunction.hasObj = function(obj) {
        if (obj != null && typeof(obj) != "undefined") {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 创建材质
     * length：材质的长
     * width：材质宽度
     * style:材质特性
     */
    CommonFunction.createMaterial = function(length, width, height, style) {
        var imgheight = 0;
        var imgwidth = 0;
        var color = 0xFF0000; //材质颜色
        var image = null; //材质贴图
        var texture = null;
        var ifRepeat = 0; //贴图是否设置重复显示
        var transparent = 0; //材质是否透明
        var opacity = 0; //材质透明度
        var depthTest = 1; //材质深度
        if (CommonFunction.hasObj(style)) {
            color = style.color || 0xFF0000;
            image = style.image || null;
            ifRepeat = style.ifRepeat || 0;
            transparent = style.transparent || 0;
            opacity = style.opacity || 0;
            depthTest = style.depthTest;
            imgheight = style.imgheight || 0;
            imgwidth = style.imgwidth || 0;
        }
        let material = new THREE.MeshPhongMaterial({ map: texture, color: color });
        if (image != null) {
            texture = new THREE.TextureLoader().load(image);

            if (ifRepeat == 1) {
                texture.repeat.x = length / imgheight;
                texture.repeat.y = width / imgwidth;
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }
            material = new THREE.MeshBasicMaterial({ map: texture });
        }
        if (transparent == 1) {
            material.transparent = true;
        }
        if (depthTest == 0) {
            material.depthTest = false;
        }
        material.opacity = opacity;
        return material;
    }


//使两个位置的XYZ相加
CommonFunction.setPosition = function(positionOri, positionTrans) {
    // console.log(positionTrans);
    positionOri.X = positionOri.X + positionTrans.X;
    positionOri.Y = positionOri.Y + positionTrans.Y;
    positionOri.Z = positionOri.Z + positionTrans.Z;

    return positionOri;
}