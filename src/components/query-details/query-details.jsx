import { Box, Flex, Text } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";

import React from "react";
import ActiveQuery from "../active-query/active-query";

function QueryDetails({ activeTab, setActiveTab, openedTabs, setOpenedTabs }) {
  const handleCloseTab = (tabName) => {
    setOpenedTabs((prev) => {
      const filteredTabs = prev?.filter((tab) => tab !== tabName);
      return filteredTabs;
    });
    if (openedTabs.length > 1) {
      setActiveTab(openedTabs[0]);
    } else {
      setActiveTab("");
    }
  };

  return (
    <Box w="100%" h="100%" overflowY="scroll" p={5}>
      <Flex flexWrap="wrap" mb={3} gap={3}>
        {openedTabs?.map((tab) => {
          return (
            <Flex
              key={tab}
              p={2}
              columnGap={2}
              bg={activeTab === tab ? "blue.800" : "white"}
              color={activeTab === tab ? "white" : "blue.800"}
              borderWidth="1px"
              cursor="pointer"
            >
              <Text onClick={() => setActiveTab(tab)}>{tab}</Text>
              <CloseButton size="sm" onClick={() => handleCloseTab(tab)} />
            </Flex>
          );
        })}
      </Flex>

      <Box mt={3}>
        {activeTab ? (
          <ActiveQuery activeTab={activeTab} openedTabs={openedTabs} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}

export default QueryDetails;
