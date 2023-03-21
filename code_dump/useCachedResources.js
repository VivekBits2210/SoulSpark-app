import { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Cache resources such as images, fonts, etc.
        const images = [
          'your_user_profile_image_url',
          'your_reverse_icon_url',
        ];
        const cacheImages = images.map((image) => Asset.fromURI(image).downloadAsync());
        await Promise.all(cacheImages);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}