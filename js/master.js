// require('pepjs');
// window.CANNON = require('cannon');
// window.OIMO = require('oimo');
// const BABYLON = require('babylonjs');
window.BABYLON = BABYLON;
//
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);
//
BABYLON.SceneLoader.Load('', './js/ballistic.babylon', engine, (scene) => {
  scene.executeWhenReady(() => {
    window.greenMesh = scene.getMeshByID('greenCube');
    window.redMesh = scene.getMeshByID('redCube');
    window.ground = scene.getMeshByID('ground');
    window.greenCube = window.greenMesh.physicsImpostor;
    window.redCube = window.redMesh.physicsImpostor;
    window.scene = scene;
    window.lights = scene.lights[0];
    window.shadowGenerator = new BABYLON.ShadowGenerator(1024,
      window.lights);
    window.shadowGenerator.usePoissonSampling = true;
    window.shadowGenerator.getShadowMap()
      .renderList.push(window.greenMesh);
    window.shadowGenerator.getShadowMap()
      .renderList.push(window.redMesh);
    window.redCube.setLinearVelocity(new BABYLON.Vector3(0, 1, 0));
    window.redCube.setAngularVelocity(new BABYLON.Quaternion(10,
      0, 0, 0));
    window.greenCube.applyImpulse(new BABYLON.Vector3(0, 15, 0),
      window.greenMesh.getAbsolutePosition());
    window.greenMesh.actionManager = new BABYLON.ActionManager(
      scene);
    window.redMesh.actionManager = new BABYLON.ActionManager(
      scene);
    //
    window.greenMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
      trigger: BABYLON.ActionManager.OnPickTrigger,
      parameter: window.greenMesh,
    }, () => {
      window.greenCube.applyImpulse(new BABYLON.Vector3(0,
        15, 0), window.greenMesh.getAbsolutePosition());
    }));
    //
    //
    window.redMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
      trigger: BABYLON.ActionManager.OnPickTrigger,
      parameter: window.redMesh,
    }, () => {
      window.redCube.applyImpulse(new BABYLON.Vector3(0, 15,
        0), window.redMesh.getAbsolutePosition());
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
