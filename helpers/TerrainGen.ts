import { useEffect, useState } from 'react'
import { BufferGeometry, BufferAttribute, MeshPhongMaterial, FlatShading, DoubleSide, Material } from 'three'

var PerlinNoiseGenerator = {
    RandomNoise: function (inParameters: TerrainParameters, inCanvas: HTMLCanvasElement) {
        var g = inCanvas.getContext('2d')!,
            imageData = g.getImageData(0, 0, inCanvas.width, inCanvas.height),
            pixels = imageData.data

        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i] =
                pixels[i + 1] =
                pixels[i + 2] =
                    (Math.random() * 256) | 0
            pixels[i + 3] = 255
        }

        g.putImageData(imageData, 0, 0)
        return inCanvas
    },

    PerlinNoise: function (inParameters: TerrainParameters) {
        /**
         * This part is based on the snippest :
         * https://gist.github.com/donpark/1796361
         */

        var noise = this.RandomNoise(
            inParameters,
            TerrainGen.CreateCanvas(
                inParameters.widthSegments,
                inParameters.heightSegments
            )
        )
        var context = inParameters.canvas.getContext('2d')!
        context.save()

        var ratio = inParameters.widthSegments / inParameters.heightSegments

        /* Scale random iterations onto the canvas to generate Perlin noise. */
        for (var size = 4; size <= noise.height; size *= inParameters.param) {
            var x = (Math.random() * (noise.width - size)) | 0,
                y = (Math.random() * (noise.height - size)) | 0
            context.globalAlpha = 4 / size
            context.drawImage(
                noise,
                Math.max(x, 0),
                y,
                size * ratio,
                size,
                0,
                0,
                inParameters.widthSegments,
                inParameters.heightSegments
            )
        }

        context.restore()

        return inParameters.canvas
    },

    Get: function (inParameters: TerrainParameters) {
        // var geometry = new THREE.Geometry();

        inParameters.param = Math.max(1.1, inParameters.param)

        // Create the Perlin Noise
        var noise = this.PerlinNoise(inParameters)

        return noise
    },
}

var ToyColors = {
    Apply: function (
        inGeometry: BufferGeometry,
        inParameters: TerrainParameters
    ) {
        var step = 1000
        var colors = inGeometry.getAttribute( 'color' ).array as Array<number>;
        var positions = inGeometry.getAttribute('position').array

        for (var i = 0; i < positions.length; i += 3) {
            var depth = Math.min(
                1,
                0.2 +
                    ((0.85 + 0.3 * Math.random()) *
                        0.8 *
                        Math.round(
                            (step * positions[i + 1]) / inParameters.depth
                        )) /
                        step
            )

            colors[i] = 0.7 - depth;
            colors[i + 1] = depth * depth * depth / 2;
            colors[i + 2] = 3.8 * Math.pow(depth - 0.5, 2) + 0.2;
        }
    },
}

interface TerrainParameters {
    generator: any
    width: number
    height: number
    widthSegments: number
    heightSegments: number
    depth: number
    param: number
    postgen: any[]
    canvas: HTMLCanvasElement
}

export const DefaultTerrainParameters: TerrainParameters = {
    generator: PerlinNoiseGenerator,
    // width: 1000,
    width: 300,
    height: 300,
    widthSegments: 50,
    // widthSegments: 50 * (1000 / 300),
    heightSegments: 50,
    depth: 100,
    param: 3,
    postgen: [ToyColors],
    canvas: document.getElementById('heightmap') as HTMLCanvasElement,
}

