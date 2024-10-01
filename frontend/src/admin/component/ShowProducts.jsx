import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import EditProducts from "../component/EditProducts";
import { allProducts } from "../../store/productsSlice";
import { useDispatch } from "react-redux";
import SingleDetails from "./SingleDetails";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [productId, setProductId] = useState(null);
  const [showProdId, setShowProId] = useState(null);
  const [singleProduct,setSingleProduct] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/allproducts");
        const data = await response.json();
        setProducts(data.products);
        dispatch(allProducts(data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  const editHandle = (id) => {
    setEditForm(true);
    setProductId(id);
  };
  const showSingleProduct = (id)=>{
    setSingleProduct(true)
    setShowProId(id)
  }

  const deleteHandle = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8000/api/deleteProduct/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          setProducts(products.filter((product) => product.id !== id));
          alert("Product deleted successfully!");
        } else {
          alert("Error deleting product.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="gap-4 border-orange-300 border-2 m-5 rounded-lg">
      {products.map((product) => (
        <div
          className="flex bg-slate-100 my-5 shadow-[0_10px_20px_rgba(242,_129,_35,_0.7)] mx-5 py-5 gap-y-4 px-5 rounded-lg border-orange-400"
          key={product.id} // Move key here for better practice
        >
          <div className="w-1/3">
            <div className="font-medium pb-3">Image</div>
            {product.images && Array.isArray(JSON.parse(product.images)) && (
              <div>
                <img
                  src={JSON.parse(product.images)[0].replace(/\\/g, "")}
                  alt="Product Image"
                  className="h-[50px] w-[50px] object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="w-1/3">
            <div className="fw-bold font-medium">Name</div>
            <div className="text-[14px]">{product.name}</div>
          </div>
          <div className="w-1/3">
            <div className="fw-bold font-medium">Category</div>
            <div className="text-[14px]">{product.category}</div>
          </div>
          <div className="w-1/3">
            <div className="fw-bold font-medium">Price (INR)</div>
            <div className="text-[14px]">{product.price}</div>
          </div>
          <div className="w-1/3">
            <div className="fw-bold font-medium">Action</div>
            <div className="pt-3 flex gap-5">
              <div
                onClick={() => editHandle(product.id)}
                className="text-[26px] cursor-pointer text-orange-600 shadow-sm rounded-lg p-2 hover:shadow-lg"
                title="Edit"
              >
                <CiEdit />
              </div>
              <div onClick={()=>showSingleProduct(product.id)} className="text-[26px] text-orange-600 cursor-pointer shadow-sm rounded-lg p-2 hover:shadow-lg" title="Show ">
                <BiMessageSquareDetail />
              </div>
              <div
                onClick={() => deleteHandle(product.id)} // Handle delete
                className="text-[26px] text-red-600 cursor-pointer shadow-sm rounded-lg p-2 hover:shadow-lg"
                title="Delete "
              >
                <MdDelete />
              </div>
            </div>
          </div>
          
        </div>
        
      ))}
      {singleProduct && <SingleDetails id={showProdId} onClose={() => setSingleProduct(false)} />}
      {editForm && <EditProducts productId={productId} onClose={() => setEditForm(false)} />}
        
    </div>
  );
};

export default ShowProducts;
