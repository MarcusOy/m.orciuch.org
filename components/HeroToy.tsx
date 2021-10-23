import { Box } from '@chakra-ui/layout'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { CanvasTexture, RepeatWrapping, UVMapping, Vector2 } from 'three'
import { RectAreaLightUniformsLib } from 'three-stdlib'
import { EffectComposer } from '@react-three/postprocessing'
import { useColorModeValue } from '@chakra-ui/react'

RectAreaLightUniformsLib.init()
Vector2.prototype.equals = function (v, epsilon = 0.001) {
    return Math.abs(v.x - this.x) < epsilon && Math.abs(v.y - this.y) < epsilon
}

function useLerpedMouse() {
    const mouse = useThree((state) => state.mouse)
    const lerped = useRef(mouse.clone())
    const previous = new Vector2()
    useFrame((state) => {
        previous.copy(lerped.current)
        lerped.current.lerp(mouse, 0.05)
        // Regress system when the mouse is moved
        if (!previous.equals(lerped.current)) state.performance.regress()
    })
    return lerped
}

const Toy = () => {
    const gltf = useLoader(GLTFLoader, '/3d/toy.glb')
    const primitive = useRef()

    // Sets rotation based on mouse location
    const mouse = useLerpedMouse()
    useFrame((_, d) => {
        let p = primitive.current as any
        // Rotate based on mouse along x and y
        p.rotation.y = (mouse.current.x * Math.PI) / 7 - 0.5
        p.rotation.x = (mouse.current.y * Math.PI) / 50 + 0.2

        // Auto rotate along z
        p.rotation.z += 0.1 * d
    })

    return gltf ? (
        <primitive
            ref={primitive}
            object={gltf.scene}
            position={[0, -2.2, 0]}
            dispose={null}
            castShadow
            receiveShadow
        />
    ) : null
}

const Lights = () => {
    const lights = useRef()
    const mouse = useLerpedMouse()
    useFrame((_) => {
        let l = lights.current as any
        l.rotation.x = (mouse.current.x * Math.PI) / 6
        l.rotation.y = Math.PI * 0.25 - (mouse.current.y * Math.PI) / 6
    })

    // const colorDiff = useColorModeValue(2, 0)
    const colorDiff = 2

    return (
        <>
            <ambientLight intensity={0.05} />

            <directionalLight
                intensity={1}
                position={[2, 2, 0]}
                color="red"
                // distance={5}
            />
            <spotLight
                intensity={2}
                position={[-5, 10, 2]}
                angle={0.2}
                penumbra={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />
            <group ref={lights}>
                <rectAreaLight
                    intensity={colorDiff}
                    color="black"
                    position={[4.5, 0, -3]}
                    width={10}
                    height={10}
                    onUpdate={(self) => self.lookAt(0, 0, 0)}
                />
                <rectAreaLight
                    intensity={colorDiff}
                    color="black"
                    position={[-10, 2, -10]}
                    width={15}
                    height={15}
                    onUpdate={(self) => self.lookAt(0, 0, 0)}
                />
            </group>
        </>
    )
}

// function Effects() {
//     const ref = useRef()
//     // useFrame((state) => {
//     //     // Disable SSAO on regress
//     //     ;(ref.current as any).blendMode.setBlendFunction(
//     //         state.performance.current < 1
//     //             ? BlendFunction.SKIP
//     //             : BlendFunction.MULTIPLY
//     //     )
//     // })
//     return (
//         <EffectComposer multisampling={8}>
//             {/* <DepthOfField focusDistance={15} blur={0.01} /> */}
//             {/* <SSAO
//                 ref={ref}
//                 // intensity={15}
//                 radius={10}
//                 luminanceInfluence={0}
//                 bias={0.035}
//             /> */}
//             {/* <Bloom
//                 kernelSize={KernelSize.LARGE}
//                 luminanceThreshold={0.55}
//                 luminanceSmoothing={0.2}
//             /> */}
//         </EffectComposer>
//     )
// }

const HeroToy = () => {
    return (
        <Box position="relative" zIndex="10" h="100%" w="100%">
            <Canvas
                // frameloop="demand"
                camera={{
                    zoom: 100,
                    position: [0, 0, 100],
                    // rotation: [1, 0, 0],
                }}
            >
                {/* <Effects /> */}
                <Lights />
                <Suspense fallback={null}>
                    {/* <ambientLight intensity={0.1} />
                    <directionalLight position={[10, 10, 0]} /> */}
                    <Toy />
                </Suspense>
            </Canvas>
        </Box>
    )
}

export default HeroToy
