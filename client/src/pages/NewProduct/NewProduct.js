import { useEffect, useState } from 'react';
import './newProduct.css';
import { addProduct } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { Form, Container, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  publicRequest,
  userFormRequest,
  userRequest,
} from '../../requestMethods';

export default function NewProduct() {
  const [allCategorires, setAllCategories] = useState([]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      const res = await publicRequest('/categories');
      setAllCategories(res.data);
    };
    getCategoryDetails();
  });
  const allTypeMeasurements = [
    'Bust',
    'Waist',
    'Hips',
    'Inseam',
    'Shoulder width',
    'Arm length',
    'Neck circumference',
    'Sleeve length',
    'Back width',
    'Front waistLength',
    'Back waistLength',
    'Crotch depth',
    'Thigh circumference',
    'Knee circumference',
    'Calf circumference',
    'Ankle circumference',
    'Bicep circumference',
    'Forearm circumference',
    'Wrist circumference',
  ];

  const dispatch = useDispatch();
  const [selectedValuesCheckBox, setSelectedValuesCheckBox] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const validationSchema = yup.object().shape({
    productImage: yup.mixed().required('Please upload an image'),

    productName: yup.string().required('Please enter the product name'),
    productCategory: yup.string().required('Please enter the product category'),
    productSubCategories: yup.string(),
    productSex: yup.string().required('Please select an option'),
    productCost: yup
      .number('Product cost must be a number')
      .required('Please enter the product cost'),
    productDescription: yup
      .string()
      .required('Please enter the product description'),
  });

  const formik = useFormik({
    //initial values of the form
    initialValues: {
      productImage: null,
      productName: '',
      productCost: '',
      productCategory: '',
      productSubCategories: '',
      productSex: 'male',
      productDescription: '',
      productMeasurements: null,
    },
    //validate form
    validationSchema: validationSchema,

    // submit form
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.productName);
      formData.append('image', values.productImage);
      formData.append('category', values.productCategory);
      formData.append('subCategories', values.productCategory);
      formData.append('gender', values.productSex);
      console.log(formData);
      const res = await userFormRequest.post(
        `/products/${values.productCategory}`,
        formData
      );
      console.log(res.data);
    },
  });

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <Container>
        <div className="detailsOwnDesign">
          <Form
            onSubmit={formik.handleSubmit}
            className="px-5 newProductForm"
            enctype="multipart/form-data"
          >
            <Form.Group className="mb-3 px-3 newProductInput ImgUpload">
              <Form.Label>
                Image
                <Form.Control
                  className="newProductInputField"
                  type="file"
                  name="productImage"
                  value={formik.values?.productImage}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Label>
              <p className=" signupErr p-0">
                {formik.touched.productImage ? formik.errors.productImage : ''}
              </p>
            </Form.Group>
            <Form.Group className="mb-3 px-3 newProductInput">
              <Form.Label>
                Product name
                <Form.Control
                  className="newProductInputField"
                  placeholder="Ex: Long sleeve maxi Dress"
                  type="text"
                  name="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Label>
              <p className=" signupErr p-0">
                {formik.touched.productName ? formik.errors.productName : ''}
              </p>
            </Form.Group>
            <Form.Group className="mb-3 px-3 newProductInput">
              <Form.Label>
                Category
                <Form.Select
                  className="newProductInputField"
                  name="productCategory"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {allCategorires.map((cat, index) => (
                    <option value={cat._id} key={index}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Label>
              <p className=" signupErr p-0">
                {formik.touched.productCategory
                  ? formik.errors.productCategory
                  : ''}
              </p>
            </Form.Group>
            <Form.Group className="mb-3 px-3 newProductInput">
              <Form.Label>
                Sub categories
                <Form.Control
                  className="newProductInputField"
                  type="text"
                  name="productSubCategories"
                  placeholder="Ex: long Sleeve, black, party"
                  value={formik.values.productSubCategories}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Label>
              <p className=" signupErr p-0">
                {formik.touched.productSubCategories
                  ? formik.errors.productSubCategories
                  : ''}
              </p>
            </Form.Group>
            <Form.Group className="mb-3 px-3 newProductInput">
              <Form.Label>
                Sex
                <Form.Select
                  className="newProductInputField"
                  name="productSex"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unisex">Unisex</option>
                </Form.Select>
              </Form.Label>
              <p className=" signupErr p-0">
                {formik.touched.productSex ? formik.errors.productSex : ''}
              </p>
            </Form.Group>
            <Form.Group className="mb-3 px-3 newProductInput">
              <Form.Label>
                Product cost ($)
                <Form.Control
                  className="newProductInputField"
                  type="text"
                  name="productCost"
                  placeholder="Ex: 65"
                  value={formik.values.productCost}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Label>
              <p className=" signupErr p-0">
                {formik.touched.productCost ? formik.errors.productCost : ''}
              </p>
            </Form.Group>
            <Form.Group className="mb-3 px-3 newProductInput">
              <Form.Label>
                Description
                <Form.Control
                  className="newProductInputField newProductInputDescription"
                  as="textarea"
                  name="productDescription"
                  value={formik.values.productDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Label>
              <p className=" signupErr p-0">
                {formik.touched.productDescription
                  ? formik.errors.productDescription
                  : ''}
              </p>
            </Form.Group>

            <Form.Group className="mb-3 px-3 newProductInputField">
              <Form.Label>Measurement types</Form.Label>
              {allTypeMeasurements.map((measure, index) => (
                <Form.Check
                  key={index}
                  name={`productMeasurements.${index}`}
                  className="measurementCheckBox"
                  type="checkbox"
                  label={measure}
                  value={measure}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    setSelectedValuesCheckBox((prevValues) => {
                      if (checked) {
                        return [...prevValues, value];
                      } else {
                        return prevValues.filter((v) => v !== value);
                      }
                    });
                  }}
                  onBlur={formik.handleBlur}
                />
              ))}
              <p className=" signupErr p-0">
                {formik.touched.productMeasurements
                  ? formik.errors.productMeasurements
                  : ''}
              </p>
            </Form.Group>
            <div className="newProductSubmitBtn">
              <Button type="submit" className="submitBtn" disabled={isDisabled}>
                Create Product
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}
