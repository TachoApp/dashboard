import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Map } from "../map";
import { ChatMain } from "../chats/main";
import { RidesTableDisplay } from "./ridesTableDisplay";

export const HomeMain = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box display="flex">
      {!isMobile && (
        <Box marginRight={2} flexShrink={0}>
          <Map />
        </Box>
      )}

      <Box
        flexGrow={1}
        width={{ xs: "75vw" ,sm: "85vw" ,md: "89vw", lg: "51vw", xl: "52.5vw" }}
        height="86vh"
        overflow="hidden"
      >
        <RidesTableDisplay />
      </Box>
    </Box>
  );
};
