import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import useFetch from "../../hooks/use-fetch";
import TableComponent from "../table/table";

import CodeEditor from "../code-editor/code-editor";

function ActiveQuery({ activeTab, openedTabs }) {
  const { status, error, data, refetch } = useFetch({ activeTab, openedTabs });

  const renderBasedOnStatus = () => {
    switch (status) {
      case "fetching":
        return (
          <Flex
            direction="row"
            w="full"
            h="full"
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
            <Spinner size="xl" />
          </Flex>
        );
      case "failed":
        return <Text variant="danger">{error}</Text>;
      case "success":
        return <TableComponent headers={Object.keys(data[0])} data={data} />;
      default:
        return <></>;
    }
  };
  return (
    <Box w="100%">
      <CodeEditor
        isLoading={status === "fetching"}
        activeTab={activeTab}
        handleSubmit={refetch}
      />
      <Box my={5} w="100%" h="300px">
        {renderBasedOnStatus()}
      </Box>
    </Box>
  );
}

export default ActiveQuery;
