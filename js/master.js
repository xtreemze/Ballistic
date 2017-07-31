const BABYLON = window.BABYLON;
//
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);
//
BABYLON.SceneLoader.Load('', './js/ballistic.babylon', engine, (scene1) => {
  const scene = scene1;
  window.scene = scene1;
  const gravityVector = new BABYLON.Vector3(0, -9.81, 0);
  const physicsPlugin = new BABYLON.OimoJSPlugin();
  // const physicsPlugin = new BABYLON.CannonJSPlugin();
  scene.enablePhysics(gravityVector, physicsPlugin);
  // scene.getPhysicsEngine()
  //   .setGravity(new BABYLON.Vector3(0, -9.81, 0));
  scene.workerCollisions = true;
  // scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
  // scene.fogDensity = 1;
  // scene.fogStart = 0;
  // scene.fogEnd = 320;
  // scene.clearColor = new BABYLON.Color3(0, 0.259, 0.841);
  // scene.fogColor = new BABYLON.Color3(0.2, 0.4, 0.8);
  const camera = scene.activeCamera;
  window.inputManager = camera.inputs;
  // window.inputManager.clear();
  // window.inputManager.addDeviceOrientation();
  // window.inputManager.addKeyboard();
  // window.inputManager.addMouse();
  // window.inputManager.addTouch();
  // window.inputManager.addVirtualJoystick();
  // window.inputManager.attached.touch.detachControl();
  // window.inputManager.removeByType('FreeCameraKeyboardMoveInput');
  // window.inputManager.attached.mouse.detachControl();
  camera.fov = 1.65;
  // //
  camera.inertia = 0.72;
  camera.speed = 2;
  camera.angularSensibility = 1400;
  camera.touchMoveSensibility = 150;
  camera.touchAngularSensibility = 7400;
  scene.executeWhenReady(() => {
    /*

    d888888b .88b  d88. d8888b.  .d88b.  .d8888. d888888b  .d88b.  d8888b. .d8888.
      `88'   88'YbdP`88 88  `8D .8P  Y8. 88'  YP `~~88~~' .8P  Y8. 88  `8D 88'  YP
       88    88  88  88 88oodD' 88    88 `8bo.      88    88    88 88oobY' `8bo.
       88    88  88  88 88~~~   88    88   `Y8b.    88    88    88 88`8b     `Y8b.
      .88.   88  88  88 88      `8b  d8' db   8D    88    `8b  d8' 88 `88. db   8D
    Y888888P YP  YP  YP 88       `Y88P'  `8888Y'    YP     `Y88P'  88   YD `8888Y'

    */
    const greenMesh = scene.getMeshByID('greenCube');
    // const iceberg = scene.getMeshByID('iceberg');
    const redMesh = scene.getMeshByID('redCube');
    const greenMesh2 = scene.getMeshByID('greenCube2');
    const redMesh2 = scene.getMeshByID('redCube2');
    const ice = scene.getMeshByID('ice');
    const greenCube = greenMesh.physicsImpostor;
    const redCube = redMesh.physicsImpostor;
    const greenCube2 = greenMesh2.physicsImpostor;
    const redCube2 = redMesh2.physicsImpostor;
    const button = BABYLON.Mesh.CreateBox('button', 0.8, scene);
    window.button = button;
    button.material = redMesh.material;
    button.parent = camera; // The weapon will move with the player camera
    button.position = new BABYLON.Vector3(0, -2, 4);
    const button2 = BABYLON.Mesh.CreateBox('button2', 0.7, scene);
    button2.material = redMesh.material;
    button2.parent = camera; // The weapon will move with the player camera
    button2.position = new BABYLON.Vector3(0, -2, 6);
    button.actionManager = new BABYLON.ActionManager(scene);
    greenMesh.actionManager = new BABYLON.ActionManager(scene);
    redMesh.actionManager = new BABYLON.ActionManager(scene);
    greenMesh2.actionManager = new BABYLON.ActionManager(scene);
    redMesh2.actionManager = new BABYLON.ActionManager(scene);
    //
    const lakeSound = new BABYLON.Sound('lake',
      './audio/ambient_mixdown.mp3', scene, null, {
        loop: true,
        autoplay: true,
        // volume: 1,
      });
    button.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
      trigger: BABYLON.ActionManager.OnPickTrigger,
      parameter: button,
    }, () => {
      window.navigator.vibrate([25, 20, 25, 20, 16, 14, 16,
        8, 15,
      ]);
      const newMesh = BABYLON.Mesh.CreateBox('newMesh', 2,
        scene);
      // const cubeSound = new BABYLON.Sound('fire',
      //   './audio/fire_mixdown.mp3', scene, null, {
      //     loop: false,
      //     autoplay: true,
      //     // distanceModel: 'linear',
      //     // rolloffFactor: 1.8,
      //     maxDistance: 80,
      //   });
      // // Sound will now follow the box mesh position
      // cubeSound.attachToMesh(newMesh);
      const whoosh = new BABYLON.Sound('whoosh',
        './audio/whoosh_mixdown.mp3', scene, null, {
          loop: false,
          autoplay: true,
          // volume: 1,
        });
      // whoosh.attachToMesh(button);
      newMesh.material = ice.material;
      newMesh.position.copyFrom(button.absolutePosition);
      newMesh.rotation.copyFrom(camera.rotation);
      const forwardLocal = new BABYLON.Vector3(0, 0, 44);
      const newImpostor = new BABYLON.PhysicsImpostor(
        newMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
          mass: 5,
          restitution: 0.2,
          friction: 10,
        }, scene);
      const speed = button2.getDirection(forwardLocal);
      newImpostor.setLinearVelocity(speed);
      // newMesh.checkCollisions = true;
      // Collision
      const greenCubes = [greenCube2, greenCube, redCube,
        redCube2,
      ];
      for (let i = 0; i < greenCubes.length; i += 1) {
        const cube = greenCubes[i];
        cube.registerOnPhysicsCollide(newImpostor, (main,
          collided) => {
          main.object.material.diffuseColor = new BABYLON
            .Color3(Math.random(), Math.random(), Math.random());
          // // Sound
          const thud = new BABYLON.Sound('thud',
            './audio/thud_mixdown.mp3', scene, null, {
              loop: false,
              autoplay: true,
              maxDistance: 200,
              // volume: 1,
            });
          thud.attachToMesh(main.object.geometry._meshes[
            0]);
          // Vibrate
          window.navigator.vibrate([20, 10, 20, 10, 20]);
          setTimeout(() => {
            thud.dispose();
          }, 2000);
        });
      }
      setTimeout(() => {
        newMesh.dispose();
        newImpostor.dispose();
        // cubeSound.dispose();
      }, 4000);
      setTimeout(() => {
        whoosh.dispose();
      }, 1000);
      button.position = new BABYLON.Vector3(0, -2, 3.6);
      button.rotate(BABYLON.Axis.Z, Math.PI / 3, BABYLON.Space
        .LOCAL);
      setTimeout(() => {
        button.position = new BABYLON.Vector3(0, -2, 4);
      }, 45);
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
