import { useField } from "formik";
import { FC,} from "react";
import FileUpload, { Document } from "./FileUpload";

const ImgUpload: FC <{
    name: string
    maxFileCount: number
    maxFileSize: number
    width: string
}> = ({name, maxFileCount, maxFileSize, width}) => {
    const [field, meta, helper] = useField({ name })
    const { value } = meta
    const { setValue } = helper
    
    const onImgChange = (docs: Document[]) => {
        setValue(maxFileCount == 1 ? docs[0]?.url : docs.map(v => v.url))
    }

    return (
        <FileUpload
        name={name}
        values={(!value || value.length == 0) ? [] : (maxFileCount == 1 ? [value] : value)}
        type="img"
        width={width}
        maxFileCount={maxFileCount}
        maxFileSize={maxFileSize}
        acceptType={['jpg', 'png', 'jpeg']}
        onChange={docs => onImgChange(docs)}
        />
    )
}

export default ImgUpload