import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import toast from "react-hot-toast";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  useMuatationUpdateCategory,
  useMutationCreateCategory,
  useMutationDeleteCategory,
  useQueryGetAllCategories,
} from "../../reactQuery/Category";

const AdminCategory = () => {
  const drawerWidth = useSelector((state) => state.drawerWidth.value);
  const allCategories = useQueryGetAllCategories();
  const createCategory = useMutationCreateCategory();
  const updateCategory = useMuatationUpdateCategory();
  const deleteCategory = useMutationDeleteCategory();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalValues, setEditModalValues] = useState({});

  const handleCreateNewRow = async (values) => {
    createCategory
      .mutateAsync({
        name: values.name,
      })
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      });
  };

  const handleEditRow = async (values) => {
    updateCategory
      .mutateAsync({
        name: values.name,
        id: values?._id,
      })
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      });
  };

  const handleDeleteRow = async (id) => {
    deleteCategory
      .mutateAsync({
        id,
      })
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      });
  };

  const columns = [
    {
      accessorKey: "_id",
      header: "Id",
      size: 250,
    },
    {
      accessorKey: "name", //access nested data with dot notation
      header: "Name",
      size: 250,
    },
    {
      accessorKey: "slug",
      header: "Slug",
      size: 250,
    },
  ];

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, ml: drawerWidth }}
    >
      <Toolbar />
      <MaterialReactTable
        columns={columns}
        data={allCategories?.data?.category || []}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() => {
                  setEditModalValues(row?.original);
                  setEditModalOpen(true);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>

            <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error"
                onClick={() => handleDeleteRow(row?.original?._id)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Category
          </Button>
        )}
      />
      <CreateNewAccountModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <EditAccountModal
        open={editModalOpen}
        row={editModalValues}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditRow}
      />
    </Box>
  );
};

export const CreateNewAccountModal = ({ open, onClose, onSubmit }) => {
  const [values, setValues] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
    setValues({
      name: "",
    });
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Category</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => e.preventDefault()}
          sx={{ mt: 3, width: "550px" }}
        >
          <Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              name="name"
              placeholder="Enter Category name"
              value={values.name}
              onChange={handleChange}
            />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            onClose();
            setValues({
              name: "",
              price: "",
              description: "",
              photo: "",
              category: "",
              quantity: "",
            });
          }}
        >
          Cancel
        </Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const EditAccountModal = ({ row, open, onClose, onSubmit }) => {
  const [values, setValues] = useState({
    name: "",
    _id: "",
    ...row, // Spread the product data to override defaults
  });

  // Use useEffect to update values when product changes
  useEffect(() => {
    if (row) {
      setValues((prevValues) => ({
        ...prevValues,
        name: row?.name,
        _id: row?._id,
      }));
    }
  }, [row]);

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
    setValues({
      name: "",
    });
  };

  return (
    <Dialog open={row?._id ? open : false}>
      <DialogTitle textAlign="center">Edit Category</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => e.preventDefault()}
          sx={{ mt: 3, width: "550px" }}
        >
          <Grid container spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              name="name"
              placeholder="Enter Category name"
              value={values.name}
              onChange={handleChange}
            />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            onClose();
            setValues({
              name: "",
              price: "",
              description: "",
              photo: "",
              category: "",
              quantity: "",
            });
          }}
        >
          Cancel
        </Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Update Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminCategory;
