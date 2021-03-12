//货架搭建
function CreateGoods(option) {
    this.binLength = option.BinLength || 50; //库位长度
    this.binWidth = option.BinWidth || 50; //库位宽
    this.binHeight = option.BinHeight || 50; //库位高
    this.binXNum = option.BinXNum || 1; //库位X轴方向库位数量
    this.binZNum = option.BinZNum || 10; //库位Z轴方向库位数量
    this.binYNum = option.BinYNum || 10; //库位Y轴库位数量
    this.bottomHight = option.BottomHeight || 20; //底层高度，底层
    this.positionX = option.Position.X || 0; //库位位置
    this.positionY = option.Position.Y || 0; //库位位置
    this.positionZ = option.Position.Z || 0; //库位位置
    this.rackLengh = 3; //支架的长度，默认设动为3
    this.rackWidth = 3; //支架的宽度，默认设定为3
    this.intervalRackNum = 2; //间隔多少库位有一个主支架


    let binHolderPlane = new THREE.BoxGeometry(this.binLength, 2, this.binWidth); //定义一个跟库位长宽相同的几何体，作为托盘

    let shlefMat = new THREE.MeshLambertMaterial({ color: 0x175EC0 }); //定义支架和托盘的材质

    //合并模型，则使用merge方法合并
    let combineGeometry = new THREE.Geometry();
    /*
     支架的高=最底层的高度+(库位数-1)*库位的高度
     */
    let rackHeight = this.bottomHight + (this.binYNum - 1) * this.binHeight;
    /*
     支架的宽=库位数乘以库位的宽度
     */
    let shelfWidth = this.binZNum * this.binWidth;
    let rackBoxGeometry = new THREE.BoxGeometry(this.rackLengh, rackHeight, this.rackWidth); //定义一个支架网格
    let rackObject = new THREE.Mesh(rackBoxGeometry, shlefMat, 0);

    let plane = new THREE.BoxGeometry(this.binLength, 2, this.binWidth);
    let holderObject = new THREE.Mesh(plane, shlefMat, 0);

    let leftPositionX = this.positionX - this.binLength / 2 + this.rackLengh / 2; //左侧支架柱的X轴条码
    let rightPositionX = this.positionX + this.binLength / 2 - this.rackLengh / 2; //右侧支架柱的X轴条码


    let positionY = this.positionY - this.binHeight / 2; //支架柱的Y轴坐标


    //支架柱子的Z轴坐标                         Z轴库区（能放6个货物）
    for (let i = 0; i < this.binZNum + this.intervalRackNum; i++) {
        let isRack = i % this.intervalRackNum;
        if (isRack == 0) {
            let PositionZ = this.positionZ - shelfWidth / 2 + i * this.binWidth + this.rackWidth / 2;
            if (i >= this.binZNum) {
                PositionZ = PositionZ - this.rackWidth;
            }

            let leftRack = rackObject.clone();
            leftRack.position.set(leftPositionX, positionY, PositionZ);
            leftRack.updateMatrix();
            combineGeometry.merge(leftRack.geometry, leftRack.matrix);
            let rightRack = rackObject.clone();
            rightRack.position.set(rightPositionX, positionY, PositionZ);
            rightRack.updateMatrix();
            combineGeometry.merge(rightRack.geometry, rightRack.matrix);
        }
    }

    //创建托板
    for (let i = 0; i < this.binZNum; i++) {
        for (let j = 0; j < this.binYNum; j++) {

            let positionY = this.positionY - this.binHeight / 2 - rackHeight / 2 + this.bottomHight + j * this.binHeight;
            let positionZ = this.positionZ - shelfWidth / 2 + this.binWidth / 2 + i * this.binWidth
            let holderObj = holderObject.clone();
            holderObj.position.set(this.positionX, positionY, positionZ);
            holderObj.updateMatrix();
            combineGeometry.merge(holderObj.geometry, holderObj.matrix);
        }
    }
    let shelf = new THREE.Mesh(combineGeometry, shlefMat);
    shelf.uuid = option.No;
    shelf.name = option.Name;
    shelf.type = "StoreShelf";
    return shelf;
}