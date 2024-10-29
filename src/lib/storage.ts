import { db, storage } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface ProcessedDocument {
  id: string;
  name: string;
  content: string;
  structuredData: any;
  analysis: string;
  fileUrl: string;
  createdAt: Date;
}

export async function saveProcessedDocument(
  file: File,
  content: string,
  structuredData: any,
  analysis: string
): Promise<string> {
  try {
    const storageRef = ref(storage, `documents/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, 'documents'), {
      name: file.name,
      content,
      structuredData,
      analysis,
      fileUrl,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving processed document:', error);
    throw new Error('Failed to save processed document');
  }
}

export async function getProcessedDocuments(): Promise<ProcessedDocument[]> {
  try {
    const q = query(collection(db, 'documents'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as ProcessedDocument[];
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw new Error('Failed to fetch documents');
  }
}