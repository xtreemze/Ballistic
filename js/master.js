// require('./babylon.min.js');
//
const BABYLON = window.BABYLON;
//
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);
//
BABYLON.SceneLoader.Load('', './js/ballistic.babylon', engine, (scene) => {
  scene.executeWhenReady(() => {
    window.scene = scene;
    const greenMesh = scene.getMeshByID('greenCube');
    const redMesh = scene.getMeshByID('redCube');
    const greenCube = scene._physicsEngine._impostors[0];
    const redCube = scene._physicsEngine._impostors[1];
    redCube.setLinearVelocity(new BABYLON.Vector3(0, 1, 0));
    redCube.setAngularVelocity(new BABYLON.Quaternion(10, 0, 0, 0));
    greenCube.applyImpulse(new BABYLON.Vector3(0, 15, 0),
      greenMesh.getAbsolutePosition());
    greenMesh.actionManager = new BABYLON.ActionManager(scene);
    redMesh.actionManager = new BABYLON.ActionManager(scene);
    //
    greenMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
      trigger: BABYLON.ActionManager.OnPickTrigger,
      parameter: greenMesh,
    }, () => {
      greenCube.applyImpulse(new BABYLON.Vector3(0, 15, 0),
        greenMesh.getAbsolutePosition());
    }));
    //
    //
    redMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
      trigger: BABYLON.ActionManager.OnPickTrigger,
      parameter: redMesh,
    }, () => {
      redCube.applyImpulse(new BABYLON.Vector3(0, 15, 0),
        redMesh.getAbsolutePosition());
    }));
    //
    scene.activeCamera.attachControl(canvas);
    engine.runRenderLoop(() => {
      scene.render();
    });
  });
  return scene;
});
window.addEventListener('resize', () => {
  engine.resize();
});
