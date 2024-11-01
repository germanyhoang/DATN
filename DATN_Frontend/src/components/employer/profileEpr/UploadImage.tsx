// import React, { useState } from 'react';
// import { DropzoneArea } from 'react-dropzone';
// import { Resizer } from 'react-image-file-resizer';

// const UploadImage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageUpload = (files) => {
//     const image = files[0];

//     Resizer.imageFileResizer(
//       image,
//       300, // kích thước mới (độ rộng)
//       300, // kích thước mới (độ cao)
//       'JPEG', // định dạng ảnh mới
//       100, // chất lượng ảnh mới (từ 0-100)
//       0, // độ quay của ảnh mới (0, 90, 180, 270)
//       (uri) => {
//         setSelectedImage(uri);
//       },
//       'base64' // định dạng đầu ra (base64 hoặc blob)
//     );
//   };

//   return (
//     <div>
//       <DropzoneArea
//         acceptedFiles={['image/*']}
//         dropzoneText="Kéo và thả ảnh hoặc nhấp để tải lên"
//         onChange={handleImageUpload}
//       />
//       {selectedImage && (
//         <div>
//           <h2>Ảnh đã tải lên:</h2>
//           <img src={selectedImage} alt="Uploaded" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadImage;