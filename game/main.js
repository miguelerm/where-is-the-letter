(function(window) {
 
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
  
  var game = new Phaser.Game(config.ancho, config.alto, Phaser.CANVAS, 'game-container', { create: create });
  
  
  function create() {
    
    var x, y, centerX, centerY, graphics, i, radianes, grados;

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
      graphics.drawCircle(x, y, config.tamanio);
      
      sesion.figuras.push(new Phaser.Circle(x, y, config.tamanio));
      
    }
    
    graphics.endFill();
    
    console.log(sesion.figuras);
    
  }
  
})(window);