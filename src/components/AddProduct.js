import React, { useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, resetState } from '../features/brands/brandSlice';
import { getCategories } from '../features/categories/categorySlice';
import { getColors } from '../features/colors/colorSlice';
import { createProduct, getOneProduct } from '../features/products/productSlice';
import Dropzone from 'react-dropzone'
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { IoClose } from "react-icons/io5";
import { TbPhotoPlus } from "react-icons/tb";
import Multiselect from 'multiselect-react-dropdown';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoAdd } from "react-icons/io5";
import { useLocation } from 'react-router-dom';

const AddProduct = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const productId = location.pathname.split('/')[3];
    const brandState = useSelector((state) => state.brands.brands);
    const categoryState = useSelector((state) => state.categories.categories);
    const colorState = useSelector((state) => state.colors.colors);
    const imageState = useSelector((state) => state.upload.images);
    const productState = useSelector((state) => state.products);
    const [selctedColors, setSelctedColors] = useState([]);
    const [selctedTags, setSelctedTags] = useState([]);
    const { productData } = useSelector((state) => state.products);
    const { title:ptitle, price:pprice, quantity:pquantity, description:pdescription, category:pcategory, brand:pbrand, color:pcolor, tags:ptags, images:pimages } = productData || { ptitle: '', pprice: 1, pquantity: 1, pdescription: '', pcategory: '', pbrand: '', pcolor: [], ptags: [], pimages: [] };

    const tagList = ["featured", "popular", "special", "mobile", "headphones", "smartwatch", "tablet", "new", "sale", "top"];

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
        if (productId !== undefined && productId !== '') {
            dispatch(getOneProduct(productId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, productId]);

    useEffect(() => {
        let colorList = [];
        if(pcolor){
            pcolor.forEach(element => {
                colorList.push(element._id);
            });
            setSelctedColors(colorList);
        }
        let tagList = [];
        if(ptags){
            ptags.forEach(element => {
                tagList.push(element);
            });
            setSelctedTags(tagList);
        }
    }, [pcolor, ptags]);

    const img = useMemo(() => {
        let img_list = [];
        imageState.forEach(element => {
            img_list.push({
                url: element.url,
                public_id: element.public_id
            });
        });
        return img_list;
    }, [imageState]);
    let colorList = [];
    if(pcolor){
        pcolor.forEach(element => {
            colorList.push(element._id);
        });
    }
    const colors = {
        options: [],
        selectedValue: colorList,        
    };
    if (colorState) {
        colorState.forEach(element => {
            colors.options.push({ name: element.title, id: element._id });
        });
    }

    const tags = {
        options: []
    };
    if(tagList) {
        tagList.forEach(element => {
            tags.options.push({ name: "#" + element });
        });
    }

    const productSchema = yup.object().shape({
        title: yup.string().required("Enter product title"),
        price: yup.number().required("Price is required").min(1, "Price cannot be less than 1"),
        quantity: yup.number().required("Quantity is required").min(1, "Quantity cannot be less than 1"),
        description: yup.string().required("Enter product description"),
        images: yup.array().required("Enter product image url"),
        category: yup.string().required("Select product category"),
        brand: yup.string().required("Select product brand"),
        color: yup.array().required("Select product color"),
        tags: yup.array().required("Select suitable tags"),
    });

    const productFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: ptitle || '',
            price: pprice || 1,
            quantity: pquantity || 1,
            description: pdescription || '',
            category: pcategory || '',
            brand: pbrand || '',
            color: pcolor || [],
            tags: ptags || [],
            images: pimages || [],
        },
        validationSchema: productSchema,
        onSubmit: values => {
            dispatch(createProduct(values));
        },
    });

    useEffect(() => {
        if (productState.newProduct === productFormik.values.title && !productState.isError && productState.isSuccess) {
            toast(`✔ Product Added Successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            handleReset();
            productFormik.resetForm();
        } else if (!productState.isSuccess && productState.isError) {
            toast.error('✖ Product creation failed! Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        //eslint-disable-next-line
    }, [productState.isSuccess, productState.isError, productState.message])

    useEffect(() => {
        productFormik.values.images = img;
        productFormik.values.color = selctedColors;
        productFormik.values.tags = selctedTags;
    }, [productFormik, img, selctedColors, selctedTags]);

    const onSelect = (selectedList, selectedItem) => {
        if (!selctedColors.includes(selectedItem.id)) {
            setSelctedColors([...selctedColors, selectedItem.id]);
        }

    };

    const onRemove = (selectedList, removedItem) => {
        const updatedItems = selctedColors.filter((item) => item.id !== removedItem.id);
        setSelctedColors(updatedItems);
    };

    const onTagSelect = (selectedList, selectedTag) => {
        selectedTag = selectedTag.name.slice(1);
        if (!selctedTags.includes(selectedTag)) {
            setSelctedTags([...selctedTags, selectedTag]);
        }
    };

    const onTagRemove = (selectedList, selectedTag) => {
        selectedTag = selectedTag.name.slice(1);
        const updatedItems = selctedTags.filter((item) => item !== selectedTag);
        setSelctedTags(updatedItems);
    };

    const handleReset = () => {
        let emptyArr = [];
        setSelctedColors(emptyArr);
        setSelctedTags(emptyArr);
    }

    return (
        <div className='add-form-list d-flex flex-column gap-16'>
            <form action='' className="box-container d-flex flex-column flex-grow-1 bg-white rounded-3 py-3 px-3" onSubmit={productFormik.handleSubmit}>
                <h4 className='mb-3'>Add Product</h4>
                <div className="form-floating mb-3 position-relative">
                    <input type="text" name='title' className="form-control" id="inputTitle" placeholder="Enter New Product Name" onChange={productFormik.handleChange} onBlur={productFormik.handleBlur} value={productFormik.values.title} />
                    <label htmlFor="inputTitle">Enter Product Title</label>
                    {productFormik.touched.title && productFormik.errors.title ? (
                        <div className='auth-error'>&nbsp;&nbsp;{productFormik.errors.title}</div>
                    ) : null}
                </div>
                <div className="w-100 d-flex flex-wrap gap-16">
                    <div className="form-floating flex-grow-1 mb-3">
                        <select name='category' className="form-select" onChange={productFormik.handleChange} onBlur={productFormik.handleBlur} value={productFormik.values.category}>
                            <option value="" disabled>Select Category</option>
                            {categoryState && categoryState.map((category) => (
                                <option key={category._id} value={category._id}>{category.title}</option>
                            ))}
                        </select>
                        {productFormik.touched.category && productFormik.errors.category ? (
                            <div className='auth-error'>&nbsp;&nbsp;{productFormik.errors.category}</div>
                        ) : null}
                    </div>
                    <div className="form-floating flex-grow-1 mb-3">
                        <select name='brand' className="form-select" onChange={productFormik.handleChange} onBlur={productFormik.handleBlur} value={productFormik.values.brand}>
                            <option value="" disabled>Select Brand</option>
                            {brandState && brandState.map((brand) => (
                                <option key={brand._id} value={brand._id}>{brand.title}</option>
                            ))}
                        </select>
                        {productFormik.touched.brand && productFormik.errors.brand ? (
                            <div className='auth-error'>&nbsp;&nbsp;{productFormik.errors.brand}</div>
                        ) : null}
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-16 w-100">
                    <div className="form-floating flex-grow-1 mb-3">
                        <input type="number" name='price' className="form-control" id="inputPrice" placeholder="Enter Product Price" onChange={productFormik.handleChange} onBlur={productFormik.handleBlur} value={productFormik.values.price} min={1} />
                        <label htmlFor="inputPrice">Enter Price</label>
                        {productFormik.touched.price && productFormik.errors.price ? (
                            <div className='auth-error'>&nbsp;&nbsp;{productFormik.errors.price}</div>
                        ) : null}
                    </div>
                    <div className="form-floating flex-grow-1 mb-3">
                        <input type="number" name='quantity' className="form-control" id="inputQuan" placeholder="Enter Product Quantity" onChange={productFormik.handleChange} onBlur={productFormik.handleBlur} value={productFormik.values.quantity} min={1} />
                        <label htmlFor="inputQuan">Enter Quantity</label>
                        {productFormik.touched.quantity && productFormik.errors.quantity ? (
                            <div className='auth-error'>&nbsp;&nbsp;{productFormik.errors.quantity}</div>
                        ) : null}
                    </div>
                </div>
                <div className="multi-select-color w-100 d-flex flex-wrap gap-16 mb-3">
                    <Multiselect
                        options={colors.options} // Options to display in the dropdown
                        selectedValues={colors.selectedValue} 
                        onSelect={onSelect} 
                        onRemove={onRemove} 
                        displayValue="name" 
                        placeholder='Select Color'
                        id='color-selection-product'
                        avoidHighlightFirstOption={true}
                    />
                    {productFormik.touched.color && productFormik.errors.color ? (
                        <div className='auth-error'>&nbsp;&nbsp;{productFormik.errors.color}</div>
                    ) : null}
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" name='description' placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} onChange={productFormik.handleChange} onBlur={productFormik.handleBlur} value={productFormik.values.description} min={1}></textarea>
                    <label htmlFor="floatingTextarea2">Enter Description</label>
                    {productFormik.touched.description && productFormik.errors.description ? (
                        <div className='auth-error'>&nbsp;&nbsp;{productFormik.errors.description}</div>
                    ) : null}
                </div>
                <div className=" w-100 d-flex flex-wrap gap-16">
                    <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                        {({ getRootProps, getInputProps }) => (
                            <section className='w-100'>
                                <div className="product-image-dropzone" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p><TbPhotoPlus className='fs-2 me-1' />Drag & Drop Some Image Here, or Click to Select Files...</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                {imageState && <div className="show-images mb-3">
                    <div className="d-flex flex-wrap gap-16">
                        {imageState.map((image, index) => (
                            <div key={index} className="image-container position-relative" >
                                <img src={image.url} height={120} width={120} alt="product" />
                                <div className="close-icon">
                                    <IoClose onClick={() => dispatch(deleteImg(imageState[index]))} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
                <div className="multi-select-color w-100 d-flex flex-wrap gap-16 mb-3">
                    <Multiselect
                        options={tags.options}
                        selectedValues={tags.selectedValue}
                        onSelect={onTagSelect}
                        onRemove={onTagRemove}
                        displayValue="name"
                        placeholder='Select tags'
                        id='color-selection-product'
                        avoidHighlightFirstOption={true}
                    />
                    {productFormik.touched.tags && productFormik.errors.tags ? (
                        <div className='auth-error'>&nbsp;&nbsp;{productFormik.errors.tags}</div>
                    ) : null}
                </div>
                <button type="submit" className="button d-flex align-items-center justify-content-center"><IoAdd className='fs-4' />&nbsp;Add Product</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddProduct;