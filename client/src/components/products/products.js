import './products.css';
import { useEffect, useState } from 'react';
import SingleProduct from '../singleProduct/singleProduct';
import axios from 'axios';
import { publicRequest } from '../../requestMethods';

const Products = ({ cat, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [url, setUrl] = useState('');

  //GET ALL PRODUCTS
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get('/products');
        setProducts(res.data);

        console.log(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) => {
          return item.category === cat;
        })
      );
  }, [products, cat, filteredProducts]);

  useEffect(() => {
    if (sort === 'Date, old to new') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    }
    if (sort === 'Date, new to old') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.createdAt - a.createdAt)
      );
    } else if (sort === 'Price, low to high') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div className="productsContainer">
      <div>
        {cat
          ? filteredProducts.map((item) => (
              <SingleProduct item={item} key={item._id} />
            ))
          : products.map((item) => (
              <SingleProduct item={item} key={item._id} />
            ))}
      </div>
    </div>
  );
};

export default Products;
