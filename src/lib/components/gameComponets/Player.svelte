<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { RigidBody, CollisionGroups, Collider } from '@threlte/rapier'
  import { onDestroy } from 'svelte'
  import { PerspectiveCamera, Vector3 } from 'three'
  import PointerLockControls from './PointerLockControls.svelte'

  export let position: [x: number, y: number, z: number] = [0, 0, 0]
  let radius = 0.3
  let height = 1.7
  export let speed = 6

  let rigidBody: RapierRigidBody
  let controlsComponent: PointerLockControls
  let cam: PerspectiveCamera

  let forward = 0
  let backward = 0
  let left = 0
  let right = 0

  const t = new Vector3()

  const lockControls = () => {
    if (controlsComponent) {
      // controlsComponent.lock()
    }
  }

  const { renderer } = useThrelte()

  renderer.domElement.addEventListener('click', lockControls)

  onDestroy(() => {
    renderer.domElement.removeEventListener('click', lockControls)
  })

  useTask(() => {
    if (!rigidBody) return
    const velVec = t.fromArray([right - left, 0, backward - forward])
    velVec.applyEuler(cam.rotation).multiplyScalar(speed)
    const linVel = rigidBody.linvel()
    t.y = linVel.y
    rigidBody.setLinvel(t, true)

    const pos = rigidBody.translation()
    position = [pos.x, pos.y, pos.z]
  })

  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 's':
        backward = 1
        break
      case 'w':
        forward = 1
        break
      case 'a':
        left = 1
        break
      case 'd':
        right = 1
        break
      default:
        break
    }
  }

  function onKeyUp(e: KeyboardEvent) {
    switch (e.key) {
      case 's':
        backward = 0
        break
      case 'w':
        forward = 0
        break
      case 'a':
        left = 0
        break
      case 'd':
        right = 0
        break
      default:
        break
    }
  }
</script>

<svelte:window
  on:keydown|preventDefault={onKeyDown}
  on:keyup={onKeyUp}
/>

<T.Group position.y={0.9}>
  <T.PerspectiveCamera
    makeDefault
    fov={90}
    bind:ref={cam}
    position.x={position[0]}
    position.y={position[1]}
    position.z={position[2]}
    on:create={({ ref }) => {
      ref.lookAt(new Vector3(0, 2, 0))
    }}
  >
    <PointerLockControls bind:this={controlsComponent} />
  </T.PerspectiveCamera>
</T.Group>

<T.Group {position}>
  <RigidBody
    bind:rigidBody
    {position}
    enabledRotations={[false, false, false]}
  >
    <CollisionGroups groups={[0]}>
      <Collider
        shape={'capsule'}
        args={[height / 2 - radius, radius]}
      />
    </CollisionGroups>

    <CollisionGroups groups={[15]}>
      <T.Group position={[0, -height / 2 + radius, 0]}>
        <Collider
          sensor
          shape={'ball'}
          args={[radius * 1.2]}
        />
      </T.Group>
    </CollisionGroups>
  </RigidBody>
</T.Group>