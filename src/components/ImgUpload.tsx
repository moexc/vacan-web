import { useField } from "formik";
import { FC,} from "react";
import FileUpload, { FileType } from "./FileUpload";
import { toast } from "./Toast";

const ImgUpload: FC <{
    name: string
    maxFileCount: number
    maxFileSize: number
    width: string
}> = ({name, maxFileCount, maxFileSize, width}) => {
    const [field, meta, helper] = useField({ name })
    const { value } = meta
    const { setValue, setTouched } = helper

    const onImgChange = (fileType: FileType[]) => {
        setValue(maxFileCount == 1 ? fileType[0]?.url : fileType.map(v => v.url))
    }

    const onFaild = (msg: string) => {
        toast(msg, 'warning')
        setTouched(true)
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
        onChange={fileType => onImgChange(fileType)}
        onFaild={msg => onFaild(msg)}
        />
    )
}

export default ImgUpload