const TerrainGen = {
    /// HELPERS METHODS ///

    /**
     * Create a DOM canvas element
     * @param inWidth Width of the canvas
     * @param inHeight Height of the canvas
     * @return The created canvas
     */
    CreateCanvas: function (inWidth: number, inHeight: number) {
        var canvas = document.createElement('canvas')
        canvas.width = inWidth
        canvas.height = inHeight
        return canvas
    },

    /**
     * Create vertices of the terrain from the given canvas and parameters
     * @param inNoise 2D Canvas that store height informations
     * @param inGeometry Geometry where fill vertices
     * @param inDepth Depth of the terrain
     * @param inWidth Width of the terrain
     * @param inHeight Height of the terrain
     */
    CreateVertices: function (
        inNoise: HTMLCanvasElement,
        inGeometry: BufferGeometry,
        inDepth: number,
        inWidth: number,
        inHeight: number
    ) {
        var positions = inGeometry.getAttribute('position').array as Array<number>
        var context = inNoise.getContext('2d')!,
            imgData = context.getImageData(0, 0, inNoise.width, inNoise.height),
            pixels = imgData.data,
            scaleX = inWidth / (inNoise.width - 1),
            scaleY = inDepth / 255,
            scaleZ = inHeight / (inNoise.height - 1),
            id = 0,
            pixel = 0,
            offsetX = -inNoise.width / 2,
            offsetZ = -inNoise.height / 2

        console.log({positions})

        for (var y = 0; y < inNoise.height; ++y) {
            for (var x = 0; x < inNoise.width; ++x) {
                positions[id ++] = scaleX * ( x + offsetX );
                positions[id ++] = scaleY * ( pixels[ (pixel ++) * 4 + 1] );
                positions[id ++] = scaleZ * ( y + offsetZ );
            }
        }
    },

    /**
     * Create faces of the terrain
     * @param inGeometry Geometry where fill faces
     * @param inWidth Width of the terrain
     * @param inHeight Height of the terrain
     */
    CreateFaces: function (
        inGeometry: BufferGeometry,
        inWidth: number,
        inHeight: number
    ) {
        var indices = inGeometry.getAttribute( 'index' ).array as Array<number>;
        var id = 0

        for (var y = 0; y < inHeight - 1; ++y) {
            for (var x = 0; x < inWidth - 1; ++x) {
                // First triangle
                indices[id ++] = y * inWidth + x + 1;
                indices[id ++] = y * inWidth + x;
                indices[id ++] = ( y + 1 ) * inWidth + x;

                // Second triangle
                indices[id ++] = ( y + 1 ) * inWidth + x + 1;
                indices[id ++] = y * inWidth + x + 1;
                indices[id ++] = ( y + 1 ) * inWidth + x;
            }
        }
    },

    /**
     * Create geometry of the terrain from the given canvas and parameters
     * @param inNoise 2D Canvas that store height informations
     * @param inWidth Width of the terrain
     * @param inHeight Height of the terrain
     * @param inWidthSegments Number of segments on the width
     * @param inHeightSegments Number of segments on the height
     * @return The created geometry
     */
    CreateGeometry: function (
        inNoise: HTMLCanvasElement,
        inDepth: number,
        inWidth: number,
        inHeight: number,
        inWidthSegments: number,
        inHeightSegments: number
    ) {
        var geometry = new BufferGeometry()

        var nbPoints = inNoise.width * inNoise.height
        var indices = (inNoise.width - 1) * (inNoise.height - 1) * 2 * 3

        geometry.setAttribute(
            'index',
            new BufferAttribute(new Uint32Array(indices), 1)
        )
        geometry.setAttribute(
            'color',
            new BufferAttribute(new Float32Array(nbPoints * 3), 3)
        )
        geometry.setAttribute(
            'position',
            new BufferAttribute(new Float32Array(nbPoints * 3), 3)
        )

        this.CreateVertices(inNoise, geometry, inDepth, inWidth, inHeight)
        this.CreateFaces(geometry, inWidthSegments, inHeightSegments)

        return geometry
    },

    CreateMaterial: function () {
        return new MeshPhongMaterial({
			vertexColors: true,
            flatShading: true,
			side: DoubleSide,
		});
		// var terrainMaterial = new THREE.MeshStandardMaterial({
		// 	vertexColors: THREE.VertexColors,
		// 	shading: (GUI.ms_SmoothShading ? THREE.SmoothShading : THREE.FlatShading),
		// 	onBeforeCompile: (shader) => {
		// 		shader.vertexShader = `
		// 		    vec3 fromSpherical(float radius, float phi, float theta){
		// 			float sinPhiRadius = sin( phi ) * radius;

		// 			float x = sinPhiRadius * sin( theta );
		// 			float y = cos( phi ) * radius;
		// 			float z = sinPhiRadius * cos( theta );

		// 			return vec3(x, y, z);
		// 		  }
		// 		  ${shader.vertexShader}
		// 		`.replace(
		// 			`#include <begin_vertex>`,
		// 			`#include <begin_vertex>
		// 			float phi = (1. - uv.y) * PI;
		// 			float theta = uv.x * PI * 2. + PI;
		// 			float r = 1.;
		// 			transformed = mix(position, fromSpherical(r, phi, theta), 1.);
		// 		  `
		// 		);
		// 	},
		// });
    },
    
    ConstructTerrain: function (
        inNoise: HTMLCanvasElement,
        inParameters: TerrainParameters
    ) {
        // Create the corresponding geometry
        var geometry = this.CreateGeometry(
            inNoise,
            inParameters.depth,
            inParameters.width,
            inParameters.height,
            inParameters.widthSegments,
            inParameters.heightSegments
        )

        // Apply post algorithm as color generation
        for (var i = 0; i < inParameters.postgen.length; ++i) {
            if (null !== inParameters.postgen[i])
                inParameters.postgen[i].Apply(geometry, inParameters)
        }

        // geometry.computeFaceNormals();
        // geometry.computeVertexNormals()

        // Update the geometry
        geometry.attributes.color.needsUpdate = true
        geometry.attributes.index.needsUpdate = true
        geometry.attributes.position.needsUpdate = true

        return geometry
    },

    /// ACCESSIBLE METHODS ///

    /**
     * Generate a 2D Canvas from given parameters
     * @return A canvas that store height map
     */
    GetCanvas: function (inParameters: TerrainParameters) {
        // Manage default parameters
        inParameters.depth = inParameters.depth || 10
        inParameters.width = inParameters.width || 100
        inParameters.height = inParameters.height || 100
        inParameters.widthSegments = inParameters.widthSegments || 100
        inParameters.heightSegments = inParameters.heightSegments || 100
        inParameters.postgen = inParameters.postgen || []

        if (inParameters.canvas == null)
            inParameters.canvas = this.CreateCanvas(
                inParameters.width,
                inParameters.height
            )
        inParameters.canvas.width = inParameters.widthSegments
        inParameters.canvas.height = inParameters.heightSegments

        // document.getElementById(inParameters.canvas.st).style.width = `${inParameters.widthSegments}px`
        // document.getElementById(inParameters.canvas.id).style.height = `${inParameters.heightSegments}px`

        var noise = inParameters.generator.Get(inParameters)

        return noise
    },

    Get: function (inParameters: TerrainParameters) {
        return this.ConstructTerrain(this.GetCanvas(inParameters), inParameters)
    },

    GetFromCanvas: function (
        inParameters: TerrainParameters,
        inCanvas: HTMLCanvasElement,
        inX: number,
        inY: number,
        inWidth: number,
        inHeight: number
    ) {
        // Extract a portion of the given canvas into an other
        var noise = this.CreateCanvas(inWidth, inHeight)
        var imageData = inCanvas
            .getContext('2d')!
            .getImageData(inX, inY, inWidth, inHeight)
        noise
            .getContext('2d')!
            .putImageData(imageData, 0, 0, 0, 0, inWidth, inHeight)

        var scaleWidth = inWidth / inParameters.widthSegments
        var scaleHeight = inHeight / inParameters.heightSegments
        var parameters = Object.create(inParameters)
        parameters.widthSegments = inWidth
        parameters.heightSegments = inHeight
        parameters.width = Math.floor(parameters.width * scaleWidth)
        parameters.height = Math.floor(parameters.height * scaleHeight)
        parameters.heightSegments = inHeight

        return this.ConstructTerrain(noise, parameters)
    },
}

const useTerrainGenerator = (
    params: TerrainParameters = DefaultTerrainParameters
) => {
    const [isLoading, setIsLoading] = useState(true)
    const [geometry, setGeometry] = useState<BufferGeometry | null>(null)
    const [material, setMaterial] = useState<Material | null>(null)

    const regen = () => {
        setIsLoading(true)
        var g = TerrainGen.Get(params)
        var m = TerrainGen.CreateMaterial()
        setGeometry(g)
        setMaterial(m)
        setIsLoading(false)
    }

    useEffect(() => regen(), [])

    return { isLoading, geometry, material, regen }
}

export default useTerrainGenerator
