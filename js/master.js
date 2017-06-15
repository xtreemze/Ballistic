const BABYLON = window.BABYLON;
//
if (BABYLON.Engine.isSupported()) {
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);
  const gravityVector = new BABYLON.Vector3(0, -9.81, 0);
  const physicsPlugin = new BABYLON.OimoJSPlugin();
  scene.enablePhysics(gravityVector, physicsPlugin);
  BABYLON.SceneLoader.Load('', './js/ballistic.babylon', engine, (
    newScene) => {
    // Wait for textures and shaders to be ready
    newScene.executeWhenReady(() => {
      // Attach camera to canvas inputs
      newScene.activeCamera.attachControl(canvas);
      // Once the scene is loaded, just register a render loop to render it
      engine.runRenderLoop(() => {
        newScene.render();
      });
    });
  }, (progress) => {
    // To do: give progress feedback to user
  });
}
