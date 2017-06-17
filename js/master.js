const BABYLON = window.BABYLON;
//
if (BABYLON.Engine.isSupported()) {
  window.canvas = document.getElementById('renderCanvas');
  window.engine = new BABYLON.Engine(window.canvas, true);
  BABYLON.SceneLoader.Load('', './js/ballistic.babylon', window.engine, (
    scene) => {
    // Wait for textures and shaders to be ready
    scene.executeWhenReady(() => {
      // Attach camera to canvas inputs
      scene.activeCamera.attachControl(window.canvas);
      // scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON
      //   .OimoJSPlugin());
      // Once the scene is loaded, just register a render loop to render it
      window.engine.runRenderLoop(() => {
        scene.render();
      });
    });
  });
}
window.addEventListener('resize', () => {
  window.engine.resize();
});
