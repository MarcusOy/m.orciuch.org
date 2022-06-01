import { Box } from '@chakra-ui/react'
import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { NextPage } from 'next'
import { Suspense, useRef } from 'react'
import { TextureLoader } from 'three'
import useTerrainGenerator from '../helpers/TerrainGen'

const obc = (shader: any) => {
    shader.vertexShader = `
      vec3 fromSpherical(float radius, float phi, float theta){
        float sinPhiRadius = sin( phi ) * radius;

        float x = sinPhiRadius * sin( theta );
        float y = cos( phi ) * radius;
        float z = sinPhiRadius * cos( theta );

        return vec3(x, y, z);
      }
      ${shader.vertexShader}
    `.replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
        float phi = (1. - uv.y) * PI;
        float theta = uv.x * PI * 2. + PI;
        float r = 1.;
        transformed = mix(position, fromSpherical(r, phi, theta), 1.);
      `
    )
}

const NewToy = () => {
    return (
        <Box position="relative" zIndex="10" h="100vh" w="100wh">
            <canvas
                id="heightmap"
                style={{
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    display: 'none',
                }}
            />
            <Canvas camera={{ fov: 30, near: 0.01, far: 10000, position: [0, 15, 15] }}>
                <OrbitControls />
                {/* <pointLight position={[15, 15, 15]} /> */}
                <directionalLight
                    args={[0xffffff, 1]}
                    position={[0.5, 0.7, 0.75]}
                    castShadow
                />
                <Suspense fallback={null}>
                    <Toy />
                </Suspense>
            </Canvas>
        </Box>
    )
}

const Toy = () => {
    const texture = useLoader(
        TextureLoader,
        'https://threejs.org/examples/textures/uv_grid_opengl.jpg'
    )
    const toyRef = useRef(null);

    const terrain = useTerrainGenerator()
    useFrame((_, d) => {
        let t = toyRef.current as any
        // Rotate based on mouse along x and y
        // t.rotation.y = (mouse.current.x * Math.PI) / 7 - 0.5
        // t.rotation.x = (mouse.current.y * Math.PI) / 50 + 0.2


        if (t && terrain.geometry) {
            // Auto rotate along z
            // t.rotation.z += 0.1 * d

            // Change vertex locations
            var v = terrain.geometry.attributes.position.array as Array<number>

            if (window.MovementOffsets == undefined 
                || window.TimeElapsed == undefined) {
                window.MovementOffsets = []
                window.TimeElapsed = 0
            }

            for (let x = 1; x < v.length; x += 3) {

                if (window.MovementOffsets[x] == undefined)
                    window.MovementOffsets[x] = Math.random() * Math.PI * 10

                v[x] += 0.1 *  Math.sin(x + ((window.TimeElapsed - window.MovementOffsets[x]) / 30))
            }
            terrain.geometry.attributes.position.needsUpdate = true
            window.TimeElapsed++
        }
    })
    console.log(terrain)

    return (
        <>
            {/* <mesh onClick={terrain.regen}>
                <planeGeometry args={[2 * Math.PI, Math.PI, 100, 100]} />
                <meshStandardMaterial map={texture} onBeforeCompile={obc} />
            </mesh> */}
            {!terrain.isLoading &&
                terrain.geometry != null &&
                terrain.material != null && (
                    <mesh
                        ref={toyRef}
                        position={[0, -50, 0]}
                        geometry={terrain.geometry}
                        material={terrain.material}
                        castShadow
                        receiveShadow
                    />
                )}
        </>
    )
}

export default NewToy
