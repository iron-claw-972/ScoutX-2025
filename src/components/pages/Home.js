import {Box, Divider, Stack, Typography} from "@mui/material";
import Page from "../Page";
import {Constants} from "../../Constants";
import InputTable from "./matchscout/form_elements/InputTable";

export default function Home() {

    return (
        <Page sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <Typography component={"h3"} variant={"h3"} color={"primary"} sx={{
                mb: 2,
            }}>
                972 Scouting
            </Typography>
            <Stack direction={"column"} spacing={2}>
                {Constants.pages.map((page) => (
                    (page.path !== "/" ?
                            <>
                                <Box
                                    sx={{
                                        py: 3,
                                        width: "60vw",
                                        maxWidth: "200px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        borderBottom: "1px solid #333"
                                    }}
                                    onClick={
                                        () => {
                                            window.location.pathname = page.path;
                                        }
                                    }>
                                    <Typography variant={"h5"} sx={{
                                        mb: -2.75,
                                    }}>{page.title}</Typography>
                                    <Divider/>
                                </Box>
                            </> : <></>
                    )
                ))}
            </Stack>
        </Page>
    );
}