import firebase from "../../../firebase";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, updateDoc  } from "firebase/firestore";

class ScoutingAssignment {
    constructor(ID, userID, matchNumber, teamNumber, teamLocation, allianceSide) {
       this.ID = ID;
       this.userID = userID;
       this.matchNumber = matchNumber;
       this.teamNumber = teamNumber; 
       this.teamLocation = teamLocation;
       this.allianceSide = allianceSide;
       completed = false;
       rescoutedNeeded = false; 
    }
      
    
}