import React from 'react';
import 'react-bootstrap';
import Product from '../../components/productCategory/productCategory';
import product from '../../data/productsData';
import './home.css';
function Home() {
  const mainCategoriesReturn = () => {
    const components = [];
    for (let i = 0; i < 4; i++) {
      components.push(
        <Product
          key={product[i].id}
          category={product[i].category[0]}
          url={product[i].url}
        />
      );
    }
    return <div className="mainProducts">{components}</div>;
  };

  return (
    <div>
      <div className="banner">
        <img src="./images/banner.jpg" className="banner-image" />
      </div>
      <div>
        <h1 className="d-flex justify-content-center mt-5">Our Products</h1>
        {mainCategoriesReturn()}
      </div>
    </div>
  );
}

export default Home;
