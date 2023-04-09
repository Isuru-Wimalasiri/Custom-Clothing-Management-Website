import './adminProduct.css';
import { DataGrid } from '@material-ui/data-grid';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../redux/apiCalls';

export default function AdminProduct() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(dispatch, id);
  };

  console.log(products);
  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    {
      field: 'name',
      headerName: 'Product',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={
                'https://design4users.com/wp-content/uploads/2021/04/cartonpump19_akihiro_yoshida.jpg.pagespeed.ce.E86q038LQU.jpg'
              }
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: 'gender', headerName: 'Sex', width: 100 },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
    },
    {
      field: 'mesurements',
      headerName: 'Measurements',
      width: 400,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/admin/products/' + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <MdDelete
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="adminProduct">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
