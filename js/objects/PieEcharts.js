//使用Echarts绘制饼图
function PieEcharts(option, store3D) {
    // console.log(option.Name);
    //创建装饼图的div并初始化
    let piediv = document.createElement('div');
    piediv.style.width = '256px';
    piediv.style.height = '256px';
    this.signChart = echarts.init(piediv);


    //饼图配置
    let pieoption = {
        series: [{
            type: 'pie',
            radius: ['0', '50%'],

            data: [{
                    value: 0,
                    name: option.Name,
                    itemStyle: {
                        color: 'rgba(20,198,249,1)'
                    },
                    label: {
                        fontSize: 28,
                        color: 'white',
                        position: 'center',
                    },
                },

            ]
        }]
    }

    this.signChart.setOption(pieoption);

    //图标自适应
    window.addEventListener('resize', () => {
        this.signChart.resize();
    })

    //饼图图片设置精灵模型 添加到场景
    this.signChart.on('finished', () => {
        let spriteMap = new THREE.TextureLoader().load(this.signChart.getDataURL());
        let spriteMaterial = new THREE.SpriteMaterial({
            map: spriteMap,
            side: THREE.DoubleSide,
        })
        let sprite = new THREE.Sprite(spriteMaterial);
        let y = option.Height + 50;
        sprite.position.set(option.Position.X, y, option.Position.Z);
        sprite.scale.set(250, 250, 1)
        sprite.type = 'pieEcharts'

        store3D.SpriteObject.push(sprite);
        store3D.addObject(sprite)
    })

}