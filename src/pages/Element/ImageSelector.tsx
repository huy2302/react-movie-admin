import React, { useState } from 'react';
import "../../css/imageSelector.css"
import user1 from "../../images/user-avt/user-1.jpg"
import user2 from "../../images/user-avt/user-2.jpg"
import user3 from "../../images/user-avt/user-3.jpg"
import user4 from "../../images/user-avt/user-4.jpg"

function ImageSelector() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Hàm xử lý khi click vào một hình ảnh
  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  return (
    <div>
      
    </div>
  );
}

export default ImageSelector;
