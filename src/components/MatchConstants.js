export const MatchStage = Object.freeze({
    "PRE_MATCH": 0,
    "AUTO": 1,
    "TELEOP": 2,
    "POST_MATCH": 3,
    "METADATA": 4,
    "GAMBLING": 5,
});

export const IntakeElement = Object.freeze({
    "CORAL": 1,
    "ALGAE": 2
})

export const IntakeLocations = Object.freeze({
    "GROUND": 1,
    "STATION": 2,
    "REEF": 3,
    "PRELOAD": 4
})

export const OuttakeLocations = Object.freeze({
    "GROUND": 1,
    "REEF": 2,
    "PROCESSOR": 3,
    "NET": 4,
    "MISSED": 5
})

export const CoralIntakePosition = Object.freeze({
    "STATION": 0,
    "GROUND": 1,
    "PRELOAD": 2
})

export const AlgaeIntakePosition = Object.freeze({
    "GROUND": 0,
    "REEF": 1
})

export const CoralOuttakePosition = Object.freeze({
    "REEF": 0,
    "GROUND": 1
})

export const AlgaeOuttakePosition = Object.freeze({
    "PROCESSOR": 0,
    "NET": 1,
    "GROUND": 2
})

export const CageLocation = Object.freeze({
    "SHALLOW": 0,
    "DEEP": 1,
})

export const StartPosition = Object.freeze({
    "RIGHT": 0,
    "MIDDLE": 1,
    "LEFT": 2,
})

export const DockPosition = Object.freeze({
    "No Dock": 0,
    "Dock": 1,
    "Dock & Engaged": 2
})