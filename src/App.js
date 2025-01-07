import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";

import NotFound from "./components/pages/NotFound";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./Theme";
import {Constants} from "./Constants";
import Header from "./components/Header";
import './firebase.js';

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Outlet/>}>
                            <Route path="*" element={<NotFound/>}/>
                            {Constants.pages.map((page) => (
                                <Route key={page.path} path={page.path} element={<page.component/>}/>
                            ))}
                        </Route>
                        <Route></Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}
