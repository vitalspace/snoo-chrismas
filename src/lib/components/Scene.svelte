<script lang="ts">
  import { T, useTask, useThrelte } from "@threlte/core";
  import { ContactShadows, HTML, OrbitControls, Stars } from "@threlte/extras";
  import { CollisionGroups, Debug } from "@threlte/rapier";
  import { spring } from "svelte/motion";
  import { Mesh, PerspectiveCamera, Vector3 } from "three";
  import Player from "./gameComponets/Player.svelte";
  import Map from "./gameComponets/Map.svelte";
  import Star from "./gameComponets/Star.svelte";
  import Messages from "./gameComponets/Messages.svelte";

  import Games from "./gameComponets/Games.svelte";
  import Snoo from "./gameComponets/snoo.svelte";

  import Text3d from "./gameComponets/Text.svelte";
  import Lights from "./gameComponets/Lights.svelte";

  let playerMesh: Mesh;
  let positionHasBeenSet = false;
  const smoothPlayerPosX = spring(0);
  const smoothPlayerPosZ = spring(0);
  const t3 = new Vector3();
  useTask(() => {
    if (!playerMesh) return;
    playerMesh.getWorldPosition(t3);
    smoothPlayerPosX.set(t3.x, {
      hard: !positionHasBeenSet,
    });
    smoothPlayerPosZ.set(t3.z, {
      hard: !positionHasBeenSet,
    });
    if (!positionHasBeenSet) positionHasBeenSet = true;
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  on:create={({ ref }) => ref.lookAt(0, 1, 0)}
>
  <OrbitControls
    autoRotateSpeed={0.5}
    enableZoom={true}
    enablePan={true}
    maxPolarAngle={Math.PI / 2}
    target={[0, 1, 0]}
  />
</T.PerspectiveCamera>

<!-- Luces -->
<T.DirectionalLight intensity={0.2} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.2} />

<!-- Sombras -->
<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

<!-- Debug -->
<!-- <Debug depthTest={false} depthWrite={false} /> -->

<!-- Terreno -->
<!-- <CollisionGroups groups={[0, 15]}>
  <Ground />
</CollisionGroups> -->

<!-- Jugador -->
<!-- <CollisionGroups groups={[0]}>
    <Player bind:playerMesh position={[0, 2, 0]} />
  </CollisionGroups> -->

<!-- UI -->
<!-- <HTML transform position={[0, 2, 0]}>
  <h1 class="text-3xl text-white select-none">Hello World</h1>
</HTML> -->

<!-- <CollisionGroups groups={[0]}>
  <Cube bind:playerMesh position={[0, 5, 0]} />
<</CollisionGroups> -->
>
<Messages />
<Star />
<Stars />
<Map />
<Snoo />
<Games />
<Lights />

<Text3d
  text="Merry Christmas"
  position={[-4.2, 4.7, 15]}
  scale={[4.5, 4.5, 4.5]}
  rotation={[0, 0, 0]}
/>

<!-- <Quiz position={[7, 3, 0]} rotation={[0, -0.2, 0]} scale={[0.5, 0.5, 0.5]} /> -->

<CollisionGroups groups={[0]}>
  <Player bind:playerMesh position={[0, 10, 21]} />
</CollisionGroups>
