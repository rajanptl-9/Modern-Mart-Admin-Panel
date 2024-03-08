import React from 'react'

const AddCoupon = () => {
    return (
        <>
            <div className='d-flex flex-column gap-16'>
            <div className="d-flex flex-wrap justify-content-space-between align-items-start gap-16">
                <form action='' className="d-flex flex-column flex-grow-1 bg-white rounded-3 py-3 px-3">
                    <h2 className='mb-3'>Add Coupon</h2>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="inputTitle" placeholder="Enter New Product Name" />
                        <label for="inputTitle">Enter Coupon Title</label>
                    </div>
                    <div className="d-flex flex-wrap gap-16 w-100">
                        <div class="form-floating flex-grow-1 mb-3">
                            <input type="number" class="form-control" id="inputPrice" placeholder="Enter Product Price" />
                            <label for="inputPrice">Enter Discount</label>
                        </div>
                        <div class="form-floating flex-grow-1 mb-3">
                            <input type="date" class="form-control" id="inputQuan" placeholder="Enter Product Quantity" />
                            <label for="inputQuan">Enter Expriry</label>
                        </div>
                    </div>
                    <span style={{ width: "150px" }}><button type="button" class="button">Add Coupon</button></span>    
                </form>
            </div>
        </div>
        </>
    )
}

export default AddCoupon