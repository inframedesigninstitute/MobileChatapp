// DocumentPicker.tsx
import DocumentPicker from "react-native-document-picker";

const openDocumentPicker = async (onPick: (fileName: string) => void) => {
  try {
    const result = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles], // Allow any file
    });

    if (result?.name) {
      onPick(result.name);
    }
  } catch (error: any) {
    if (DocumentPicker.isCancel(error)) {
      console.log("User cancelled document picker");
    } else {
      console.error("Error picking document:", error);
    }
  }
};

export default function DocumentPickerComponent() {
  return null;
}

export { openDocumentPicker };
