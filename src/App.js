import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "name", width: 130 },
];
function App() {
  const [value, setvalue] = useState([]);

  const [page, setPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    initialload();
  }, [page]);

  const initialload = () => {
    let url = `https://www.gimbooks.com/v4/master/city/?page=${page + 1}`;
    if (searchQuery) {
      url += `&query=${searchQuery}`;
    }
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setvalue(data?.results))
      .catch((err) => console.log(err));
  };

  const handleNextPage = () => {
    if (value?.length >= 10) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };
  console.log(page);
  const handleSearchChange = (event) => {
    setPage(0);
    initialload();
  };

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        padding: "30px",
        background: "grey",
        height: "94dvh",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TableContainer component={Paper} aria-label="simple table">
          <Table>
            <TableHead>
              <TableRow>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    paddingLeft: "15px",
                    paddingTop: "15px",
                  }}
                >
                  <TextField
                    label="Search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    variant="outlined"
                    // style={{  height: "50px" }}
                  />
                  <Button
                    variant="contained"
                    style={{ height: "56px" }}
                    onClick={handleSearchChange}
                  >
                    Search
                  </Button>
                </div>
              </TableRow>
              <TableRow>
                <TableCell> ID</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
           
          }}
        > */}
              <TableRow>
                <TableCell>
                  <Button variant="outlined" onClick={handlePrevPage}>
                    Back Page
                  </Button>
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 900 }}>
                  <div
                    style={{
                      width: "100%",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    Page No:{page + 1}
                    <Button variant="outlined" onClick={handleNextPage}>
                      Next Page
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {/* </div> */}
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
