import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  Input,
  Flex,
  Select,
} from "@chakra-ui/react";
import {
  useTable,
  useFilters,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table/";
import ExportData from "../export-data/export-data";

const generatePageSizes = (count) => {
  if (count <= 50) {
    return [10, 20, 30, 40, 50];
  }
  const dividend = Math.floor(count / 5);
  return Array(5)
    .fill(0)
    .map((num, idx) => num + (idx + 1) * dividend);
};
// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Box>
      <Text>Search through {count} records...</Text>
      <Input
        borderColor="blue.400"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Enter keyword..."
        style={{
          fontSize: "1.1rem",
          // border: "0",
        }}
      />
    </Box>
  );
}
function TableComponent({ activeTab, headers, data }) {
  const columns = React.useMemo(
    () => headers.map((item) => ({ Header: item, accessor: item })),
    [headers]
  );

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      // fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: 10,
      // defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },

    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!);
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    setPageSize,
    // Get the state from the instance
    state: { pageSize },
  } = tableInstance;

  return (
    <>
      <Flex
        w="100%"
        gap={4}
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Flex gap={4} alignItems="flex-end">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <Select
            borderColor="blue.400"
            w="200px"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {generatePageSizes(preGlobalFilteredRows.length).map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
        <Box px={7}>
          <ExportData activeTab={activeTab} data={data} />
        </Box>
      </Flex>
      <TableContainer
        mt={2}
        w="100%"
        h="100%"
        overflowY="scroll"
        overflowX="scroll"
      >
        <Table
          w="100%"
          h="100%"
          // overflowY="scroll"
          // overflowX="scroll"
          {...getTableProps()}
        >
          <Thead>
            <>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup) => (
                  // Apply the header row props
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props
                        <Th
                          {...column.getHeaderProps()}
                          fontSize=".7em"
                          color="blue.500"
                        >
                          {
                            // Render the header
                            column.render("Header")
                          }
                        </Th>
                      ))
                    }
                  </Tr>
                ))
              }
            </>
          </Thead>
          {/* Apply the table body props */}
          <Tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.slice(0, pageSize).map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <Tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <Td
                            {...cell.getCellProps()}
                            wordBreak="break-all"
                            fontSize=".8em"
                          >
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </Td>
                        );
                      })
                    }
                  </Tr>
                );
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableComponent;
