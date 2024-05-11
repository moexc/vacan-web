import { useEffect, useCallback, useState } from "react"

const useSyncCallback = (callback: Function) => {
    const [proxyState, setProxyState] = useState({ current: false })
    const [params, setParams] = useState<any[]>([])

    const Func = useCallback((...args: any[]) => {
        setParams(args)
        setProxyState({ current: true })
    }, [proxyState])

    useEffect(() => {
        if (proxyState.current === true) setProxyState({ current: false })
    }, [proxyState])

    useEffect(() => {
        proxyState.current && callback(...params)
    })

    return Func
}

export default useSyncCallback