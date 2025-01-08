export const MatchStage = Object.freeze({
    "PRE_MATCH": 0,
    "AUTO": 1,
    "TELEOP": 2,
    "POST_MATCH": 3,
    "METADATA": 4,
});

export const IntakeElement = Object.freeze({
    "CORAL": 1,
    "ALGAE": 2
})

export const IntakeLocations = Object.freeze({
    "GROUND": 1,
    "STATION": 2,
    "REEF": 3
})

export const OuttakeLocations = Object.freeze({
    "GROUND": 1,
    "REEF": 2,
    "PROCESSOR": 3,
    "NET": 4,
    "MISSED": 5
})

export const CoralIntakePosition = Object.freeze({
    STATION: 0,
    GROUND: 1
})

export const AlgaeIntakePosition = Object.freeze({
    GROUND: 0,
    REEF: 1
})

export const CoralOuttakePosition = Object.freeze({
    REEF: 0,
    GROUND: 1
})

export const AlgaeOuttakePosition = Object.freeze({
    PROCESSOR: 0,
    NET: 1,
    GROUND: 2
})

//remove later
export const AutoIntakePosition = Object.freeze({
    PRELOAD: 0,
    TOP_CONE_1: 1,
    TOP_CONE_2: 2,
    TOP_CONE_3: 3,
    MIDDLE_CONE_1: 4,
    MIDDLE_CONE_2: 5,
    MIDDLE_CONE_3: 6,
    BOTTOM_CONE_1: 7,
    BOTTOM_CONE_2: 8,
    BOTTOM_CONE_3: 9,
    BOTTOM_CUBE_1: 10,
    TOP_CUBE_1: 11,
    TOP_CUBE_2: 12,
    TOP_CUBE_3: 13,
    MIDDLE_CUBE_1: 14,
    MIDDLE_CUBE_2: 15,
    MIDDLE_CUBE_3: 16,
    BOTTOM_CUBE_1: 17,
    BOTTOM_CUBE_2: 18,
    BOTTOM_CUBE_3: 19,
})

export const TeleopIntakePosition = Object.freeze({
    PRELOAD: 0,
    SOURCE: 1,
    GROUND: 2
})

export const OuttakePosition = Object.freeze({
    SPEAKER: 1,
    AMP: 2,
    DROPPED: 3,
    MISSED_AMP: 4,
    TRAP: 5,
    MISSED_SPEAKER: 6,
    MISSED_TRAP: 7,
})

export const CageLocation = Object.freeze({
    SHALLOW: 0,
    DEEP: 1,
})

export const StartPosition = Object.freeze({
    "AMP": 0,
    "SPEAKER AMP": 1,
    "SPEAKER MIDDLE": 2,
})

export function getMarkerLabel(stage, type, id) {
    if (type === 0) {
        return Object.keys(OuttakePosition)[id - 1];
    } else {
        return (Object.keys(stage === MatchStage.AUTO ? AutoIntakePosition : TeleopIntakePosition)[id] || "NONE SELECTED").replace(
            "_",
            " "
        );
    }
}

export const DockPosition = Object.freeze({
    "No Dock": 0,
    "Dock": 1,
    "Dock & Engaged": 2
})