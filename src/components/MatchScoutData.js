import {MatchStage, StartPosition} from "./MatchConstants";
import {Scouters} from "./Scouters";
import {doc, getFirestore, setDoc} from "firebase/firestore";

const intakeLocations = [
    "NO INTAKES", 
    "CENTER 1",
    "CENTER 2",
    "CENTER 3",
    "CENTER 4",
    "GROUND",
    "SUBSTATION",
    "MISSED"
]

const dock = [
    "Not Docked",
    "Docked and Not Engaged",
    "Docked and Engaged"
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
        dock: dock[0], 
        io: [
            {intake: "PRELOAD"},
        ],
        cubeCounts: {
            top: [],
            middle: [],
            bottom: [],
        },
        coneCounts: {
            top: [],
            middle: [],
            bottom: [],
        },
        missedCounts: []
    },
    {
        telestage: MatchStage.TELEOP,
        dock: dock[0], 
        cubeCounts: {
            top: [],
            middle: [],
            bottom: [],
        },
        coneCounts: {
            top: [],
            middle: [],
            bottom: [],
        },
        missedCounts: []
    },
    {
        postmatchstage: MatchStage.POST_MATCH,
        defense: "",
        comments: "",
        player: false,
        highNotes: 0,
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
            target.push(`${value}-${intakeLocations[selectedRow]}`);
        } else {
            target.pop();
        }
        
    }

    setDock(stage, value) {
        this.data[stage]["dock"] = dock[value]; 
    }

    incrementMissedCount(stage, selectedRow) {
        this.data[stage]["missedCounts"].push(intakeLocations[selectedRow]); 
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
        let autoioCount = 0;
        let teleioCount = 0;

        const autoCubeCounts = [
            ...defaultData[1].cubeCounts.top.map(item => `${item}-TOP`),
            ...defaultData[1].cubeCounts.middle.map(item => `${item}-MIDDLE`),
            ...defaultData[1].cubeCounts.bottom.map(item => `${item}-BOTTOM`)
        ];
        
        const autoConeCounts = [
            ...defaultData[1].coneCounts.top.map(item => `${item}-TOP`),
            ...defaultData[1].coneCounts.middle.map(item => `${item}-MIDDLE`),
            ...defaultData[1].coneCounts.bottom.map(item => `${item}-BOTTOM`)
        ];

        const teleCubeCounts = [
            ...defaultData[1].cubeCounts.top.map(item => `${item}-TOP`),
            ...defaultData[1].cubeCounts.middle.map(item => `${item}-MIDDLE`),
            ...defaultData[1].cubeCounts.bottom.map(item => `${item}-BOTTOM`)
        ];
        
        const teleConeCounts = [
            ...defaultData[1].coneCounts.top.map(item => `${item}-TOP`),
            ...defaultData[1].coneCounts.middle.map(item => `${item}-MIDDLE`),
            ...defaultData[1].coneCounts.bottom.map(item => `${item}-BOTTOM`)
        ];

        autoioCount += autoCubeCounts.length + autoCubeCounts.length;
        teleioCount += teleCubeCounts.length + teleCubeCounts.length;

        const autoDockPosition = defaultData[1].dock;
        const teleDockPosition = defaultData[2].dock;

        const autoMissedCounts = defaultData[1].missedCounts;
        const teleMissedCounts = defaultData[2].missedCounts;

        let firebaseData = {
            autoioCount: autoioCount,
            teleioCount: teleioCount,
            autoCubeCounts: autoCubeCounts,
            autoConeCounts: autoConeCounts,
            autoDockPosition: autoDockPosition,
            teleCubeCounts: teleCubeCounts,
            teleConeCounts: teleConeCounts,
            teleDockPosition: teleDockPosition,
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
