import React, { useState, useMemo, useRef, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Box, Text, Image, Badge, Flex } from "theme-ui";
import { take, sample } from "lodash";
import { Slide } from "react-reveal";

const Channel = ({ color, channel }) => (
  <Text as="strong" color={color} children={channel} />
);

const SlackEvents = ({ sx, data, ...props }) => {
  let events = data;
  return (
    <Box
      as="ol"
      sx={{
        height: "100%",
        minHeight: "4em",
        maxHeight: [128, 256],
        overflow: "hidden",
        listStyle: "none",
        lineHeight: "heading",
        pl: 0,
        color: "white",
        fontSize: 2,
        overflowY: "hidden",
        position: "relative",
        div: { mb: [1, 2] },
        "circle:last-of-type": { animationDuration: "1s" },
        ...sx,
      }}
      aria-hidden="true"
      {...props}
    >
      {take(events, 7).map(({ name, state, meta, created }) => (
        <Slide top duration={256} key={meta.githubCommitSha}>
          <Flex>
            <Image
              src={`https://github.com/${meta.githubCommitAuthorLogin}.png`}
              sx={{ height: "20px", marginRight: '10px', borderRadius: '999px' }}
              height="10px"
            />
            <Badge backgroundColor={state == "READY"? "green" : state == "ERROR" ? "red" : "orange"}>{state}</Badge>
            <span style={{ fontSize: '10px', paddingLeft: '5px'}}>{name}@{created}</span>
          </Flex>
        </Slide>
      ))}
    </Box>
  );
};

export default SlackEvents;
