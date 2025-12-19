import axios from "axios";
import { UploadCloud } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import useUserRole from "../../../Hooks/useUserRole";
import { FaProductHunt } from "react-icons/fa";

const AddAssets = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const axiosSquer = useAxiosSquer();
  const { userInfo } = useUserRole();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Upload image
      const imagebbAPIK = import.meta.env.VITE_imagebb_sdk;
      const imgData = new FormData();
      imgData.append("image", data.photo[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imagebbAPIK}`,
        imgData
      );

      const imgResult = imgRes.data.data.url;
      if (imgResult) {
        try {
          const asset = {
            productName: data.productName,
            productType: data.productType,
            productQuantity: parseInt(data.productQuantity),
            availableQuantity: parseInt(data.productQuantity),
            productImage: imgRes.data.data.url,
            hrEmail: userInfo?.email,
            hrCompanyName: userInfo?.companyName,
          };
          // console.log(asset);
          const res = await axiosSquer.post("/assets", asset);
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              icon: "success",
              title: "Asset Added",
              text: "New asset has been added successfully",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.message,
          });
        }
      }

      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message,
      });
    }
  };

  // if (!imgResult.success) {
  //   throw new Error("Image upload failed");
  // }

  // const asset = {
  //   productName: data.productName,
  //   productType: data.productType,
  //   productQuantity: parseInt(data.productQuantity),
  //   productImage: imgResult.data.display_url,
  //   createdAt: new Date(),
  // };

  // // Save asset to assets collection
  // const res = await fetch("/assets", {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   body: JSON.stringify(asset),
  // });

  // if (res.ok) {
  //   Swal.fire({
  //     icon: "success",
  //     title: "Asset Added",
  //     text: "New asset has been added successfully",
  //   });
  //   reset();
  // }

  return (
    <div className="max-w-2xl mx-auto mt-16 my-bg shadow-xl rounded-2xl p-6">

      <div className="flex justify-center items-center gap-2">
        <FaProductHunt className="text-primary" size={30} />
      <span className="text-2xl font-bold my-text "> Add New Asset</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        {/* Product Name */}
        <label className="font-medium">Product Name</label>
        <input
          type="text"
          placeholder="Product Name"
          className="input-pro w-full"
          {...register("productName", { required: "Product name is required" })}
        />
        {errors.productName && (
          <p className="text-error text-sm">{errors.productName.message}</p>
        )}

        {/* Product Image */}
        <div className="space-y-2">
          <label className="font-medium">Your Photo</label>

          <label
            className="flex flex-col items-center justify-center w-full h-28 md:h-36 border-2 border-dashed rounded-xl cursor-pointer 
                      hover:border-primary transition bg-base-200/40"
          >
            <UploadCloud className="w-8 h-8 text-primary mb-2" />
            <p className="text-sm font-medium">
              Click to upload or drag & drop
            </p>
            <p className="text-xs opacity-60">PNG, JPG up to 2MB</p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("photo")}
            />
          </label>
        </div>

        {/* Product Type */}
        <label className="font-medium">Product Type</label>
        <select
          className="select input-pro w-full text-[#f77e52]"
          {...register("productType", { required: "Select product type" })}
        >
          <option value="">Select Product Type</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
        {errors.productType && (
          <p className="text-error text-sm">{errors.productType.message}</p>
        )}

        {/* Product Quantity */}
        <label className="font-medium">Product Quantity</label>
        <input
          type="number"
          min="1"
          placeholder="Product Quantity"
          className="input-pro w-full"
          {...register("productQuantity", {
            required: "Quantity is required",
            min: { value: 1, message: "Minimum quantity is 1" },
          })}
        />
        {errors.productQuantity && (
          <p className="text-error text-sm">{errors.productQuantity.message}</p>
        )}

        <button
          type="submit"
          className="btn bg-linear-to-r from-primary/80 rounded-lg to-secondary/80 w-full border-none"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Asset"}
        </button>
      </form>
    </div>
  );
};

export default AddAssets;
