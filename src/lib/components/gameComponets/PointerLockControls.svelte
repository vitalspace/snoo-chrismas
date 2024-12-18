<!-- // PointerLockControls.svelte
<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { Euler, Camera } from 'three'
  import { useThrelte, useParent } from '@threlte/core'

  export let minPolarAngle = 0 // radians
  export let maxPolarAngle = Math.PI // radians
  export let pointerSpeed = 1.0

  let isLocked = false
  const { renderer, invalidate } = useThrelte()
  const domElement = renderer.domElement
  const camera = useParent()
  const dispatch = createEventDispatcher()
  const _euler = new Euler(0, 0, 0, 'YXZ')
  const _PI_2 = Math.PI / 2

  if (!renderer) {
    throw new Error('Threlte Context missing: Is <PointerLockControls> a child of <Canvas>?')
  }

  const isCamera = (p: any): p is Camera => {
    return p.isCamera
  }

  if (!isCamera($camera)) {
    throw new Error('Parent missing: <PointerLockControls> need to be a child of a <Camera>')
  }

  const onChange = () => {
    invalidate()
    dispatch('change')
  }

  export function lock() {
    return domElement.requestPointerLock({
      unadjustedMovement: true
    })
  }

  export function unlock() {
    return document.exitPointerLock()
  }

  function onMouseMove(event: MouseEvent) {
    if (!isLocked) return
    if (!$camera) return

    const { movementX, movementY } = event
    _euler.setFromQuaternion($camera.quaternion)
    _euler.y -= movementX * 0.002 * pointerSpeed
    _euler.x -= movementY * 0.002 * pointerSpeed
    _euler.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.x))
    $camera.quaternion.setFromEuler(_euler)
    onChange()
  }

  function onPointerlockChange() {
    if (document.pointerLockElement === domElement) {
      dispatch('lock')
      isLocked = true
    } else {
      dispatch('unlock')
      isLocked = false
    }
  }

  function onPointerlockError() {
    console.error('PointerLockControls: Unable to use Pointer Lock API')
  }

  domElement.addEventListener('mousemove', onMouseMove)
  domElement.ownerDocument.addEventListener('pointerlockchange', onPointerlockChange)
  domElement.ownerDocument.addEventListener('pointerlockerror', onPointerlockError)

  onDestroy(() => {
    domElement.removeEventListener('mousemove', onMouseMove)
    domElement.ownerDocument.removeEventListener('pointerlockchange', onPointerlockChange)
    domElement.ownerDocument.removeEventListener('pointerlockerror', onPointerlockError)
  })
</script> -->

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { Euler, Camera } from "three";
  import { useThrelte, useParent } from "@threlte/core";

  export let minPolarAngle = 0; // radians
  export let maxPolarAngle = Math.PI; // radians
  export let pointerSpeed = 1.0;

  let isDragging = false;
  const { renderer, invalidate } = useThrelte();
  const domElement = renderer.domElement;
  const camera = useParent();
  const dispatch = createEventDispatcher();
  const _euler = new Euler(0, 0, 0, "YXZ");
  const _PI_2 = Math.PI / 2;

  if (!renderer) {
    throw new Error(
      "Threlte Context missing: Is <PointerLockControls> a child of <Canvas>?"
    );
  }

  const isCamera = (p: any): p is Camera => {
    return p.isCamera;
  };

  if (!isCamera($camera)) {
    throw new Error(
      "Parent missing: <PointerLockControls> need to be a child of a <Camera>"
    );
  }

  const onChange = () => {
    invalidate();
    dispatch("change");
  };

  // Captura de eventos de mouse
  let lastX = 0;
  let lastY = 0;

  function onMouseDown(event: MouseEvent) {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    dispatch("lock"); // Emula el evento "lock"
  }

  function onMouseUp() {
    isDragging = false;
    dispatch("unlock"); // Emula el evento "unlock"
  }

  function onMouseMove(event: MouseEvent) {
    if (!isDragging || !$camera) return;

    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;

    _euler.setFromQuaternion($camera.quaternion);
    _euler.y -= deltaX * 0.002 * pointerSpeed;
    _euler.x -= deltaY * 0.002 * pointerSpeed;
    _euler.x = Math.max(
      _PI_2 - maxPolarAngle,
      Math.min(_PI_2 - minPolarAngle, _euler.x)
    );
    $camera.quaternion.setFromEuler(_euler);

    onChange();
  }

  domElement.addEventListener("mousedown", onMouseDown);
  domElement.addEventListener("mouseup", onMouseUp);
  domElement.addEventListener("mousemove", onMouseMove);

  onDestroy(() => {
    domElement.removeEventListener("mousedown", onMouseDown);
    domElement.removeEventListener("mouseup", onMouseUp);
    domElement.removeEventListener("mousemove", onMouseMove);
  });
</script>
