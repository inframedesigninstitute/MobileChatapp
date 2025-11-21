// GalleryPicker.tsx
import { launchImageLibrary } from "react-native-image-picker";

const openGallery = async (onPick: (imageUri: string) => void) => {
  try {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 1,
      selectionLimit: 1,
    });

    if (result?.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) onPick(uri);
    }
  } catch (error) {
    console.error("Error picking image:", error);
  }
};

export default function GalleryPicker() {
  return null;
}

export { openGallery };
