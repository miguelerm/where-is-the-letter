/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

(function (window) {

    var dpr, config, sesion;

    dpr = window.devicePixelRatio;
    config = {
        ancho: window.innerWidth * dpr,
        alto: window.innerHeight * dpr,
        cantidad: 8,
        tamanio: 40,
        letras: 'abcdefghijklmnñopqrstuvwxyz',
        numeros: '1234567890',
        figuras: [
            { nombre: 'círculo',    color: 0x8c8c8c, factory: crearCirculo    },
            { nombre: 'rectángulo', color: 0xff0000, factory: crearRectangulo },
            { nombre: 'óvalo',      color: 0x00ff00, factory: crearOvalo      },
            { nombre: 'triángulo',  color: 0x0000ff, factory: crearTriangulo  }
        ]
    };

    config.grados = 360 / config.cantidad;
    config.radio = (config.ancho > config.alto ? config.alto : config.ancho) / 4

    sesion = {
        figuras: []
    };

    var game = new Phaser.Game(config.ancho, config.alto, Phaser.CANVAS, 'game-container', {
        create: crearJuego
    });

    function crearJuego() {

        var x, y, centerX, centerY, graphics, i, radianes, grados, figura, colorFondo, hitArea, cantidadFiguras;

        centerX = game.world.centerX;
        centerY = game.world.centerY;

        graphics = game.add.graphics();
        graphics.lineStyle(1, 0xffffff, 1);
        graphics.beginFill(0x8c8c8c, 1);
        
        radianes = Math.PI / 180;

        cantidadFiguras = config.figuras.length;

        for (i = 1; i <= config.cantidad; i += 1) {
            
            grados = config.grados * i * radianes;

            x = Math.cos(grados) * config.radio + centerX;
            y = Math.sin(grados) * config.radio + centerY;

            var fixedIndex = i % cantidadFiguras;
            var configuracionFigura = config.figuras[fixedIndex];

            var figuraShareArea = configuracionFigura.factory(x, y, config.tamanio);
            
            hitArea = figuraShareArea[0];
            figura =  figuraShareArea[1];
            colorFondo = configuracionFigura.color;
            
            graphics.beginFill(colorFondo, 1);
            graphics.drawShape(figura);  
            sesion.figuras.push(hitArea);
        }

        graphics.endFill();

        game.input.onTap.add(onTap);
    }
    
    function crearCirculo(x, y, tamanio) {
        var factor = tamanio / 2;
        
        var hitArea = new Phaser.Rectangle(x - factor, y - factor, tamanio, tamanio);
        var figura = new Phaser.Circle(x , y, config.tamanio);
        return [hitArea, figura];
    }
    
    function crearRectangulo(x, y, tamanio) {
        var figura = new Phaser.Rectangle(x, y, tamanio, tamanio);
        return [figura, figura];
    }
    
    function crearOvalo(x, y, tamanio) {
        var ancho = tamanio / 1.5;
        var alto = tamanio / 2;
        var hitAreaWidth = (tamanio / 1.5) * 2;
        
        var hitArea = new Phaser.Rectangle(x - ancho, y - alto, hitAreaWidth, tamanio);
        var figura = new Phaser.Ellipse(x, y, ancho, alto);
        return [hitArea, figura];
    }
    
    function crearTriangulo(x, y, tamanio) {
        var top = new Phaser.Point(x + Math.ceil(tamanio / 2), y);
        var left = new Phaser.Point(x, y + tamanio);
        var right = new Phaser.Point(x + tamanio, y + tamanio);
        
        var hitArea = new Phaser.Rectangle(x, y, config.tamanio, config.tamanio);
        var figura = new Phaser.Polygon([top, left, right]);
        return [hitArea, figura];
    }

    function onTap(e) {
        var i, figura;
        for (i = 0; i < sesion.figuras.length; i += 1) {
            figura = sesion.figuras[i];
            if (figura.contains(e.x, e.y)) {
                console.log('hit ' + figura.toString());
                return;
            }
        }
    }

})(window);