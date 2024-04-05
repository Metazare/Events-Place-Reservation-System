import { useState } from 'react';
import { storage } from './../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

interface Data {
  downloadURL: string;
  uploading: boolean;
  uploadFile: (file: File, folderName: string) => void;
}

function useFirebase(): Data {
  const [downloadURL, setDownloadURL] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  // Upload file to Firebase Storage
  const uploadFile = async (file: File, folderName: string) => {
    if (file == null) return;

    const fileRef = ref(storage, `${folderName}/${file.name + v4()}`);

    try {
      setUploading(true); // Set loading state to true when starting the upload

      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setDownloadURL(url);
      alert('File Uploaded!');
    } catch (error) {
      // Handle the error as needed
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false); // Set loading state to false when the upload is done (whether successful or not)
    }
  };

  return { downloadURL, uploading, uploadFile };
}

export default useFirebase;
