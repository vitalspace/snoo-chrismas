<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 .\christmas.glb -T --draco /draco
-->

<script>
  import { T } from "@threlte/core";
  import { Text3DGeometry } from "@threlte/extras";

  export let position = [0, 0, 0];
  export let text = "Hello world";
  export let scale = [1, 1, 1];
  export let rotation = [0, 0, 0];
</script>

<T.Mesh {position} {scale} {rotation}>
  <Text3DGeometry
    size={0.2}
    height={0.1}
    font="/fonts/Mountains of Christmas_Bold.json"
    {text}
  />

  <T.MeshStandardMaterial
    color="white"
    toneMapped={false}
    metalness={0.1}
    roughness={0.1}
  />
</T.Mesh>
