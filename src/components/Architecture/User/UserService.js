import firebase from "../../../firebase";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, updateDoc  } from "firebase/firestore";

class User {
    constructor(userID, name, assignmentID  ) {
       this.userID = userID;
       this.name = name;
       this.assignmentID = assignmentID; 
    }
    
    
}