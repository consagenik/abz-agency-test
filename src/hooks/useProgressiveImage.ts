import {useEffect, useState} from "react";

const useProgressiveImage = (src: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setIsLoading(false)
  }, []);

  return isLoading
}

export default useProgressiveImage
