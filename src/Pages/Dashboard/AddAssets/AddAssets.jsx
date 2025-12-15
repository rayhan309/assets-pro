import { UploadCloud } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddAssets = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // 1️⃣ Upload image to ImgBB
      const imgData = new FormData();
      imgData.append("image", data.productImage[0]);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
        {
          method: "POST",
          body: imgData,
        }
      );

      const imgResult = await imgRes.json();

      if (!imgResult.success) {
        throw new Error("Image upload failed");
      }

      const asset = {
        productName: data.productName,
        productType: data.productType,
        productQuantity: parseInt(data.productQuantity),
        productImage: imgResult.data.display_url,
        createdAt: new Date(),
      };

      // 2️⃣ Save asset to assets collection
      const res = await fetch("/assets", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(asset),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Asset Added",
          text: "New asset has been added successfully",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 glass-card shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Asset</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          className="btn bg-[#f77e52] border-none w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Asset"}
        </button>
      </form>
    </div>
  );
};

export default AddAssets;
