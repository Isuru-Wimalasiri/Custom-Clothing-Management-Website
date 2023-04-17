import React, { useEffect, useState } from 'react';
import 'react-bootstrap';
import Product from '../../components/productCategory/productCategory';
import { publicRequest } from '../../requestMethods';
import './home.css';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [categories, setCategories] = useState([]);
  const navaigate = useNavigate();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await publicRequest.get('/categories');

        setCategories(res.data);
      } catch (err) {}
    };
    getCategories();
  }, []);
  console.log(__dirname);
  return (
    <div className="mainPage">
      <div className="banner">
        <img
          src="./images/banner.jpg"
          className="banner-image"
          alt="main-Banner"
        />
      </div>
      <div>
        <div className="mainBannerDetails">
          <h2>
            Discover our collection of atelier
            <br /> production level garments and
            <br />
            upload your own design
          </h2>
          <div className="bannerBtn">
            <Button onClick={() => navaigate('/productList')}>DISCOVER</Button>
            <Button onClick={() => navaigate('/ownDesign')}>OWN DESIGN</Button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="d-flex justify-content-center mt-5">Our Products</h1>
        <div className="mainProducts">
          {categories &&
            categories.map((cat) => {
              console.log(cat);
              return (
                <Product
                  key={cat._id}
                  id={cat._id}
                  category={cat.name}
                  url={cat.image}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
