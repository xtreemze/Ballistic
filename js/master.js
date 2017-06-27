// require('pepjs');
// window.CANNON = require('cannon');
// window.OIMO = require('oimo');
// const BABYLON = require('babylonjs');
const BABYLON = window.BABYLON;
//
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true, null, false);
//
BABYLON.SceneLoader.Load('', './js/ballistic.babylon', engine, (scene) => {
  // scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.OimoJSPlugin());
  window.scene = scene;
  window.scene.workerCollisions = true;
  const camera = scene.activeCamera;
  window.camera = camera;
  camera.touchMoveSensibility = 150;
  camera.touchAngularSensibility = 60000;
  camera.angularSensibility = 2500;
  camera.speed = 0.5;
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
    window.button = BABYLON.Mesh.CreateBox('button', 0.01, scene);
    window.button.material = window.redMesh.material;
    window.button.parent = camera; // The weapon will move with the player camera
    window.button.position = new BABYLON.Vector3(0, -0.04, 0.1);
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
      if (!window.newMesh === false) window.newMesh.dispose();
      window.newMesh = BABYLON.Mesh.CreateBox('newMesh', 2,
        scene);
      window.newMesh.material = window.redMesh.material;
      // window.newMesh.parent = window.button;
      window.newMesh.rotation.copyFrom(window.camera.rotation);
      window.newMesh.position.copyFrom(window.button.absolutePosition);
      window.newMesh.position.addInPlace(new BABYLON.Vector3(
        0, -2, 0));
      window.forwardLocal = new BABYLON.Vector3(0, 0, 25);
      // window.newMesh.rotation = window.forwardGlobal;
      // const cam = camera.globalPosition;
      // const target = camera.getTarget();
      window.newMesh.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 1 });
      window.newImpostor = window.newMesh.physicsImpostor;
      const speed = window.newMesh.getDirection(window.forwardLocal);
      window.newImpostor.setLinearVelocity(speed);
      // window.newImpostor.setLinearVelocity(new BABYLON.Vector3(
      //   5, 0, 0));
      window.newMesh.checkCollisions = true;
      // window.newImpostor.setLinearVelocity(new BABYLON.Vector3
      //   .Cross(cam, target) * new BABYLON.Vector3(0, 0,
      //     10));
      //
    }));
    scene.activeCamera.attachControl(canvas, true);
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
