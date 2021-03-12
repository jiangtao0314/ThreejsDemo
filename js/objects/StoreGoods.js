//货物的位置
function StoreGoods(jiazi, huowu) {
    let col = huowu.Col;
    let layer = huowu.Layer;

    /*
        支架的高=最底层的高度+(库位数-1)*库位的高度
     */
    let shelfHeight = jiazi.BottomHeight + (jiazi.BinYNum) * jiazi.BinHeight;
    /*
     支架的宽=库位数乘以库位的宽度
     */
    let shelfWidth = jiazi.BinZNum * jiazi.BinWidth;

    //货物的XYZ轴的定位
    this.positionX = jiazi.Position.X;
    this.positionY = jiazi.Position.Y - shelfHeight / 2 + jiazi.BinHeight / 2 + (layer - 1) * jiazi.BinHeight + jiazi.BottomHeight;
    this.positionZ = jiazi.Position.Z + shelfWidth / 2 - jiazi.BinWidth / 2 - (col - 1) * jiazi.BinWidth;

    this.no = huowu.No;
    this.name = huowu.Name;

    this.length = jiazi.BinLength - 6;
    this.width = jiazi.BinWidth - 6;
    this.height = jiazi.BinHeight - 6;

    //根据不用的State创建不同类型 和不同颜色的货物
    if (huowu.State == "1") {
        this.color = 0x46C191;
        this.opacity = 0.8;
    } else if (huowu.State == "2") {
        this.color = 0xF0CD3F;
        this.opacity = 0.8;
    } else if (huowu.State == "3") {
        this.color = 0xF55E35;
        this.opacity = 0.8;
    } else {
        this.color = 0x46C191;
        this.opacity = 0.1;
    }
}

//创建cube样式 
StoreGoods.prototype.create = function() {
    let optionCube = {
        length: this.length,
        width: this.width,
        height: this.height,
        position: {
            x: this.positionX,
            y: this.positionY,
            z: this.positionZ
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0,
        },
        style: {
            transparent: 1,
            opacity: this.opacity,
            color: this.color,
            depthTest: 1
        },
    };
    // console.log(optionCube);
    // 调用newCube函数来创建立方体
    let cube = new Cube(optionCube);
    // 设置cube名称ID类型
    cube.uuid = this.no;
    cube.name = this.name;
    cube.type = "StoreGoods";
    return cube;
}

//克隆已有的立方体材质  并设定定位
StoreGoods.prototype.clone = function(object) {
    let goods = object.clone();
    goods.position.set(this.positionX, this.positionY, this.positionZ);
    goods.uuid = this.no;
    goods.name = this.name;
    return goods;
}