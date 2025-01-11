import {MatchStage, StartPosition, IntakeElement, IntakeLocations} from "./MatchConstants";
import {Scouters} from "./Scouters";
import {doc, getFirestore, setDoc} from "firebase/firestore";
import MatchScout from "./pages/MatchScout";

const climb = [
    "Neither",
    "Climbed",
    "Parked"
]

const defaultData = [
    {
        prematchstage: MatchStage.PRE_MATCH,
        team: null,
        match: null,
        name: null,
        alliance: null,
        driver_station: null,
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
        player: false,
        highNotes: 0,
        intakeBroken: false,
        outtakeBroken: false,
        elevatorBroken: false,
        armBroken: false,
        brownsOut: false,
        wobbly: false,
        missesOuttakesConsistently: false,
        slowIntakes: false,
        disabled: false,
        goodDefenseFromOpponents: false,
        playedMajorityDefense: false,
        touchItOwnIt: false,
        aStopped: false, // Added
        eStopped: false, // Added
        knockedCage: false, // Added
        failedClimb: false, // Added
    },
    {
        metadatastage: MatchStage.METADATA,
        timestamp: new Date(),
    },
];
export default class MatchScoutData {
    constructor() {
        this.stage = MatchStage.PRE_MATCH;
        this.data = defaultData;
        this.history = [];
        this.historyCounter = 0;

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
        this.data[stage]['outtakeCounts'].pop();  //TODO: fix dis
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

    async submit() {
        const validation = this.validate(true);
        if (!validation.valid) {
            this.sendAlert(validation.message, "error");
            return validation;
        }

        this.set(MatchStage.METADATA, "timestamp", Date.now());
        const db = getFirestore();

        const autoOuttakeCounts = defaultData[1].outtakeCounts;
        const teleOuttakeCounts = defaultData[2].outtakeCounts;

        const autoioCount = defaultData[1].outtakeCounts.length;
        const teleioCount = defaultData[2].outtakeCounts.length;

        const teleClimbPosition = defaultData[2].climb;

        const autoMissedCounts = defaultData[1].missedCounts;
        const teleMissedCounts = defaultData[2].missedCounts;

        let firebaseData = {
            autoioCount: autoioCount,
            teleioCount: teleioCount,
            autoOuttakeCounts: autoOuttakeCounts,
            teleOuttakeCounts: teleOuttakeCounts,
            ClimbPosition: teleClimbPosition,
            autoMissedCounts: autoMissedCounts,
            teleMissedCounts: teleMissedCounts
        };

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

        window.location.reload();

        return true;
    }

    sendAlert(message, severity) {
        this.alert.message = message;
        this.alert.severity = severity;
        this.alert.open = true;
    }

    validate(submit = false) {
        return {valid: true, message: ""};
        let alert = null;
        if (this.stage !== MatchStage.POST_MATCH && submit)
            alert = {
                valid: false,
                message: "You must complete the match before submitting.",
            };

        if (this.stage === MatchStage.PRE_MATCH) {
            if (!Scouters.includes(this.get(MatchStage.PRE_MATCH, "name")))
                alert = {
                    valid: false,
                    message: "Error in checking your name. Did you make a typo?",
                };
            else if (this.get(MatchStage.PRE_MATCH, "alliance") === null)
                alert = {
                    valid: false,
                    message: "Please select your team's alliance.",
                };
            else if (
                !Object.keys().includes(
                    this.get(MatchStage.PRE_MATCH, "driver_station")
                )
            )
                alert = {
                    valid: false,
                    message: "Please select your team's driver station.",
                };
            else if (
                !Object.keys(StartPosition).includes(
                    this.get(MatchStage.PRE_MATCH, "start_position")
                )
            )
                alert = {
                    valid: false,
                    message: "Please select your team's starting position.",
                };
            else if (this.get(MatchStage.PRE_MATCH, "team") === null)
                alert = {
                    valid: false,
                    message: "Please select your assigned team.",
                };
        } else if (this.stage === MatchStage.POST_MATCH) {
            if (this.get(MatchStage.POST_MATCH, "rating") === 0)
                alert = {
                    valid: false,
                    message: "Please rate your driver's performance.",
                };
            else if (
                this.get(MatchStage.POST_MATCH, "defense") &&
                this.get(MatchStage.POST_MATCH, "defense_rating") === 0
            )
                alert = {
                    valid: false,
                    message:
                        "Please rate the your assigned team's defensive capabilities.",
                };
        }

        if (alert === null) alert = {valid: true, message: ""};

        if (!alert.valid) this.sendAlert(alert.message, "error");

        return alert;
    }
}
