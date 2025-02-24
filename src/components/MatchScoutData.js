import {MatchStage, StartPosition, IntakeElement, IntakeLocations} from "./MatchConstants";
import {Scouters} from "./Scouters";
import {doc, getFirestore, setDoc} from "firebase/firestore";

const climb = [
    "Neither",
    "Parked",
    "Shallow",
    "Deep",
]

const defaultData = [
    {
        prematchstage: MatchStage.PRE_MATCH,
        team: null,
        match: null,
        name: null,
        alliance: null,
        start_position: null,
    },
    {
        autostage: MatchStage.AUTO,
        leave: false,
        climb: climb[0], 
        io: [
            {intake: "PRELOAD"},
        ],

        outtakeCounts: [],
        missedCounts: []
    },
    {
        telestage: MatchStage.TELEOP,
        climb: climb[0], 
        outtakeCounts: [],
        missedCounts: []
    },
    {
        postmatchstage: MatchStage.POST_MATCH,
        defense: "",
        comments: "",
        intakeBroken: false,
        outtakeBroken: false,
        elevatorBroken: false,
        armBroken: false,
        brownsOut: false,
        wobbly: false,
        canKnockAlgae: false, 
        missesOuttakesConsistently: false,
        slowIntakes: false,
        disabled: false,
        goodDefenseFromOpponents: false,
        playedMajorityDefense: false,
        touchItOwnIt: false,
        aStopped: false,  
        eStopped: false, 
        knockedCage: false,
        failedClimb: false, 
    },
    {
        metadatastage: MatchStage.METADATA,
        timestamp: new Date(),
    }
];
export default class MatchScoutData {
    constructor(setAlert) {
        this.stage = MatchStage.PRE_MATCH;
        this.data = defaultData;
        this.history = [];
        this.historyCounter = 0;
        this.setAlert = setAlert;

        this.alert = {
            open: false,
            message: "",
            severity: "success",
        };
    }

    get(stage, path) {
        return this.data[stage][path];
    }

    getCount(stage, path, key) {
        // TODO: change so that only return number of non missed notes 
        return this.data[stage][path][key].length;   
    }

    setCount(stage, path, key, value, selectedRow) {
        const target = this.data[stage][path][key];
        if (value > this.getCount(stage, path, key)) {
            target.push(`${value}-${IntakeLocations[selectedRow]}`);
        } else {
            target.pop();
        }
    }

    addOuttakeEntry(stage, selectedIntakeElement, selectedIntakeLocation, timeElapsed, outtakeLocation) {
        const target = this.data[stage]["outtakeCounts"];
        target.push({
            element: Object.keys(IntakeElement).find(k => IntakeElement[k] === selectedIntakeElement),
            intakeLocation: Object.keys(IntakeLocations).find(k => IntakeLocations[k] === selectedIntakeLocation),
            outtakeLocation: outtakeLocation,
            cycleTime: timeElapsed/1000,
        });
    }

    setClimb(stage, value) {
        this.data[stage]["climb"] = climb[value]; 
    }

    //do later
    incrementMissedCount(stage, selectedRow) {
         
    }

    deletePrevious(stage) {
        this.data[stage]['outtakeCounts'].pop();  
    }

    delete(stage, index) {
        this.data[stage]['outtakeCounts'].splice(index, 1);
    }
    
    getOuttakeCount(stage) {
        return this.data[stage]['outtakeCounts'].length; 
    }

    setPostData(type, value) {
        this.data[MatchStage.POST_MATCH][type] = value; 
    }

    getPostData(type) {
        return this.data[MatchStage.POST_MATCH][type]; 
    }
    set(stage, path, value) {
        this.history.push({
            id: ++this.historyCounter,
            stage: stage,
            path: path,
            value: this.data[stage][path],
            time: new Date(),
        });
        this.data[stage][path] = value;
    }   

    clearIO(stage, index) {
        this.history.push({
            id: ++this.historyCounter,
            stage: stage,
            path: "io",
            value: this.data[stage]["io"],
            time: new Date(),
        });
        this.data[stage]["io"][index] = {};
    }

    setIO(stage, index, type, value) {
        this.history.push({
            id: ++this.historyCounter,
            stage: stage,
            path: "io",
            index: index,
            value: {},
            time: new Date(),
        });
        this.data[stage]["io"][index][type] = value;
    }

    getIO(stage, index, type) {
        if (this.data[stage]["io"][index] === undefined) {
            this.data[stage]["io"][index] = {};
        }
        return this.data[stage]["io"][index][type];
    }
    
    deriveAutoOuttakeMetrics() {
        const autoOuttakeCounts = this.data[MatchStage.AUTO]["outtakeCounts"];
        
        const metrics = {
            // Coral
            AutoCoralScored: 0,
            AutoMissedCoral: 0,
            AutoCoralL1: 0,
            AutoCoralL2: 0,
            AutoCoralL3: 0,
            AutoCoralL4: 0,
            AutoMissedCoralL1: 0,
            AutoMissedCoralL2: 0,
            AutoMissedCoralL3: 0,
            AutoMissedCoralL4: 0,
            // Algae
            AutoAlgaeScored: 0,
            AutoMissedAlgae: 0,
            AutoAlgaeProcessor: 0,
            AutoAlgaeNet: 0,
            AutoMissedAlgaeProcessor: 0,
            AutoMissedAlgaeNet: 0,
            // Cycle
            AutoAvgCoralCycle: 0,
            AutoAvgAlgaeCycle: 0,
            // Intakes
            AutoCoralIntakeStation: 0,
            AutoCoralIntakeGround: 0,
            AutoAlgaeIntakeGround: 0,
            AutoAlgaeIntakeReef: 0
        };
    
        let totalCoralCycleTime = 0;
        let coralCount = 0;
        let totalAlgaeCycleTime = 0;
        let algaeCount = 0;
    
        autoOuttakeCounts.forEach(entry => {
            const { element, outtakeLocation, cycleTime, intakeLocation } = entry;
            const isMissed = outtakeLocation.includes("MISSED") ? true : false; 

            if (element === "CORAL" && isMissed) {
                metrics.AutoMissedCoral++; 
                if (outtakeLocation === "MISSED L1") metrics.AutoMissedCoralL1++;
                if (outtakeLocation === "MISSED L2") metrics.AutoMissedCoralL2++;
                if (outtakeLocation === "MISSED L3") metrics.AutoMissedCoralL3++;
                if (outtakeLocation === "MISSED L4") metrics.AutoMissedCoralL4++;
                if (intakeLocation === "GROUND") metrics.AutoCoralIntakeGround++;
                if (intakeLocation === "STATION") metrics.AutoCoralIntakeStation++;
                totalCoralCycleTime += cycleTime;
                coralCount++;
            }
            else if (element === "CORAL") {
                metrics.AutoCoralScored++;
                if (outtakeLocation === "L1") metrics.AutoCoralL1++;
                if (outtakeLocation === "L2") metrics.AutoCoralL2++;
                if (outtakeLocation === "L3") metrics.AutoCoralL3++;
                if (outtakeLocation === "L4") metrics.AutoCoralL4++;
                if (intakeLocation === "GROUND") metrics.AutoCoralIntakeGround++;
                if (intakeLocation === "STATION") metrics.AutoCoralIntakeStation++;
                totalCoralCycleTime += cycleTime;
                coralCount++;
            }
            else if (element === "ALGAE" && isMissed) {
                metrics.AutoMissedAlgae++; 
                if (outtakeLocation === "MISSED PROCESSOR") metrics.AutoMissedAlgaeProcessor++;
                if (outtakeLocation === "MISSED NET") metrics.AutoMissedAlgaeNet++;
                if (intakeLocation === "GROUND") metrics.AutoAlgaeIntakeGround++;
                if (intakeLocation === "REEF") metrics.AutoAlgaeIntakeReef++; 
                totalAlgaeCycleTime += cycleTime;
                algaeCount++;
            }
            else if (element === "ALGAE") {
                metrics.AutoAlgaeScored++;
                if (outtakeLocation === "PROCESSOR") metrics.AutoAlgaeProcessor++;
                if (outtakeLocation === "NET") metrics.AutoAlgaeNet++;
                if (intakeLocation == "GROUND") metrics.AutoAlgaeIntakeGround++;
                if (intakeLocation === "REEF") metrics.AutoAlgaeIntakeReef++; 
                totalAlgaeCycleTime += cycleTime;
                algaeCount++;
            }
        });
    
        // Calculate averages
        metrics.AutoAvgCoralCycle = coralCount > 0 ? (totalCoralCycleTime / coralCount).toFixed(3) : 0;
        metrics.AutoAvgAlgaeCycle = algaeCount > 0 ? (totalAlgaeCycleTime / algaeCount).toFixed(3) : 0;
    
        return metrics;
    }

