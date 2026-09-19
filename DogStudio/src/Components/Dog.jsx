import { OrbitControls } from "@react-three/drei";
function Dog() {
    return (
        <>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="hotpink" />
            </mesh>
            <OrbitControls />
        </>
    );
}

export default Dog;
