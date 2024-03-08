import React from 'react'

const AddFormList = () => {
    return (
        <div className='d-flex flex-column gap-16'>
            <div className="d-flex flex-wrap justify-content-space-between align-items-start gap-16">
                <form action='' className="d-flex flex-column flex-grow-1 bg-white rounded-3 py-3 px-3">
                    <h2 className='mb-3'>Add Product</h2>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="inputTitle" placeholder="Enter New Product Name" />
                        <label for="inputTitle">Enter Product Title</label>
                    </div>
                    <div className="d-flex flex-wrap gap-16 w-100">
                        <div class="form-floating flex-grow-1 mb-3">
                            <input type="number" class="form-control" id="inputPrice" placeholder="Enter Product Price" />
                            <label for="inputPrice">Enter Price</label>
                        </div>
                        <div class="form-floating flex-grow-1 mb-3">
                            <input type="number" class="form-control" id="inputQuan" placeholder="Enter Product Quantity" />
                            <label for="inputQuan">Enter Quantity</label>
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                        <label for="floatingTextarea2">Enter Description</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="inputImgurl" placeholder="Enter Product Image URL" />
                        <label for="inputImgurl">Enter Image URL</label>
                    </div>
                    <div className="w-100 d-flex flex-wrap gap-16">
                        <div class="form-floating flex-grow-1 mb-3">
                            <input type="text" class="form-control" id="inputProdCat" placeholder="Enter New Product Category" />
                            <label for="inputProdCat">Enter Category</label>
                        </div>
                        <div class="form-floating flex-grow-1 mb-3">
                            <input type="text" class="form-control" id="inputBrand" placeholder="Enter New Product Brand" />
                            <label for="inputBrand">Enter Brand</label>
                        </div>
                        <div class="form-floating flex-grow-1 mb-3">
                            <input type="color" class="form-control" id="inputColor" placeholder="Enter New Product Color" />
                            <label for="inputColor">Enter Color</label>
                        </div>
                    </div>
                    <span style={{ width: "150px" }}><button type="button" class="button">Add Product</button></span>
                </form>

                <div className="d-flex flex-column flex-grow-1 justify-content-space-between align-items-center gap-16">
                    <form action='' className="w-100 d-flex flex-column flex-grow-1 bg-white rounded-3 py-2 px-3 align-items-start">
                        <h2 className='mb-3'>Add Brand</h2>
                        <div class="w-100 form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="Enter New Brand Name" />
                            <label for="floatingInput">Enter New Brand Name</label>
                        </div>
                        <span style={{ width: "150px" }}><button type="button" class="button">Add Brand</button></span>
                    </form>
                    <form action='' className="w-100 d-flex flex-column flex-grow-1 bg-white rounded-3 py-2 px-3 align-items-start">
                        <h2 className='mb-3'>Add Category</h2>
                        <div class="w-100 form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="Enter New Category Name" />
                            <label for="floatingInput">Enter New Category Name</label>
                        </div>
                        <span style={{ width: "150px" }}><button type="button" class="button">Add Category</button></span>
                    </form>
                    <form action='' className="w-100 d-flex flex-column flex-grow-1 bg-white rounded-3 py-2 px-3 align-items-start">
                        <h2 className='mb-3'>Add Color</h2>
                        <div class="w-100 form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="Enter New Color Name" />
                            <label for="floatingInput">Enter New Color Name</label>
                        </div>
                        <span style={{ width: "150px" }}><button type="button" class="button">Add Color</button></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFormList