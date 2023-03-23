import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'bootstrap';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import './productList.css';
import Products from '../../components/products/products';
import { publicRequest } from '../../requestMethods';

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cat, setCat] = useState(location.pathname.split('/')[2]);
  const [data, setData] = useState([]);
  const [catName, setCatName] = useState('');
  const [allCatName, setAllCatName] = useState([]);

  useEffect(() => {
    const getCategoryName = async () => {
      const res = await publicRequest('/categories');
      setData(res.data);
      console.log(res);
    };
    getCategoryName();
  }, [navigate, cat]);

  useEffect(() => {
    data.forEach((item) => {
      if (cat === item._id) {
        setCatName(item.name);
      }
      setAllCatName((prevCatNames) => [...prevCatNames, item.name]);
    });
  }, [data, cat]);

  const [filter, setFilter] = useState(
    {
      gender: 'all',
      category: cat || 'all',
    },
    [setAllCatName]
  );

  const getCatIdUsingName = (name) => {
    for (let x of data) {
      if (x.name === name) return x._id;
    }
    return '';
  };

  const [sort, setSort] = useState('Date, new to old');
  const optionsFilterGender = ['all', 'women', 'men', 'unisex'];
  const optionsFilterCategory = ['all', ...allCatName];
  const defaultOptionFilterGender = optionsFilterGender[0];
  const defaultOptionFilterCategory = cat !== '' ? catName : 'all';

  const optionsSort = [
    'Date, old to new',
    'Date, new to old',
    'Price, low to high',
    'Price, high to low',
  ];
  const defaultOptionSort = optionsSort[0];
  return (
    <div className="container">
      <div className="containerList">
        <div>
          <h4>{catName.toUpperCase()}</h4>
          <h6 className="filtersHeader">Filter by:</h6>
        </div>
        <div className="filters">
          <div className="filterItem">
            <div className="fiterName">gender</div>
            <div className="dropdown">
              <Dropdown
                options={optionsFilterGender}
                value={defaultOptionFilterGender}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    gender: e.value,
                  });
                }}
                placeholder="Select an option"
              />
            </div>

            <div className="fiterName">category</div>
            <Dropdown
              options={optionsFilterCategory}
              value={defaultOptionFilterCategory}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  category: e.value,
                });
                navigate(`/productList/${getCatIdUsingName(e.value)}`, {
                  replace: true,
                });
                window.location.reload();
              }}
              placeholder="Select an option"
            />
          </div>
          <div className="filterItem">
            <div className="filterName">Sort by: </div>
            <div className="dropdown">
              <Dropdown
                className="sortFilter"
                options={optionsSort}
                value={defaultOptionSort}
                onChange={(e) => {}}
                placeholder="Select an option"
              />
            </div>
          </div>
        </div>
        {<div>{<Products cat={cat} filter={filter} sort={sort} />}</div>}
      </div>
    </div>
  );
};

export default ProductList;
