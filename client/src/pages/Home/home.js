import React, { useEffect, useState } from 'react';
import 'react-bootstrap';
import Product from '../../components/productCategory/productCategory';
import { publicRequest } from '../../requestMethods';
import './home.css';
function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await publicRequest.get('/categories');

        setCategories(res.data);
      } catch (err) {}
    };
    getCategories();
  }, []);

  return (
    <div>
      <div className="banner">
        <img src="./images/banner.jpg" className="banner-image" />
      </div>
      <div>
        <h1 className="d-flex justify-content-center mt-5">Our Products</h1>
        <div className="mainProducts">
          {categories.map((cat) => {
            return (
              <Product
                key={cat._id}
                id={cat._id}
                category={cat.name}
                url={'./images/product/backtboy1.jpg'}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
