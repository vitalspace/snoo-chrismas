<script>
  import { Group } from 'three'
  import { T, forwardEventHandlers, useTask } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  export const ref = new Group()

  const gltf = useGltf('/star-transformed.glb', { useDraco: '/draco/' })

  const component = forwardEventHandlers()

  // Añadimos una variable para controlar la rotación
  let rotation = 0

  // Usamos useTask para la animación
  useTask(() => {
    rotation += 0.01 // Ajusta este valor para cambiar la velocidad de rotación
    ref.rotation.y = rotation
  })
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Mesh
      position={[0, 9.5, 0]}
      geometry={gltf.nodes.Circle001.geometry}
      material={gltf.materials['Material.028']}
      rotation={[Math.PI / 2, 0, 0]}
    />
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>