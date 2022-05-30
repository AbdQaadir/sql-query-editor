import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import Editor from "@monaco-editor/react";

import { MdPlayArrow, MdSave } from "react-icons/md";

function CodeEditor({ isLoading, activeTab, handleSubmit }) {
  return (
    <>
      <Box h="100px" w="100%">
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          path={`${activeTab}.sql`}
          defaultLanguage="Powershell"
          defaultValue={`SELECT * FROM ${activeTab}`}
          value={`Select * from ${activeTab}`}
        />
      </Box>
      <Flex py={3} gap={7}>
        <Button
          isLoading={isLoading}
          onClick={handleSubmit}
          colorScheme="blue"
          leftIcon={<MdPlayArrow />}
        >
          Run query
        </Button>
        <Button colorScheme="purple" leftIcon={<MdSave />}>
          Save query
        </Button>
      </Flex>
    </>
  );
}

export default CodeEditor;
