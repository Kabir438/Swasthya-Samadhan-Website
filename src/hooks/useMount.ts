import { useEffect, useRef } from "react";

export default function useMount(callback: React.EffectCallback) {
    const ran = useRef(false);
    useEffect(() => {
        if(ran.current) return;
        ran.current = true;
        return callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}