    deriveTeleOuttakeMetrics() {
        const teleOuttakeCounts = this.data[MatchStage.TELEOP]["outtakeCounts"];
        
        const metrics = {
            // Coral
            TeleCoralScored: 0,
            TeleMissedCoral: 0,
            TeleCoralL1: 0,
            TeleCoralL2: 0,
            TeleCoralL3: 0,
            TeleCoralL4: 0,
            TeleMissedCoralL1: 0,
            TeleMissedCoralL2: 0,
            TeleMissedCoralL3: 0,
            TeleMissedCoralL4: 0,
            // Algae
            TeleAlgaeScored: 0,
            TeleMissedAlgae: 0,
            TeleAlgaeProcessor: 0,
            TeleAlgaeNet: 0,
            TeleMissedAlgaeProcessor: 0,
            TeleMissedAlgaeNet: 0,
            // Cycle
            TeleAvgCoralCycle: 0,
            TeleAvgAlgaeCycle: 0,
            // Intakes
            TeleCoralIntakeStation: 0,
            TeleCoralIntakeGround: 0,
            TeleAlgaeIntakeGround: 0,
            TeleAlgaeIntakeReef: 0
        };
    
        let totalCoralCycleTime = 0;
        let coralCount = 0;
        let totalAlgaeCycleTime = 0;
        let algaeCount = 0;
    
        teleOuttakeCounts.forEach(entry => {
            const { element, outtakeLocation, cycleTime, intakeLocation } = entry;
            const isMissed = outtakeLocation.includes("MISSED") ? true : false; 

            if (element === "CORAL" && isMissed) {
                metrics.TeleMissedCoral++; 
                if (outtakeLocation === "MISSED L1") metrics.TeleMissedCoralL1++;
                if (outtakeLocation === "MISSED L2") metrics.TeleMissedCoralL2++;
                if (outtakeLocation === "MISSED L3") metrics.TeleMissedCoralL3++;
                if (outtakeLocation === "MISSED L4") metrics.TeleMissedCoralL4++;
                if (intakeLocation === "GROUND") metrics.TeleCoralIntakeGround++;
                if (intakeLocation === "STATION") metrics.TeleCoralIntakeStation++;
                totalCoralCycleTime += cycleTime;
                coralCount++;
            }
            else if (element === "CORAL") {
                metrics.TeleCoralScored++;
                if (outtakeLocation === "L1") metrics.TeleCoralL1++;
                if (outtakeLocation === "L2") metrics.TeleCoralL2++;
                if (outtakeLocation === "L3") metrics.TeleCoralL3++;
                if (outtakeLocation === "L4") metrics.TeleCoralL4++;
                if (intakeLocation === "GROUND") metrics.TeleCoralIntakeGround++;
                if (intakeLocation === "STATION") metrics.TeleCoralIntakeStation++;
                totalCoralCycleTime += cycleTime;
                coralCount++;
            }
            else if (element === "ALGAE" && isMissed) {
                metrics.TeleMissedAlgae++; 
                if (outtakeLocation === "MISSED PROCESSOR") metrics.TeleMissedAlgaeProcessor++;
                if (outtakeLocation === "MISSED NET") metrics.TeleMissedAlgaeNet++;
                if (intakeLocation === "GROUND") metrics.TeleAlgaeIntakeGround++;
                if (intakeLocation === "REEF") metrics.TeleAlgaeIntakeReef++; 
                totalAlgaeCycleTime += cycleTime;
                algaeCount++;
            }
            else if (element === "ALGAE") {
                metrics.TeleAlgaeScored++;
                if (outtakeLocation === "PROCESSOR") metrics.TeleAlgaeProcessor++;
                if (outtakeLocation === "NET") metrics.TeleAlgaeNet++;
                if (intakeLocation == "GROUND") metrics.TeleAlgaeIntakeGround++;
                if (intakeLocation === "REEF") metrics.TeleAlgaeIntakeReef++; 
                totalAlgaeCycleTime += cycleTime;
                algaeCount++;
            }
        });
    
        // Calculate averages
        metrics.TeleAvgCoralCycle = coralCount > 0 ? (totalCoralCycleTime / coralCount).toFixed(3) : 0;
        metrics.TeleAvgAlgaeCycle = algaeCount > 0 ? (totalAlgaeCycleTime / algaeCount).toFixed(3) : 0;
    
        return metrics;
    }
    

    async submit() {
        if (this.data[0]['team'] === null || 
            this.data[0]['match'] === null || 
            this.data[0]['name'] === null ||
            this.data[0]['alliance'] === null ||
            this.data[0]['start_position'] === null) 
        {
            
            console.log("Team", this.data[0]['team']);
            console.log("Match", this.data[0]['match']);
            console.log("Name", this.data[0]['name']);
            console.log("Alliance", this.data[0]['alliance']);
            console.log("Start Position", this.data[0]['start_position']);
    
            this.sendAlert("Incomplete data in Pre-Match Page", "error");
            return false; 
        } else {
            this.set(MatchStage.METADATA, "timestamp", Date.now());
            const db = getFirestore();
    
            const autoOuttakeCounts = defaultData[1].outtakeCounts;
            const teleOuttakeCounts = defaultData[2].outtakeCounts;
    
            const autoioCount = defaultData[1].outtakeCounts.length;
            const teleioCount = defaultData[2].outtakeCounts.length;
    
            const teleClimbPosition = defaultData[2].climb;
    
            const autoMetrics = this.deriveAutoOuttakeMetrics();
            const teleMetrics = this.deriveTeleOuttakeMetrics();
    
            let firebaseData = {
                autoioCount: autoioCount,
                teleioCount: teleioCount,
                autoOuttakeCounts: autoOuttakeCounts,
                teleOuttakeCounts: teleOuttakeCounts,
                ClimbPosition: teleClimbPosition,
            };
    
            firebaseData = { ...firebaseData, ...autoMetrics, ...teleMetrics };
    
            for (const key in defaultData) {
                for (const inner in defaultData[key]) {
                    firebaseData[`${inner}`] = `${defaultData[key][inner]}`;
                }
            }
            delete firebaseData.io;
            await setDoc(
                doc(db, "matchScoutData", defaultData[0].team + "_" + defaultData[0].match),
                firebaseData
            );
        
            return true;
        }
    }

    sendAlert(message, severity) {
        this.setAlert({ open: true, message, severity }); // Use state updater
    }
}
