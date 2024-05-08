import { useField } from "formik";
import { FC, useEffect, useState } from "react";
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import IconPlusCircle from './Icon/IconPlusCircle'

const ImgUpload: FC <{
    className?: string,
    name: string,
}> = ({className, name}) => {
    const [image, setImage] = useState<ImageType>();
    const [field, meta, helper] = useField({ name })
    const { value } = meta
    const { setValue } = helper

    const onChange = (imageList: ImageListType, addUpdateIndex : number[] | undefined) => {
        setValue(imageList[0] ? imageList[0].file : undefined)
        setImage(imageList[0])
    };

    return (
        <ImageUploading
        value={[]}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
        acceptType={['png','jpg','jpeg']}
        >
        {({ onImageUpload, onImageUpdate }) => (
            <div className={className}>
                {image ? (
                    <div>
                        <img src={image['data_url']} onClick={() => onImageUpdate(0)} className={className} />
                    </div>
                ):(
                    <div onClick={onImageUpload} className={`${className} w-20`}>
                        <IconPlusCircle className={`${className} w-20`} />
                    </div>
                )}
            </div>
        )}
        </ImageUploading>
    )
}

export default ImgUpload