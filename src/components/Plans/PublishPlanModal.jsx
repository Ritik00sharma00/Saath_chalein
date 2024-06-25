import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IoMdClose } from "react-icons/io";

const ImageUpload = ({ field }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      field.onChange(file);
    }
  };

  return (
    <>
      <div
        className="cursor-pointer relative w-48 h-48 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden"
        onClick={() => document.getElementById('fileInput').click()}
      >
        {preview ? (
          <img src={preview} alt="Selected" className="w-full h-full object-cover" />
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <span>Click to upload</span>
          </div>
        )}
      </div>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />
    </>
  );
};

const PublishPlanModal = (props) => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data)
   

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-10">
       
      <div className="w-2/5 bg-white p-6 rounded-lg shadow-lg">
      <IoMdClose  size={24} className='right-3 z-10' onClick={props.closePlan()} />
        <h2 className="text-xl font-bold mb-4">Create a New Plan</h2>
        <form method='POST' onSubmit={handleSubmit(onSubmit)} >
          <div className="mb-4">
            <Controller
              name="image"
              control={control}
              defaultValue={null}
              render={({ field }) => <ImageUpload field={field} />}
            />
            {errors.image && <span className="text-red-500">{errors.image.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="plan-description" className="block text-gray-700 mb-2">
              Plan Description
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <textarea
                  id="plan-description"
                  {...field}
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Describe your plan..."
                />
              )}
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="plan-date" className="block text-gray-700 mb-2">
              Date
            </label>
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <input
                  type="date"
                  id="plan-date"
                  {...field}
                  className="w-full p-2 border rounded"
                />
              )}
            />
            {errors.date && <span className="text-red-500">{errors.date.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="members" className="block text-gray-700 mb-2">
              Members
            </label>
            <Controller
              name="members"
              control={control}
              rules={{ 
                required: "Number of members is required",
                min: { value: 1, message: "At least 1 member is required" }
              }}
              render={({ field }) => (
                <input
                  type="number"
                  id="members"
                  {...field}
                  className="w-full p-2 border rounded"
                  placeholder="Number of members"
                />
              )}
            />
            {errors.members && <span className="text-red-500">{errors.members.message}</span>}
          </div>
          <div className="flex justify-end">
            <button onClick={props.closePlan()}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Publish Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishPlanModal; 
