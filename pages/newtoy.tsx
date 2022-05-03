import { Box } from '@chakra-ui/react'
import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { NextPage } from 'next'
import { Suspense } from 'react'
import { TextureLoader } from 'three'

const NewToy: NextPage = () => {
    return (
        <Box
            position="relative"
            zIndex="10"
            h="100vh"
            w="100wh"
            // background="radial-gradient(at bottom, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0) 65%);"
        >
            {/* <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <mesh>
                    <sphereGeometry args={[16, 32, 16]} />
                    <meshStandardMaterial color={'blue'} />
                </mesh>
            </Canvas> */}
            {/* <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <World />
            </Canvas> */}
            <Canvas camera={{ position: [0, 15, 15] }}>
                <OrbitControls />
                <pointLight position={[15, 15, 15]} />
                <Suspense fallback={null}>
                    <World />
                </Suspense>
            </Canvas>
        </Box>
    )
}

const World = () => {
    const texture = useLoader(
        TextureLoader,
        'https://threejs.org/examples/textures/uv_grid_opengl.jpg'
    )

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
            transformed = mix(position, fromSpherical(r, phi, theta), 1);
          `
        )
    }

    return (
        // <mesh>
        //     <sphereBufferGeometry args={[16, 32, 16]} attach="geometry" />
        //     <meshBasicMaterial
        //         // map={texture}
        //         attach="material"
        //     />
        // </mesh>
        <mesh>
            <planeGeometry args={[2 * Math.PI, Math.PI, 100, 100]} />
            <meshStandardMaterial map={texture} onBeforeCompile={obc} />
        </mesh>
    )
}

export default NewToy
