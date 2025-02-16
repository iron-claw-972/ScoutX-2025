import Home from "./components/pages/Home";
import MatchScout from "./components/pages/MatchScout";
import Credits from "./components/pages/Credits";
import PitScout from "./components/pages/PitScout";
import Gambling from "./components/pages/Gambling";
import Analytics from "./components/pages/DataVisualization/Analytics";
import DataVisualizationDisplay from "./components/pages/DataVisualization/DataVisualizationDisplay"
import HumanPlayerScout from "./components/pages/HumanPlayerScout";

export const Constants = {

    pages: [
        {
            title: "Home",
            path: "/",
            component: Home,
        },
        {
            title: "Match Scout",
            path: "/matchscout",
            component: MatchScout,
        },
        {
            title: "Human Player Scout",
            path: "/HumanPlayerScout", 
            component: HumanPlayerScout,
        },
        {
            title: "Pit Scout",
            path: "/pitscout",
            component: PitScout,
        },
        {
            title: "Data Visualization",
            path: "/DataVisualizationDisplay",
            component: DataVisualizationDisplay,
        },
        {
            title: "Credits",
            path: "/credits",
            component: Credits,
        },
    ],

    field: require("./assets/field.png"),
    fieldFlipped: require("./assets/fieldFlipped.png"),
    fieldReef: require("./assets/fieldReef.png"),
    coralGamepiece: require ("./assets/CoralGamepiece.png"),
    algaeGamepiece: require ("./assets/AlgaeGamepiece.png"),
    cranberryAlarmBot: require ("./assets/CranberryAlarmbot.png"),
    WCPBot: require ("./assets/WCPBot.png"),
    kitBot: require ("./assets/KitBot.png"),
    tankDrive: require ("./assets/tankDrive.png"),
    swerveDrive: require ("./assets/swerveDrive.png"),
    oneoneonefrc: require ("./assets/111Frc.png"),
    

    developers: [
        {
            name: "Eric Jacobson",
            year: "2nd Year",
            icon: require("./assets/field.png"),
        },
        {
            name: "Maxwell Tan",
            year: "1st Year",
            icon: require("./assets/field.png"),
        },
        {
            name: "William Han",
            year: "2nd Year",
            icon: require("./assets/field.png"),
        },
    ],

    specialThanks: [
        {
            name: "Mentors",
            description: "Both technical, and non-technical",
        },
        {
            name: "Scouters",
            description: "Again, for giving purpose to this app",
        },
        {
            name: "Material UI React",
            description: "For making this app look passable",
        },
    ],

    previousYears: [
        {
            year: "2020",
            developers: [
                "Alan Sheu",
                "Pranav Tadepalli"
            ]
        },
        {
            year: "2022",
            developers: [
                "Richie Tan",
                "Ashir Rao"
            ]
        },
        {
            year: "2023",
            developers: [
                "Ashir Rao",
                "Elisa Pan",
                "Johann Jacob",
                "Edwin Hou"
            ]
        },
        {
            year: "2024",
            developers: [
                "Eric Hou",
                "Alisa Pan",
                "Ashir Rao",
                "Tyrus Chung"
            ]
        }
    ]
}