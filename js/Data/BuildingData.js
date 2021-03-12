let buildingObjects = {
    objects: [{
        objectName: 'floor',
        objectType: 'cube',
        length: 3400,
        width: 1200,
        height: 1,
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0,
        },
        style: {
            color: 0x5F7480,
            image: '../../img/floor.jpg',
            imgheight: 128,
            imgwidth: 128,
            ifRepeat: 1,
        }
    }, {
        objectName: 'wall',
        objectType: 'cube',
        length: 3400,
        width: 300,
        height: 20,
        rotation: {
            x: Math.PI / 2,
            y: 0,
            z: 0,
        },
        position: {
            x: 0,
            y: 150,
            z: -600
        },
        style: {
            color: 0x5F7480,
        }
    }, {
        objectName: 'firstWall',
        objectType: 'firstWallcube',
        length: 3400,
        width: 300,
        height: 20,
        rotation: {
            x: Math.PI / 2,
            y: 0,
            z: 0,
        },
        position: {
            x: 0,
            y: 150,
            z: 600
        },
        style: {
            color: 0x5F7480,
        },
        children: [{
            name: 'window',
            length: 180,
            width: 200,
            height: 20,
            position: {
                x: -1000,
                y: 150,
                z: 600,
            },
            rotation: {
                x: Math.PI / 2,
                y: 0,
                z: 0
            },
        }, {
            name: 'window',
            length: 180,
            width: 200,
            height: 20,
            position: {
                x: 1000,
                y: 150,
                z: 600,
            },
            rotation: {
                x: Math.PI / 2,
                y: 0,
                z: 0
            },
        }, {
            name: 'door',
            length: 400,
            width: 240,
            height: 20,
            position: {
                x: 100,
                y: 120,
                z: 600,
            },
            rotation: {
                x: Math.PI / 2,
                y: 0,
                z: 0
            },
        }]
    }, {
        objectName: 'wall',
        objectType: 'cube',
        length: 1200,
        width: 300,
        height: 20,
        rotation: {
            x: Math.PI / 2,
            y: 0,
            z: Math.PI / 2,
        },
        position: {
            x: 1700,
            y: 150,
            z: 0
        },
        style: {
            color: 0x5F7480,
        }
    }, {
        objectName: 'wall',
        objectType: 'cube',
        length: 1200,
        width: 300,
        height: 20,
        rotation: {
            x: Math.PI / 2,
            y: 0,
            z: Math.PI / 2,
        },
        position: {
            x: -1700,
            y: 150,
            z: 0
        },
        style: {
            color: 0x5F7480,
        }
    }, {
        name: '窗左贴图',
        objectType: 'cube',
        length: 180,
        width: 200,
        height: 20,
        position: {
            x: -1000,
            y: 150,
            z: 600,
        },
        rotation: {
            x: Math.PI / 2,
            y: 0,
            z: 0
        },
        style: {
            image: '../../img/window.png',
            transparent: true,
            opacity: 1,
        }
    }, {
        name: '窗右贴图',
        objectType: 'cube',
        length: 180,
        width: 200,
        height: 20,
        position: {
            x: 1000,
            y: 150,
            z: 600,
        },
        rotation: {
            x: Math.PI / 2,
            y: 0,
            z: 0
        },
        style: {
            image: '../../img/window.png',
            transparent: true,
            opacity: 1,
        }
    }, {
        name: '门贴图',
        objectType: 'cube',
        length: 200,
        width: 240,
        height: 20,
        position: {
            x: 000,
            y: 120,
            z: 600,
        },
        rotation: {
            x: Math.PI / 2,
            y: 0,
            z: 0
        },
        style: {
            image: '../../img/door_left.png',
            // transparent: true,
            // opacity: 1,
        }
    }, {
        name: '门贴图',
        objectType: 'cube',
        length: 200,
        width: 240,
        height: 20,
        position: {
            x: 200,
            y: 120,
            z: 600,
        },
        rotation: {
            x: Math.PI / 2,
            y: 0,
            z: 0
        },
        style: {
            image: '../../img/door_right.png',
        }
    }, {
        name: '库区文字加边框',
        objectType: 'reservoirArea',
        width: 8,
        height: 1000,
        topheight: 1600,
        top: {
            position: {
                z: -500,
                x: -800,
            },
            rotation: {
                z: Math.PI / 2
            }
        },
        left: {
            position: {
                x: -1600
            },
        },
        right: {
            position: {
                x: 000
            },
        },
        bottom: {
            position: {
                z: 500,
                x: -800,
            },
            rotation: {
                z: Math.PI / 2
            }
        },
        position: {
            x: 0,
            y: 5,
            z: 0
        },
        font: {
            text: '库区1',
            position: {
                x: -950,
                y: 5,
                z: 550,
            }
        }

    }, {
        name: '库区文字加边框',
        objectType: 'reservoirArea',
        width: 8,
        height: 500,
        topheight: 1400,
        top: {
            position: {
                z: -500,
                x: 900,
            },
            rotation: {
                z: Math.PI / 2
            }
        },
        left: {
            position: {
                z: -250,
                x: 200
            },
        },
        right: {
            position: {
                z: -250,
                x: 1600
            },
        },
        bottom: {
            position: {
                z: 0,
                x: 900,
            },
            rotation: {
                z: Math.PI / 2
            }
        },
        position: {
            x: 0,
            y: 5,
            z: 0
        },
        font: {
            text: '库区2',
            position: {
                x: 800,
                y: 5,
                z: 30,
            }
        }

    }, {
        name: '库区文字加边框',
        objectType: 'reservoirArea',
        width: 8,
        height: 500,
        topheight: 1400,
        top: {
            position: {
                z: 100,
                x: 900,
            },
            rotation: {
                z: Math.PI / 2
            }
        },
        left: {
            position: {
                z: 350,
                x: 200
            },
        },
        right: {
            position: {
                z: 350,
                x: 1600
            },
        },
        bottom: {
            position: {
                z: 600,
                x: 900,
            },
            rotation: {
                z: Math.PI / 2
            }
        },
        position: {
            x: 0,
            y: 5,
            z: 0
        },
        font: {
            text: '库区3',
            position: {
                x: 800,
                y: 5,
                z: 580,
            }
        }
    }, {
        //AGV小车路径
        objName: "AGVRoute",
        objectType: "route",
        points: [
            { x: -100, y: 1, z: 50 },
            { x: -500, y: 1, z: 50 },
            { x: -800, y: 1, z: 50 },
            { x: -800, y: 1, z: 420 },
            { x: -1400, y: 1, z: 420 },
            { x: -1400, y: 1, z: 480 },
            { x: -100, y: 1, z: 480 },
            { x: -100, y: 1, z: 50 }
        ]
    }]
}