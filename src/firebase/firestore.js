import { db } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";

// User content collections
const usersCollection = collection(db, "users");
const lessonsCollection = collection(db, "lessons");
const worksheetsCollection = collection(db, "worksheets");
const storiesCollection = collection(db, "stories");
const assessmentsCollection = collection(db, "assessments");

export const saveUserContent = async (userId, contentType, content) => {
  try {
    let collectionRef;
    switch (contentType) {
      case "lesson":
        collectionRef = lessonsCollection;
        break;
      case "worksheet":
        collectionRef = worksheetsCollection;
        break;
      case "story":
        collectionRef = storiesCollection;
        break;
      case "assessment":
        collectionRef = assessmentsCollection;
        break;
      default:
        throw new Error("Invalid content type");
    }
    
    const docRef = await addDoc(collectionRef, {
      userId,
      createdAt: new Date(),
      ...content
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getUserContent = async (userId, contentType) => {
  try {
    let collectionRef;
    switch (contentType) {
      case "lesson":
        collectionRef = lessonsCollection;
        break;
      case "worksheet":
        collectionRef = worksheetsCollection;
        break;
      case "story":
        collectionRef = storiesCollection;
        break;
      case "assessment":
        collectionRef = assessmentsCollection;
        break;
      default:
        throw new Error("Invalid content type");
    }
    
    const q = query(collectionRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const updateUserContent = async (contentType, contentId, updates) => {
  try {
    let collectionRef;
    switch (contentType) {
      case "lesson":
        collectionRef = lessonsCollection;
        break;
      case "worksheet":
        collectionRef = worksheetsCollection;
        break;
      case "story":
        collectionRef = storiesCollection;
        break;
      case "assessment":
        collectionRef = assessmentsCollection;
        break;
      default:
        throw new Error("Invalid content type");
    }
    
    const docRef = doc(db, collectionRef.path, contentId);
    await updateDoc(docRef, updates);
  } catch (error) {
    throw error;
  }
};

export const deleteUserContent = async (contentType, contentId) => {
  try {
    let collectionRef;
    switch (contentType) {
      case "lesson":
        collectionRef = lessonsCollection;
        break;
      case "worksheet":
        collectionRef = worksheetsCollection;
        break;
      case "story":
        collectionRef = storiesCollection;
        break;
      case "assessment":
        collectionRef = assessmentsCollection;
        break;
      default:
        throw new Error("Invalid content type");
    }
    
    const docRef = doc(db, collectionRef.path, contentId);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};