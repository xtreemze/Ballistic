(function () {
  "use strict";

  var canvas = document.getElementById("renderCanvas");
  var desktopPointer = window.matchMedia &&
    window.matchMedia("(pointer: fine) and (hover: hover)").matches;

  if (!canvas || !desktopPointer) {
    return;
  }

  function addKey(binding, keyCode) {
    if (Array.isArray(binding) && binding.indexOf(keyCode) === -1) {
      binding.push(keyCode);
    }
  }

  function configureCamera(camera) {
    addKey(camera.keysUp, 87);    // W
    addKey(camera.keysDown, 83);  // S
    addKey(camera.keysLeft, 65);  // A
    addKey(camera.keysRight, 68); // D

    var keyboard = camera.inputs &&
      camera.inputs.attached &&
      camera.inputs.attached.keyboard;

    if (keyboard) {
      addKey(keyboard.keysUp, 87);
      addKey(keyboard.keysDown, 83);
      addKey(keyboard.keysLeft, 65);
      addKey(keyboard.keysRight, 68);
    }

    if (!canvas.hasAttribute("tabindex")) {
      canvas.setAttribute("tabindex", "0");
    }
  }

  function requestMouseLook() {
    if (document.pointerLockElement !== canvas && canvas.requestPointerLock) {
      canvas.requestPointerLock();
    }
    canvas.focus();
  }

  function fireExistingWeapon() {
    var button = window.button;
    if (!button || !button.actionManager || !window.BABYLON) {
      return;
    }

    button.actionManager.processTrigger(
      window.BABYLON.ActionManager.OnPickTrigger
    );
  }

  function onMouseDown(event) {
    if (event.button !== 0) {
      return;
    }

    if (document.pointerLockElement !== canvas) {
      requestMouseLook();
      event.preventDefault();
      return;
    }

    fireExistingWeapon();
    event.preventDefault();
  }

  var attempts = 0;
  var readyTimer = window.setInterval(function () {
    attempts += 1;

    if (window.camera) {
      window.clearInterval(readyTimer);
      configureCamera(window.camera);
      canvas.addEventListener("mousedown", onMouseDown, true);
    } else if (attempts >= 400) {
      window.clearInterval(readyTimer);
    }
  }, 50);
}());
