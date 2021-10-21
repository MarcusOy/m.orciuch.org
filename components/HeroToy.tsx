import { Box } from '@chakra-ui/layout'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { Suspense, useEffect, useState } from 'react'

const HeroToyRender = () => {
    const gltf = useLoader(GLTFLoader, '/3d/toy.glb')
    let [rotation, setRotation] = useState([0, 0, 0])

    // Track mouse every tick
    const mouseMove = (e: MouseEvent) => {
        // Get dimensions of window
        let h = window.visualViewport.height
        let w = window.visualViewport.width
        let hm = h / 2
        let wm = w / 2

        // Get absolute mouse position
        let x = e.pageX
        let y = e.pageY

        // Normalize x and y
        let xn = (x - wm) / wm
        let yn = (y - hm) / hm

        // Set maximum rotations
        let xMax = 0.5
        let yMax = 0.5

        // Set new rotation
        setRotation([yn * yMax, xn * xMax, 0])
    }

    // Start mouse tracking
    useEffect(() => {
        document.addEventListener('mousemove', mouseMove)
    }, [])

    return gltf ? (
        <primitive
            object={gltf.scene}
            position={[0, -4, 0]}
            rotation={rotation}
            dispose={null}
        />
    ) : null

    /* <mesh rotation={rotation}>
        <boxGeometry />
        <meshStandardMaterial />
    </mesh> */
}

const HeroToy = () => {
    return (
        <Box position="relative" zIndex="10" h="100%" w="100%">
            <Canvas>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.1} />
                    <HeroToyRender />
                </Suspense>
            </Canvas>
        </Box>
    )
}

export default HeroToy
