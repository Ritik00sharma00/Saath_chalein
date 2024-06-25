import { useState } from 'react';

const Imageupload = ({ field }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        field.onChange(file); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <div
        onClick={handleButtonClick}
        className="cursor-pointer relative w-48 h-48 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden"
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
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
};

export default Imageupload;
