import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ExportToCsv } from "export-to-csv-fix-source-map";

function ExportData({ activeTab, data }) {
  const ExportAsJson = () => {
    let dataStr = JSON.stringify(data);
    let dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    let exportFileDefaultName = `${activeTab || "data"}.json`;

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const ExportAsCsv = () => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: activeTab || "data",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);
  };
  return (
    <Menu>
      <MenuButton
        color="blue.500"
        bg="white"
        borderColor="blue.500"
        borderWidth={1}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        Export as...
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => ExportAsJson()}>JSON</MenuItem>
        <MenuItem onClick={() => ExportAsCsv()}>SpreadSheet</MenuItem>
        {/* <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem> */}
      </MenuList>
    </Menu>
  );
}

export default ExportData;
