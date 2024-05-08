import { useState } from "react";
import ImageUploading, { ImageListType } from 'react-images-uploading';

const GoodsList = () => {
    const [images, setImages] = useState<ImageListType>([]);
    const maxNumber = 69;
  
    const onChange = (imageList: ImageListType, addUpdateIndex : number[] | undefined) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      imageList.forEach(img => console.log(img.file))
      setImages(imageList);
    };
    
    return (
      <div className="App">
        <ImageUploading
        //   multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={['png','jpg','jpeg']}
        >
          {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                选择图片
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={onImageRemoveAll}>全部删除</button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" width="200" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>重新选择</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => onImageRemove(index)}>删除</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
    )
}

export default GoodsList