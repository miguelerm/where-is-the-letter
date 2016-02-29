/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

(function (window) {

    var dpr, config, sesion;

    dpr = window.devicePixelRatio;
    config = {
        ancho: window.innerWidth * dpr,
        alto: window.innerHeight * dpr,
        cantidad: 8,
        tamanio: 40
    };

    config.grados = 360 / config.cantidad;
    config.radio = (config.ancho > config.alto ? config.alto : config.ancho) / 4

    sesion = {
        figuras: []
    };

    var game = new Phaser.Game(config.ancho, config.alto, Phaser.CANVAS, 'game-container', {
        create: create
    });


    function create() {

        var x, y, centerX, centerY, graphics, i, radianes, grados, figura, colorFondo, hitArea;

        centerX = game.world.centerX;
        centerY = game.world.centerY;

        graphics = game.add.graphics();
        graphics.lineStyle(1, 0xffffff, 1);
        graphics.beginFill(0x8c8c8c, 1)


        radianes = Math.PI / 180;

        for (i = 1; i <= config.cantidad; i += 1) {
            
            grados = config.grados * i * radianes;

            x = Math.cos(grados) * config.radio + centerX;
            y = Math.sin(grados) * config.radio + centerY;

            hitArea = new Phaser.Rectangle(x, y, config.tamanio, config.tamanio);
            if (i % 4 == 0) {
                colorFondo = 0x8c8c8c;
                figura = new Phaser.Circle(x, y, config.tamanio);
                hitArea.x -= config.tamanio / 2;
                hitArea.y -= config.tamanio / 2;
            }
            else if (i % 4 == 1) {
                colorFondo = 0xff0000;
                figura = new Phaser.Rectangle(x, y, config.tamanio, config.tamanio);
            } else if (i % 4 == 2) {
                colorFondo = 0x00ff00;
                figura = new Phaser.Ellipse(x, y, (config.tamanio / 1.5), (config.tamanio / 2));
                hitArea.x -= config.tamanio / 1.5;
                hitArea.y -= config.tamanio / 2;
                hitArea.width = (config.tamanio / 1.5) * 2;
            } else if (i % 4 == 3) {
                colorFondo = 0x0000ff;
                var top = new Phaser.Point(x + Math.ceil(config.tamanio / 2), y);
                var left = new Phaser.Point(x, y + config.tamanio);
                var right = new Phaser.Point(x + config.tamanio, y + config.tamanio);
                figura = new Phaser.Polygon([top, left, right]);
            }
                        
            // graphics.beginFill(0xffffff, 0.5);
            // graphics.drawShape(hitArea);
            
            graphics.beginFill(colorFondo, 1);
            graphics.drawShape(figura);  
            sesion.figuras.push(hitArea);
        }

        graphics.endFill();

        game.input.onTap.add(onTap);
    }

    function onTap(e) {
        var i, figura;
        for (i = 0; i < sesion.figuras.length; i += 1) {
            figura = sesion.figuras[i];
            if (figura.contains(e.x, e.y)) {
                console.log('hit');
                return;
            }
        }
    }

})(window);