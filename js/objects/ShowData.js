//显示仓库数据
function ShowData(div, data) {
    if (data.object.name == 'OpacityCube') {
        div.innerHTML =
            '<p>仓库编码：21354</p><p>仓库名称：库区1</p><p>总库存：10000</p> <p>已占库存：3500</p><p>今日入库：300</p><p>今日出库：500</p>'
    } else if (data.object.type == 'StoreGoods') {
        // console.log(2);
        div.innerHTML = '<p>编码：567</p><p>名称：鞋</p><p>条码号：3456878</p><p>状态：合格</p>';
    }
}