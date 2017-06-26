// require('pepjs');
// window.CANNON = require('cannon');
// window.OIMO = require('oimo');
// const BABYLON = require('babylonjs');
const BABYLON = window.BABYLON;
//
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);
let cubeIndex = 1;
//
BABYLON.SceneLoader.Load('', './js/ballistic.babylon', engine, (scene) => {
  // scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.OimoJSPlugin());
  window.scene = scene;
  window.scene.workerCollisions = true;
  const camera = scene.activeCamera;
  window.camera = camera;
  camera.touchMoveSensibility = 200;
  camera.touchAngularSensibility = 60000;
  camera.angularSensibility = 2500;
  camera.speed = 0.5;
  window.button = scene.getMeshByID('button');
  scene.executeWhenReady(() => {
    /*

    d888888b .88b  d88. d8888b.  .d88b.  .d8888. d888888b  .d88b.  d8888b. .d8888.
      `88'   88'YbdP`88 88  `8D .8P  Y8. 88'  YP `~~88~~' .8P  Y8. 88  `8D 88'  YP
       88    88  88  88 88oodD' 88    88 `8bo.      88    88    88 88oobY' `8bo.
       88    88  88  88 88~~~   88    88   `Y8b.    88    88    88 88`8b     `Y8b.
      .88.   88  88  88 88      `8b  d8' db   8D    88    `8b  d8' 88 `88. db   8D
    Y888888P YP  YP  YP 88       `Y88P'  `8888Y'    YP     `Y88P'  88   YD `8888Y'

    */
    window.greenMesh = scene.getMeshByID('greenCube');
    window.redMesh = scene.getMeshByID('redCube');
    window.greenMesh2 = scene.getMeshByID('greenCube2');
    window.redMesh2 = scene.getMeshByID('redCube2');
    window.greenCube = window.greenMesh.physicsImpostor;
    window.redCube = window.redMesh.physicsImpostor;
    window.greenCube2 = window.greenMesh2.physicsImpostor;
    window.redCube2 = window.redMesh2.physicsImpostor;
    window.button.parent = camera; // The weapon will move with the player camera
    window.button.position = new BABYLON.Vector3(0, -0.2, 0.3);
    // window.lights = scene.lights[0];
    // window.shadowGenerator = new BABYLON.ShadowGenerator(1024,
    //   window.lights);
    // window.shadowGenerator.usePoissonSampling = true;
    // window.shadowGenerator.getShadowMap()
    //   .renderList.push(window.greenMesh);
    // window.shadowGenerator.getShadowMap()
    //   .renderList.push(window.redMesh);
    // window.redCube.setLinearVelocity(new BABYLON.Vector3(0, 1, 0));
    // window.redCube.setAngularVelocity(new BABYLON.Quaternion(10,
    //   0, 0, 0));
    // window.greenCube.applyImpulse(new BABYLON.Vector3(0, 15, 0),
    //   window.greenMesh.getAbsolutePosition());
    window.button.actionManager = new BABYLON.ActionManager(scene);
    window.greenMesh.actionManager = new BABYLON.ActionManager(
      scene);
    window.redMesh.actionManager = new BABYLON.ActionManager(
      scene);
    window.greenMesh2.actionManager = new BABYLON.ActionManager(
      scene);
    window.redMesh2.actionManager = new BABYLON.ActionManager(
      scene);
    //
    window.forceUp = function forceUp(mesh, cube) {
      mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnPickTrigger,
        parameter: mesh,
      }, () => {
        cube.applyImpulse(new BABYLON.Vector3(0, 20, 0),
          mesh.getAbsolutePosition());
      }));
    };
    window.forceUp(window.redMesh, window.redCube);
    window.forceUp(window.redMesh2, window.redCube2);
    window.forceUp(window.greenMesh, window.greenCube);
    window.forceUp(window.greenMesh2, window.greenCube2);
    //
    window.button.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
      trigger: BABYLON.ActionManager.OnPickTrigger,
      parameter: window.button,
    }, () => {
      window.newMesh = BABYLON.Mesh.CreateBox('newMesh', 3,
        scene);
      window.newMesh.checkCollisions = true;
      window.newMesh.material = window.greenMesh.material;
      window.newMesh.parent = window.button;
      window.newMesh.position = new BABYLON.Vector3(0, 0, 4);
      window.newMesh.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 1 });
      // window.greenCube.setDeltaPosition(window.button.position);
      // window.greenCube.setLinearVelocity(new BABYLON.Vector3(
      //   30, 0, 0));
      // window.newImpostor = window.newMesh.physicsImpostor;
      // window.newImpostor.setLinearVelocity(new BABYLON.Vector3(
      //   0, 0, 4));
      cubeIndex += 1;
    }));
    //
    scene.activeCamera.attachControl(canvas);
    engine.runRenderLoop(
      () => {
        scene.render();
      });
  });
  return scene;
});
window.addEventListener('resize', () => {
  engine.resize();
});
