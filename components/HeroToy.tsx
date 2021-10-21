import { Box } from '@chakra-ui/layout'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Plane, Raycaster, Vector2, Vector3 } from 'three'

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

const HeroToyRender = () => {
    const gltf = useLoader(GLTFLoader, '/3d/toy.glb')
    const primitive = useRef()

    // Sets rotation based on mouse location
    const mouse = useLerpedMouse()
    useFrame((_) => {
        let p = primitive.current as any
        p.rotation.y = (mouse.current.x * Math.PI) / 10
        p.rotation.x = (mouse.current.y * Math.PI) / 200
    })

    return gltf ? (
        <primitive
            ref={primitive}
            object={gltf.scene}
            position={[0, -3.7, 0]}
            dispose={null}
        />
    ) : null
}

const HeroToy = () => {
    return (
        <Box position="relative" zIndex="10" h="100%" w="100%">
            <Canvas
            // frameloop="demand"
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.1} />
                    <HeroToyRender />
                </Suspense>
            </Canvas>
        </Box>
    )
}

export default HeroToy
