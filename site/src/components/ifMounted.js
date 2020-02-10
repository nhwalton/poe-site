import { useEffect, useRef, useCallback } from 'preact/hooks';

const useIfMounted = () => {
    const isMounted = useRef(true)
    useEffect(
      () => () => {
        isMounted.current = false
      },[]
    )
  
    const ifMounted = useCallback(
      func => {
        if (isMounted.current && func) {
          func()
        } 
      },[]
    )
  
    return ifMounted
}

export default useIfMounted;