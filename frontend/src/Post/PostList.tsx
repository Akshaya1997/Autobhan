import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { Delete, Edit, Add, Close } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";

function PostList() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = useState<any[]>([]);

  const fetchData = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=1"
    );
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: number) => {
    let filteredData = data.filter((x) => x.id !== id);
    setData(filteredData);
    setShowSnackBar(true);
    setSnackBarMessage("Post has been Deleted Successfully!");
  };

  const handleCloseSnackBar = () => {
    setShowSnackBar(false);
  };

  const handleClickOpenDialog = (type: string, record: any) => {
    if (type === "Add") {
      setDialogData([
        {
          title: null,
          body: null,
          userId: 1,
          type: "Add",
        },
      ]);
    } else {
      record.type = "Edit";
      setDialogData([record]);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogData([]);
  };

  const handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newArr = [...dialogData];
    newArr[0][event.target.name] = event.target.value;
    setDialogData(newArr);
  };

  const handleSaveDialog = async () => {
    if (dialogData[0].type === "Edit") {
      delete dialogData[0].type;
      await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        body: JSON.stringify({
          id: dialogData[0].id,
          title: dialogData[0].title,
          body: dialogData[0].body,
          userId: dialogData[0].userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const newArr = data.map((item, i) => {
            if (json.id === item.id) {
              return { ...item,id:1, title: json.title, body: json.body };
            } else {
              return item;
            }
          });
          setData(newArr);
          setShowSnackBar(true);
          setSnackBarMessage("Post has been updated Successfully!");
          handleCloseDialog();
        });
    } else {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: dialogData[0].title,
          body: dialogData[0].body,
          userId: dialogData[0].userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const newArr = [...data];
          newArr.push(json);
          setData(newArr);
          setShowSnackBar(true);
          setSnackBarMessage("Post has been Added Successfully!");
          handleCloseDialog();
        });
    }
  };

  const snackBarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        onClick={(e) => handleCloseSnackBar()}
        color="inherit"
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div style={{ margin: "4rem" }}>
      <Tooltip title="Add a Post" arrow>
        <IconButton
          onClick={(e) => handleClickOpenDialog("Add", null)}
          style={{ float: "right" }}
        >
          <Add fontSize="small" />
        </IconButton>
      </Tooltip>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.body}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex" }}>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            onClick={(e) => handleClickOpenDialog("Edit", row)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete" arrow>
                          <IconButton onClick={(e) => handleDelete(row.id)}>
                            <Delete color="error" fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Snackbar
        open={showSnackBar}
        autoHideDuration={2000}
        onClose={(e) => handleCloseSnackBar()}
        message={snackBarMessage}
        action={snackBarAction}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: "1rem" }}>
            <TextField
              autoFocus
              id="title"
              name="title"
              label="Title"
              fullWidth
              variant="standard"
              defaultValue={dialogData[0]?.title}
              helperText={
                dialogData[0]?.title === "" ? "Title is Required!" : ""
              }
              error={dialogData[0]?.title === ""}
              onChange={(e) => handleInputValueChange(e)}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <TextField
              id="body"
              label="Body"
              name="body"
              variant="standard"
              fullWidth
              defaultValue={dialogData[0]?.body}
              multiline
              helperText={dialogData[0]?.body === "" ? "Body is Required!" : ""}
              error={dialogData[0]?.body === ""}
              onChange={(e) => handleInputValueChange(e)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            disabled={dialogData[0]?.body === "" || dialogData[0]?.title === ""}
            onClick={handleSaveDialog}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PostList;
