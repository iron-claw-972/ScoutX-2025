import Home from "./components/pages/Home";
import MatchScout from "./components/pages/MatchScout";
import Credits from "./components/pages/Credits";
import PitScout from "./components/pages/PitScout";
import Gambling from "./components/pages/Gambling";
import Analytics from "./components/pages/DataVisualization/Analytics";
import DataVisualizationDisplay from "./components/pages/DataVisualization/DataVisualizationDisplay"

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
            title: "Pit Scout",
            path: "/pitscout",
            component: PitScout,
        },
        {
            title: "Credits",
            path: "/credits",
            component: Credits,
        },
        {
            title: "Gambling",
            path: "/gambling",
            component: Gambling,
        },
        {
            title: "Data Visualization",
            path: "/DataVisualizationDisplay",
            component: DataVisualizationDisplay,
        },
    ],

    field: require("./assets/field.png"),
    fieldFlipped: require("./assets/fieldFlipped.png"),
    fieldReef: require("./assets/fieldReef.png"),
    coralGamepiece: require ("./assets/CoralGamepiece.png"),
    algaeGamepiece: require ("./assets/AlgaeGamepiece.png"),

    // TODO: Images!
    developers: [
        {
            name: "Maxwell Tan",
            year: "3rd Year",
            icon: require("./assets/field.png"),
        },
        {
            name: "Jackob Ericson",
            year: "3rd Year",
            icon: require("./assets/field.png"),
        },
        {
            name: "William Han",
            year: "1st Year",
            icon: require("./assets/field.png"),
        },
        {
            name: "Alasvandian Arman",
            year: "4th Year",
            icon: require("./assets/field.png"),
        }
    ],

    specialThanks: [
        {
            name: "Mentors",
            description: "both technical, and non-technical",
        },
        {
            name: "Scouters",
            description: "again, for giving purpose to this app",
        },
        {
            name: "Material UI React",
            description: "for making this app look passable",
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