import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { FILE_NAMES } from "../../utils/constants";

function Sidebar({ openedTabs, setOpenedTabs, setActiveTab }) {
  const handleClick = (tabName) => {
    const isTabExists = openedTabs.includes(tabName);
    if (isTabExists) {
      setOpenedTabs((prev) => prev.filter((tab) => tab !== tabName));
      setActiveTab(openedTabs.length > 1 ? openedTabs.at(-1) : "");
      return;
    }
    setActiveTab(tabName);
    setOpenedTabs((prev) => [...prev, tabName]);
  };
  return (
    <Box w="full" p={4}>
      <Heading fontSize="xl">Queries</Heading>

      <UnorderedList
        listStyleType="none"
        mt={3}
        px={0}
        listStylePosition="outside"
      >
        {FILE_NAMES?.map((name) => (
          <ListItem
            py={1}
            px={2}
            mb={1}
            borderRadius={1}
            cursor="pointer"
            onClick={() => handleClick(name)}
            color={openedTabs.includes(name) ? "blue.400" : ""}
            key={name}
            _hover={{ color: "blue.400" }}
          >
            {name}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}

export default Sidebar;
