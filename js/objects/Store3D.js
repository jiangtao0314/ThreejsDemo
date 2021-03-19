function Store3D() {
    this.scene = null; //场景
    this.camera = null; //相机
    this.renderer = null; //渲染器
    this.objects = []; //场景中所有对象的集合
    this.areaData = null; //Axios发送的仓库数据
    this.first = true; //是否第一次运行程序
    this.SpriteObject = []; //所有精灵模型
    this.goodTypes = []; //所有货物
    this.time = 0; //AGV汽车移动
    this.progess = 0; //AGV汽车移动
    this.isshowSpace = false; //显示空间利用率
    this.opacityBox = []; //透明盒子数据
    this.opacityBox2 = []; //透明盒子数据2
    this.velocity = new THREE.Vector3();//
    this.direction = new THREE.Vector3();//第一人称运动的方向
    this.prevTime = performance.now();//上一次render的时间
    this.moveForward = false;//是否向前运行
    this.moveBackward = false;//是否向后运行
    this.moveLeft = false;//是否向左运行
    this.moveRight = false;//是否向右运行
    this.canJump = false;//是否可以跳
    this.spriteIsShow = 1;
    this.PointLock = true; //是否启动第一视角
}

// 初始化
Store3D.prototype.initMain = function() {
        this.setAxios();
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initBuilding();
        this.initLight();
        this.initControls();
        this.changeWindowSize();
        this.initAGVCar();
        this.initComposer();
        this.initSelectObject();
        this.initPointLockControl(this);
        this.initStats();
    },
    

    Store3D.prototype.start = function() {
        this.initMain();
        this.animate();
    },

    // 场景
    Store3D.prototype.initScene = function() {
        this.scene = new THREE.Scene();
    },
    // 相机
    Store3D.prototype.initCamera = function() {
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.x = 0;
        this.camera.position.y = 1600;
        this.camera.position.z = 1000;
        this.camera.lookAt(0, 0, 0);
        this.scene.add(this.camera);
    },
    // 渲染器
    Store3D.prototype.initRenderer = function() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true, //开启反锯齿。
            alpha: true, //是否可以设置背景色透明。
            logarithmicDepthBuffer: true //模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight); 
        this.renderer.setClearColor(0x39609B); 
        this.renderer.setPixelRatio(window.devicePixelRatio); //设置渲染器的分辨率与浏览器电脑本身的分辨率相同
        this.composer = new THREE.EffectComposer(this.renderer);
        let container = document.getElementById("container");
        container.appendChild(this.renderer.domElement);
    },
    // 灯光
    Store3D.prototype.initLight = function() {
        //环境光
        let ambient = new THREE.AmbientLight(0xffffff, 1); 
        ambient.position.set(0, 0, 0);
        this.addObject(ambient);
        //平行光
        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(0, 200, 0);
        this.addObject(directionalLight);
        //点光源
        let pointLight1 = new THREE.PointLight(0xffffff, 0.3);
        pointLight1.position.set(-500, 200, 0);
        this.addObject(pointLight1);
        let pointLight2 = new THREE.PointLight(0xffffff, 0.3);
        pointLight2.position.set(500, 200, 0);
        this.addObject(pointLight2);
    },

