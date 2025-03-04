import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase"; // Firebase 설정 가져오기

const storage = getStorage(app);

export async function uploadImage(file) {
  if (!file) return null;

  const storageRef = ref(storage, `images/${file.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    return null;
  }
}
