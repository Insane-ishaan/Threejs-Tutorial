import { OrbitControls, useAnimations, useGLTF, useTexture } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Dog() {
    const model = useGLTF("/model/dog.drc.glb");
    const { actions } = useAnimations(model.animations, model.scene);
    const { camera, gl } = useThree();
    useEffect(() => {
        actions["Take 001"]?.play();
    }, [actions]);

    camera.position.z = 1.3
    gl.toneMapping = THREE.NoToneMapping
    gl.outputColorSpace = THREE.SRGBColorSpace

    const [normalMap, matColor, branchColor, branchNormal] = useTexture(["/dog_normals.jpg", "/mat_colors/mat-2.png", "/branches_diffuse.jpg", "/branches_normals.jpg"]).map((texture) => {
        texture.flipY = false
        return texture
    })

    matColor.colorSpace = THREE.SRGBColorSpace
    branchColor.colorSpace = THREE.SRGBColorSpace
    matColor.anisotropy = gl.capabilities.getMaxAnisotropy();
    branchColor.anisotropy = gl.capabilities.getMaxAnisotropy();

    const DOGMeshMaterial = useMemo(() => {
        return new THREE.MeshMatcapMaterial({
            normalMap: normalMap,
            matcap: matColor,
            normalScale: new THREE.Vector2(1.1, 1.1),
        })
    }, [normalMap, matColor])

    const BranchMeshMaterial = useMemo(() => {
        return new THREE.MeshMatcapMaterial({
            normalMap: branchNormal,
            matcap: branchColor,
        })
    }, [branchColor, branchNormal])

    model.scene.traverse((child) => {
        if (child.isMesh && child.name.includes("DOG")) {
            child.material = DOGMeshMaterial
        } else {
            child.material = BranchMeshMaterial;
        }
    })

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".canvas-container",
                endTrigger: ".section2",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        })
        tl
            .to(model.scene.position, {
                z: "-=1.6",
                y: "+=0.1"
            })

            .to(model.scene.rotation, {
                x: "+=0.3",
            })

            .to(model.scene.rotation, {
                y: `-=${Math.PI}`
            }, "third")

            .to(model.scene.position, {
                x: "-=1",
                y: "+=0.3",
                z: "+=0.8"
            }, "third")


    }, []);

    return (
        <>
            <primitive object={model.scene} position={[0.4, -1.6, 0]} rotation={[0, Math.PI / 6, 0]} scale={2.8} />
            <directionalLight position={[0, 5, 2]} intensity={10} />
            {/* <OrbitControls /> */}
        </>
    );
}

export default Dog;
