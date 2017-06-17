const BABYLON = window.BABYLON;
//
if (BABYLON.Engine.isSupported()) {
  window.canvas = document.getElementById('renderCanvas');
  window.engine = new BABYLON.Engine(window.canvas, true);
  BABYLON.SceneLoader.Load('', './js/ballistic.babylon', window.engine, (
      newScene) => {
      // newScene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON
      //   .OimoJSPlugin());
      // Wait for textures and shaders to be ready
      newScene.executeWhenReady(() => {
        // Attach camera to canvas inputs
        newScene.activeCamera.attachControl(window.canvas);
        // Once the scene is loaded, just register a render loop to render it
        window.engine.runRenderLoop(() => {
          newScene.render();
        });
      });
    },
    /*(progress) => {
      // To do: give progress feedback to user
    }*/
  );
}
window.addEventListener('resize', () => {
  window.engine.resize();
});
