import { FC, useEffect, useRef, useState } from "react"
import IconPlusCircle from "./Icon/IconPlusCircle"
import { sleep } from "../util/time"
import IconXCircle from "./Icon/IconXCircle"
import useSyncCallback from "../util/callbackState"

const FileUpload: FC<FileUploadOption> = (fileUploadOption: FileUploadOption) => {
    const {name, type = 'file', width = 350, imgView = 'w-20 h-20', maxFileCount = 1, maxFileSize, onFaild, onChange} = fileUploadOption
    const isImg = type === 'img'
    const fileInput = document.getElementById(name)

    const currentChangeIdRef = useRef(-1)
    const [files, setFiles] = useState<FileType[]>([])

    useEffect(() => {
        onChange(files)
    }, [files])

    const fileInputChange = (file: File) => {
        let currentChangeId = currentChangeIdRef.current
        currentChangeIdRef.current = -1

        if(maxFileSize && file.size > maxFileSize){
            onFaild && onFaild(file.name + '超出限定大小')
            return
        }

        if(currentChangeId === -1) {
            currentChangeId = new Date().getTime()
            setFiles(preState => [...preState, {id: currentChangeId, base64: "", file, status: 'uploading'}])
        }else{
            const newFile: FileType = {id: currentChangeId, base64: "", file, status: 'uploading'}
            modfiyFileType(newFile)
        }
        uploadFile(currentChangeId)
    }

    const uploadFile = useSyncCallback((currentChangeId: number) => {
        const fileType = files.filter(f => f.id === currentChangeId)[0]

        const reader = new FileReader();
        reader.readAsDataURL(fileType.file);
        reader.onload = async () => {
            await sleep(3000)
            const base64 = reader.result as string

            modfiyFileType({...fileType, base64, status: 'done'})
        }
        reader.onerror = (e) => {
            onFaild && onFaild(fileType.file.name + 'uploadFaild')
        }

    })

    const modfiyFileType = useSyncCallback((fileType: FileType) => {
        setFiles(
            files.map(item => {
                if(item.id === fileType.id){
                    return {...fileType}
                }else{
                    return item
                }
            })
        )
    })

    const delFile = useSyncCallback((index: number) => {
        files.splice(index, 1)
        setFiles([...files])
    })

    const updateFile = (id: number) => {
        currentChangeIdRef.current = id
        fileInput?.click()
    }

    return (
        <div className={`grid ${isImg ? 'grid-cols-4' : 'grid-cols-1'} w-[${width}px]`}>
            {files.map((fileType, index) => {
                return (
                    <div key={`${name}_${index}`} className={`${!isImg && 'mb-2 border-blue-100 border-2 rounded-lg'}`}>
                        <div onClick={() => {updateFile(fileType.id)}} 
                        className={`relative 
                        ${isImg && `${imgView} border-blue-100 border-2 rounded-xl flex items-center justify-center`}
                        }`}>
                            {fileType.status === 'uploading' && 
                            <span 
                            className={`animate-spin border-8 border-[#f1f2f3] border-l-primary rounded-full inline-block align-middle m-auto 
                            ${isImg ? {imgView} : 'w-4 h-4'}
                            `}/>
                            }
                            {isImg && fileType.status === 'done' && 
                            <img src={fileType.base64} alt={fileType.file.name} className={`${imgView} rounded-xl`} />
                            }
                            {!isImg && fileType.status === 'done' && 
                            <div className="rounded-sm h-6" >{fileType.file.name}</div>
                            }
                            <div onClick={(e) => {e.stopPropagation(); delFile(index)}}>
                                <IconXCircle className="absolute top-[-10px] right-[-10px]"/>
                            </div>
                        </div>
                    </div>
                )
            })}

            {files.length < maxFileCount && 
                <div onClick={() => updateFile(-1)} 
                className={`flex items-center justify-center border-gray-200 border-2 border-dashed rounded-xl ${isImg && `${imgView}`}`}
                >
                    <IconPlusCircle className='w-7 h-7' />
                </div>
            }
            
            <input type="file" className="hidden" id={name} onChange={(e: any) => {fileInputChange(e.target.files[0])}} />
        </div>
    )
}

export type FileUploadOption = {
    name: string,
    type?: 'img' | 'file'
    width?: number
    imgView?: string
    maxFileCount?: number
    maxFileSize?: number
    onFaild?: (msg: string) => void
    onChange: (fileTypes: FileType[]) => void
}

export type FileType = {
    id: number,
    file: File,
    base64: string,
    status: 'uploading' | 'done'
}

export default FileUpload