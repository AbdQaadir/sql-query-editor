import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CodeEditor from "../code-editor/code-editor";

function CustomQuery({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  if (isOpen) {
    return (
      <Modal size="2xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Run Custom Query</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CodeEditor activeTab="" />
          </ModalBody>

          {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
        </ModalContent>
      </Modal>
    );
  }

  return children({ handleClick });
}

export default CustomQuery;