// 场景中添加物体 并添加到object物品集合
    Store3D.prototype.addObject = function(object) {
        this.scene.add(object);
        this.objects.push(object);
    },

    //建筑物
    Store3D.prototype.initBuilding = function() {
        let buildingData = buildingObjects.objects;
        for (let i = 0; i < buildingData.length; i++) {
            let object = buildingData[i];
            switch (object.objectType) {
                case "cube":
                    //Cube实例对象  跳转Cube.js
                    let cube = new Cube(object);
                    this.addObject(cube);
                    break;
                case "firstWallcube":
                    let cube2 = new Wall(object);
                    this.addObject(cube2);
                    break;
                case "reservoirArea":
                    let cube3 = new Area(object);
                    this.addObject(cube3)
                    break;
                case "route":
                    let line = Createline(object)
                        // console.log(line);
                    this.curve = line[1]
                    this.addObject(line[0]);
            }
        }
    },
    // 渲染函数
    Store3D.prototype.animate = function() {
        requestAnimationFrame(this.animate.bind(this));
        if(this.spriteIsShow != 1){
            this.firstPersonMove();
        }
        this.stats.update();
        // this.renderer.render(this.scene, this.camera);
        this.composer.render();
        TWEEN.update()
            // this.moveAgvCar()

        this.progess += 0.005;
        let point = this.curve.getPoint(this.progess + 0.005);
        let point1 = this.curve.getPoint(this.progess + 0.01);

        if (this.car && this.curve) {
            if (this.progess >= 1) {
                this.progess = 0;
            }
            // console.log(point);
            if (point && point.x) {
                this.car.position.set(point.x, 40, point.z)
                this.car.lookAt(point1.x, 40, point1.z);
            }
        }
    },
    // Store3D.prototype.moveAgvCar = function() {
    //     if (this.curve && this.car) {
    //         this.time = this.time + 1;
    //         let points = this.curve.getPoints(1000);
    //         let point = points[this.time];
    //         let point1 = points[this.time + 1];
    //         if (this.time >= 1000)
    //             this.time = 0;
    //         if (point && point.x) {

    //             this.car.position.set(point.x, 40, point.z);
    //             this.car.lookAt(point.x, 40, point.z);
    //         }
    //     }
    // },


    //自适应渲染
    Store3D.prototype.changeWindowSize = function() {
        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix();
        })
    },
    //初始化后期渲染
    Store3D.prototype.initComposer = function(){
        this.composer = new THREE.EffectComposer(this.renderer);
        this.renderPass = new THREE.RenderPass(this.scene,this.camera);
        this.composer.addPass(this.renderPass);
        this.outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth,window.innerHeight),this.scene,this.camera)
        this.composer.addPass(this.outlinePass);
    },
    //初始化性能控件 设置样式
    Store3D.prototype.initStats = function() {
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.up = '0px';
        document.body.appendChild(this.stats.domElement);
    },

    //相机控件
    Store3D.prototype.initControls = function() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.saveState();
        this.controls.enablePan = false;
        this.controls.maxPolarAngle = 1.5;
    },

    //隐藏性能控件
    Store3D.prototype.hideFPS = function() {
        if (this.stats.domElement.style.display == 'block') {
            this.stats.domElement.style.display = 'none';
        } else {
            this.stats.domElement.style.display = 'block'
        }
    },
    //初始化相机控件
    Store3D.prototype.reset = function() {
        this.controls.reset();
    },

    //发送Axios请求 并渲染库区
    Store3D.prototype.setAxios = function() {

        axios.defaults.timeout = '10000';
        axios({
                url: '../../data.json',
                method: 'get',
            })
            .then(res => {
                console.log(res.data);
                if (res.data != null) {
                    res.data.Areas.forEach(item => {

                        item.Stores.forEach(item2 => {
                            //库区XYZ轴位置
                            item2.Position = CommonFunction.setPosition(item2.Position, item.Position);
                            //echarts精灵模型 
                            new PieEcharts(item2, this);
                            new TempEcharts(item2, this);
                            //根据XYZ轴位置创建透明方块
                            item2.Groups.forEach(item3 => {
                                item3.Position = CommonFunction.setPosition(item3.Position, item2.Position)
                                this.opacityBox.push(item3);
                                let whiteCube = new GreenOpacityCube(item3, 'white', 0.5, false);

                                this.addObject(whiteCube);

                                //创建货架
                                let goods = new CreateGoods(item3)
                                this.addObject(goods);
                                item3.Bins.forEach(item4 => {
                                    //判断是否有同样的State样式
                                    let existGoods = this.getExistedGoodType(item4.State);
                                    // 执行获取当前盒子的定位函数
                                    let storeGoods = new StoreGoods(item3, item4);

                                    //如果没有同类型货物
                                    if (existGoods == null) {
                                        //创建这个类型
                                        let goods = storeGoods.create();
                                        //添加进object
                                        this.addObject(goods);
                                        // 添加进goodtypes
                                        this.goodTypes.push({ type: item4.State, object: goods });
                                    } else {
                                        //有同类型就克隆已有的类型样式
                                        let goods = storeGoods.clone(existGoods);
                                        this.addObject(goods);
                                    }
                                })
                            })
                        })
                    })
                }
            })
    },


    //获取是否已经生成同类型的货物
    Store3D.prototype.getExistedGoodType = function(state) {
        this.goodTypes.forEach(item => {
            if (item.type == state) {
                return item.object
            }
        })
        return null
    },




    //隐藏透明方块
    Store3D.prototype.HideOpacityBox = function() {
        this.objects.forEach(item => {
            if (item.name == 'OpacityCube' && item.visible == true) {
                item.visible = false
                item.material.opacity = 0;
            } else if (item.name == 'OpacityCube' && item.visible == false) {
                item.visible = true
                item.material.opacity = 0.5;
            }
        })
    },

    //温度数据展示
    Store3D.prototype.changEcharts = function() {
        if (this.tmpIsShow == 1) {
            this.SpriteObject.forEach(item => {
                if (item.type == 'pieEcharts') {
                    this.addObject(item);
                } else if (item.type == 'Temperature') {
                    this.removeObject(item.id)
                }
            })
            this.tmpIsShow = 0;
        } else {
            this.SpriteObject.forEach(item => {
                if (item.type == 'Temperature') {
                    this.addObject(item);
                } else if (item.type == 'pieEcharts') {
                    this.removeObject(item.id)
                }
            })
            this.tmpIsShow = 1;
        }
    },

    //根据ID删除属性
    Store3D.prototype.removeObject = function(nameorid) {
        for (let i = 0; i < this.objects.length; i++) {
            let tmpObject = this.objects[i];
            if (tmpObject.name == nameorid || tmpObject.id == nameorid) {
                this.objects.splice(i, 1);
                this.scene.remove(tmpObject);
            }

        }
    },

    //鼠标点击事件
    Store3D.prototype.initSelectObject = function() {
        new ClickSelect(this.camera, this.scene,this.outlinePass);
    },

    //添加AGV小车
    Store3D.prototype.initAGVCar = function() {
        let car = new AGVCar();
        car.then((res) => {
            this.car = res;
            this.addObject(res);
        })
    },

    //删除库和架子 准备显示占有率
    Store3D.prototype.showSpace = function() {
        if (!this.isshowSpace) {
            this.objects.forEach(item => {
                if (item.type == 'StoreGoods' || item.type == 'StoreShelf') {
                    this.scene.remove(item)
                        // console.log(234);
                }
            })
            this.isshowSpace = true;
            this.showSpaces()
        } else {
            this.objects.forEach(item => {
                if (item.type == 'StoreGoods' || item.type == 'StoreShelf') {
                    this.scene.add(item)
                } else if (item.name == 'Occupancy') {
                    this.scene.remove(item)
                }
            })
            this.isshowSpace = false;
        }
    },
    //显示占有率
    Store3D.prototype.showSpaces = function() {
        this.opacityBox.forEach((item) => {
            let a = item.Height * 0.75;
            item.Position.Y = 1;
            let aa = new GreenOpacityCube(item, 'green', 0.4, true);

            let position = {
                y: a / 2,
                x: item.Position.X,
                z: item.Position.Z,
            };
            let scale = {
                x: 1,
                y: 1,
                z: 1
            }
            this.addObject(aa)
            aa.scale.y = 0.001;
            let tween1 = new TWEEN.Tween(aa.position).to(position, 1000).easing(TWEEN.Easing.Quadratic.In);

            let tween2 = new TWEEN.Tween(aa.scale).to(scale, 1000).easing(TWEEN.Easing.Quadratic.In);

            tween1.start();
            tween2.start();
        })
    },
    //更改背景
    Store3D.prototype.changebg = function() {
        this.renderer.setClearColor(0x000000);
        // this.renderer.setClearColor(0x39609B);
    }



      /**
     * 初始化PointLockControl
     * 设置鼠标控制
     */
       Store3D.prototype.initPointLockControl=function(object){
        this.lockcontrols = new THREE.PointerLockControls( this.camera );
        this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

        var onKeyDown = function ( event ) {
            switch ( event.keyCode ) {

                case 87: // w
                    object.moveForward = true;
                    break;

                case 65: // a
                    object.moveLeft = true;
                    break;

                case 83: // s
                    object.moveBackward = true;
                    break;

                case 68: // d
                    object.moveRight = true;
                    break;

                case 32: // space
                    if ( object.canJump === true ) object.velocity.y += 350;
                    object.canJump = false;
                    break;

            }


        };
        var onKeyUp = function ( event ) {

            switch ( event.keyCode ) {

                case 87: // w
                    object.moveForward = false;
                    break;

                case 65: // a
                    object.moveLeft = false;
                    break;

                case 83: // s
                    object.moveBackward = false;
                    break;

                case 68: // d
                    object.moveRight = false;
                    break;
            }
        };
        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );
    },

    // 鼠标锁定
    Store3D.prototype.lockControl=function() {
        if(this.PointLock){
            this.objects.forEach(item =>{
                if(item.type == 'pieEcharts' || item.type == 'Temperature'){
                    this.scene.remove(item)
                }
            });
            this.spriteIsShow = 0;
            this.camera.position.y = 100;
            this.camera.lookAt(0,100,0);
            // console.log(this.lockcontrols);
            this.lockcontrols.getObject().position.x =0;
            this.lockcontrols.getObject().position.y =100;
            this.lockcontrols.getObject().position.z =580;
            this.lockcontrols.lock();
            this.PointLock = false;
            this.scene.add(this.lockcontrols.getObject())
        }else{
            this.camera.position.y = 500;
            this.PointLock = true;
        }
        
    },

    /**
     * 第一人称视角移动
     */
    Store3D.prototype.firstPersonMove=function(){

        if(!this.PointLock){
            // this.raycaster.ray.origin.copy( this.lockcontrols.getObject().position );
            // this.raycaster.ray.origin.y -= 10;
            // var intersections = this.raycaster.intersectObjects( this.objects );
            // var onObject = intersections.length > 0;
            var time = performance.now();
            var delta = ( time - this.prevTime ) / 1000;

            this.velocity.x -= this.velocity.x * 10.0 * delta;//减速因子

            this.velocity.z -= this.velocity.z * 10.0 * delta;
            this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
            this.direction.x = Number( this.moveLeft ) - Number( this.moveRight );
            this.direction.normalize(); // this ensures consistent movements in all directions
            if ( this.moveForward || this.moveBackward ) this.velocity.z -= this.direction.z * 2000.0 * delta;//注意velocity向量，这是一个缓冲值，为了保证鼠标抬起后，场景不直接暂停，而是有一个简短的过渡效果：
            if ( this.moveLeft || this.moveRight ) this.velocity.x -= this.direction.x * 2000.0 * delta;

            // if ( onObject === true ) {

            //     this.velocity.y = Math.max( 0, this.velocity.y );
            //     this.canJump = true;

            // }
            this.lockcontrols.getObject().translateX( this.velocity.x * delta );
            this.lockcontrols.getObject().position.y += ( this.velocity.y * delta ); // new behavior
            this.lockcontrols.getObject().translateZ( this.velocity.z * delta );
            if ( this.lockcontrols.getObject().position.y < 100) {

                this.velocity.y = 0;
                this.lockcontrols.getObject().position.y = 100;
                this.canJump = true;
            }
            this.prevTime = time;
        }

            
    }
