import "./App.css";
import { Box, Button, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import Sidebar from "./components/sidebar/sidebar";
import { useState } from "react";
import QueryDetails from "./components/query-details/query-details";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import CustomQuery from "./components/custom-query/custom-query";
import theme from "./components/theme/theme";
import { AddIcon } from "@chakra-ui/icons";
function App() {
  const [openedTabs, setOpenedTabs] = useState([]);
  const [activeTab, setActiveTab] = useState();

  return (
    <ChakraProvider theme={theme}>
      <Box w="full" h="100vh">
        <Box h="10vh" w="100%" borderBottomColor="gray.200">
          <Flex
            px={10}
            w="100%"
            height="100%"
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid"
          >
            <Heading fontSize="2xl">SQL Editor</Heading>
            <CustomQuery>
              {({ handleClick }) => (
                <Button
                  colorScheme="blue"
                  leftIcon={<AddIcon />}
                  onClick={handleClick}
                >
                  {" "}
                  Custom Query
                </Button>
              )}
            </CustomQuery>
          </Flex>
        </Box>
        <Flex w="100%" h="90vh">
          <Box w="20%" borderRight="1px solid" borderRightColor="gray.200">
            <Sidebar
              openedTabs={openedTabs}
              setOpenedTabs={setOpenedTabs}
              setActiveTab={setActiveTab}
            />
          </Box>
          <Box w="80%" bg="#fcfcfc">
            <QueryDetails
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              openedTabs={openedTabs}
              setOpenedTabs={setOpenedTabs}
            />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
