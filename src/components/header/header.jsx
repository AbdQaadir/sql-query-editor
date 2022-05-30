import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import CustomQuery from "../custom-query/custom-query";

function Header() {
  return (
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
  );
}

export default Header;
