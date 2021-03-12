//根据BuildingData中的数据创建正面墙壁并挖孔
function Wall(option) {
    let childcube = [];
    let cubeBSP, result;
    let firstWall = new Cube(option);
    //保存firstwall样式数据
    var material = firstWall.material;

    // 第一个网格模型
    sphereBSP = new ThreeBSP(firstWall);


    //遍历子数据
    if (option.children) {
        option.children.forEach(item => {
            // console.log(item);
            //将每个子数据创建一个cube网格模型
            childcube = new Cube(item);

            //使用threebsp创建第二个网格模型
            cubeBSP = new ThreeBSP(childcube);

            // 使其相减并把相减后的网格模型赋值给第一个网格模型  用来多次进行减集（扣洞）
            sphereBSP = sphereBSP.subtract(cubeBSP);

        });
    }

    // 完成时需要重新设置网格模型样式
    result = sphereBSP.toMesh(material);

    return result;
}