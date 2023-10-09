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
import {
  useMuatationUpdateProduct,
  useMutationCreateProduct,
  useMutationDeleteProduct,
  useQueryGetAllProducts,
} from "../../reactQuery/Products";
import { Delete, Edit } from "@mui/icons-material";
import toast from "react-hot-toast";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useQueryGetAllCategories } from "../../reactQuery/Category";

const AdminProduct = () => {
  const drawerWidth = useSelector((state) => state.drawerWidth.value);
  const allProducts = useQueryGetAllProducts();
  const createproduct = useMutationCreateProduct();
  const updateProduct = useMuatationUpdateProduct();
  const deleteProduct = useMutationDeleteProduct();
  const allCategories = useQueryGetAllCategories();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalValues, setEditModalValues] = useState({});

  const handleCreateNewRow = async (values) => {
    createproduct
      .mutateAsync({
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        photo: values.photo,
        category: values.category,
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
    updateProduct
      .mutateAsync({
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        photo: values.photo,
        category: values.category,
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
    deleteProduct
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
      header: "Image",
      size: 30,
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img
            alt="avatar"
            height={30}
            src={`http://localhost:3000/api/v1/product/product-photo/${renderedCellValue}`}
            loading="lazy"
            style={{ borderRadius: "50%" }}
          />
        </Box>
      ),
    },
    {
      accessorKey: "name", //access nested data with dot notation
      header: "Name",
      size: 150,
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 300,
    },
    {
      accessorKey: "price", //normal accessorKey
      header: "Price",
      size: 50,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      size: 50,
    },
    {
      accessorKey: "category.name",
      header: "Category",
      size: 100,
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
        data={allProducts?.data?.products || []}
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
            Create New Product
          </Button>
        )}
      />
      <CreateNewAccountModal
        open={createModalOpen}
        category={allCategories?.data?.category}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <EditAccountModal
        open={editModalOpen}
        row={editModalValues}
        category={allCategories?.data?.category}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditRow}
      />
    </Box>
  );
};

export const CreateNewAccountModal = ({
  open,
  category,
  onClose,
  onSubmit,
}) => {
  const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
    photo: "",
    category: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
    setValues({
      name: "",
      price: "",
      description: "",
      photo: "",
      category: "",
      quantity: "",
    });
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Product</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => e.preventDefault()}
          sx={{ mt: 3, width: "550px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                name="name"
                placeholder="Enter product name"
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                placeholder="Enter product price"
                value={values.price}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                multiline
                rows={5}
                margin="normal"
                required
                fullWidth
                name="description"
                placeholder="Enter Description"
                value={values.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="mt-4">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  name="photo"
                  onChange={handleImage}
                />
                <label htmlFor="file-upload">
                  <Button
                    sx={{ mb: "8px" }}
                    variant="outlined"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Photo
                  </Button>
                </label>
                {values.photo && (
                  <div>
                    <img
                      src={URL.createObjectURL(values.photo)}
                      alt="product_photo"
                      className="ml-[-3px]"
                    />
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select
                sx={{ mt: 2 }}
                onChange={handleChange}
                placeholder="Select Category"
                margin="normal"
                fullWidth
                required
                name="category"
              >
                {category?.map((item) => (
                  <MenuItem key={item?._id} value={item?._id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                name="quantity"
                required
                fullWidth
                placeholder="Enter Quantity"
                value={values.quantity}
                onChange={handleChange}
              />
            </Grid>
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

export const EditAccountModal = ({
  row,
  category,
  open,
  onClose,
  onSubmit,
}) => {
  const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
    photo: "",
    category: "",
    quantity: "",
    _id: "",
    ...row, // Spread the product data to override defaults
  });

  // Use useEffect to update values when product changes
  useEffect(() => {
    if (row) {
      setValues((prevValues) => ({
        ...prevValues,
        name: row?.name,
        price: row?.price,
        description: row?.description,
        category: row?.category?._id || "", // Check for category presence
        quantity: row?.quantity || 0, // Check for quantity presence
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

  const handleImage = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
    setValues({
      name: "",
      price: "",
      description: "",
      photo: "",
      category: "",
      quantity: "",
    });
  };

  return (
    <Dialog open={row?._id ? open : false}>
      <DialogTitle textAlign="center">Edit Product</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => e.preventDefault()}
          sx={{ mt: 3, width: "550px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                name="name"
                placeholder="Enter product name"
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                placeholder="Enter product price"
                value={values.price}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                multiline
                rows={5}
                margin="normal"
                required
                fullWidth
                name="description"
                placeholder="Enter Description"
                value={values.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="mt-4">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  name="photo"
                  onChange={handleImage}
                />
                <label htmlFor="file-upload">
                  <Button
                    sx={{ mb: "8px" }}
                    variant="outlined"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Photo
                  </Button>
                </label>
                {values.photo && (
                  <div>
                    <img
                      src={
                        values.photo === ""
                          ? ""
                          : URL.createObjectURL(values.photo)
                      }
                      alt="product_photo"
                      // height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select
                sx={{ mt: 2 }}
                onChange={handleChange}
                placeholder="Select Category"
                margin="normal"
                fullWidth
                required
                name="category"
              >
                {category?.map((item) => (
                  <MenuItem key={item?._id} value={item?._id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                name="quantity"
                required
                fullWidth
                placeholder="Enter Quantity"
                value={values.quantity}
                onChange={handleChange}
              />
            </Grid>
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

export default AdminProduct;
