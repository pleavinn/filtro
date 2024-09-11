import { Canvas, Circle, Mask, Group, Rect } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { useDerivedValue, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

const width = 256;
const height = 256;

export function Example(){

    const size = 256;
    const r = useSharedValue(0);
    const c = useDerivedValue(() => size - r.value);
    useEffect(() => {
        r.value = withRepeat(withTiming(size * 0.33, { duration: 1000 }), -1);
    }, [r, size]);

    return (
        <Canvas 
            style={{height, width}}
        >
           <Mask
                mask={
                    <Group>
                        <Circle cx={128} cy={128} r={128} opacity={0.5}/>
                        <Circle cx={128} cy={128} r={64} />
                    </Group>
                }
           >
                <Rect x={0} y={0} width={256} height={256} color={'lightblue'} />
           </Mask>
        </Canvas>
    );
}