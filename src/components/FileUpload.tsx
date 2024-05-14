import { FC, useEffect, useRef, useState } from "react"
import IconPlusCircle from "./Icon/IconPlusCircle"
import IconXCircle from "./Icon/IconXCircle"
import { fileUploadApi } from "../config/api/file"
import { typeDefine } from "../util/fileType"

const FileUpload: FC<FileUploadOption> = (fileUploadOption: FileUploadOption) => {
    const {
        name, 
        values = [], 
        acceptType,
        useDefaultView = true, 
        type = 'file', 
        width = 'w-[350px]', 
        imgView = 'w-20 h-20', 
        maxFileCount = 1, 
        maxFileSize, 
        onFaild, 
        onChange
    } = fileUploadOption
    const isImg = type === 'img'
    const fileInput = document.getElementById(name)

    const currentChangeIdRef = useRef(-1)
    const [accept, setAccept] = useState('')
    const [files, setFiles] = useState<FileType[]>([])

    useEffect(() => {
        setAccept(
            acceptType?.map(v => {
                return typeDefine[v]
            }).join(',') || ''
        )
    }, [])

    useEffect(() => {
        setFiles(values.map(v => {
            return {id: new Date().getTime() + Math.random(), url: v, name: v.split('/').pop()}
        }))
    },[values])

    useEffect(() => {
        onChange(files)
    }, [])

    const fileInputChange = async (file: File) => {
        let currentChangeId = currentChangeIdRef.current
        currentChangeIdRef.current = -1

        if(!file){
            onFaild && onFaild('获取文件失败')
            return
        }

        const filename = file.name
        if(maxFileSize && file.size > maxFileSize){
            onFaild && onFaild(`${filename}: 超出限定大小`)
            return
        }

        const fileExt = file.name.split('.').pop() || ''
        if(acceptType && !acceptType.includes(fileExt.toLocaleLowerCase())){
            onFaild && onFaild(`${filename}: 格式不正确`)
            return
        }

        let res
        await fileUploadApi(file, (resData) => {
            res = resData
        })

        if(!res) {
            onFaild && onFaild(`${filename}: 上传失败`)
            return
        }
        const {code, data: url, msg} = res
        if(code != 0){
            onFaild && onFaild(msg)
            return
        }
        let newFiles
        if(currentChangeId === -1) {
            newFiles = [...files, {id: new Date().getTime(), url , name: filename}]
        } else {
            newFiles = files.map(item => {
                if(item.id === currentChangeId){
                    return {id: currentChangeId, url , name: filename}
                }else{
                    return item
                }
            })
        }
        setFiles(newFiles)
        onChange(newFiles)
    }

    const delFile = (index: number) => {
        files.splice(index, 1)
        setFiles([...files])
        onChange([...files])
    }

    const updateFile = (id: number) => {
        currentChangeIdRef.current = id
        fileInput?.click()
    }

    return (
        useDefaultView ? 
        <div className={`grid ${isImg ? 'grid-cols-4' : 'grid-cols-1'} ${width}`}>
            {files.map((fileType, index) => {
                return (
                    <div key={`${name}_${index}`} className={`${!isImg && 'mb-2 border-blue-100 border-b-2 hover:bg-gray-200'}`}>
                        <div onClick={() => {updateFile(fileType.id)}} 
                        className={`relative 
                        ${isImg && `${imgView} border-blue-100 border-2 rounded-xl flex items-center justify-center`}
                        }`}>
                            {isImg ? <img src={fileType.url} alt={fileType.name} className={`${imgView} rounded-xl`} />
                                    :<div className="rounded-sm h-6 ml-2" >{fileType.name}</div>
                            }
                            <div onClick={(e) => {e.stopPropagation(); delFile(index)}}>
                                <IconXCircle className={`absolute ${isImg ? 'top-[-10px] right-[-10px]' : 'bottom-[0px] right-[0px]'}`}/>
                            </div>
                        </div>
                    </div>
                )
            })}

            {files.length < maxFileCount && 
                <div onClick={() => updateFile(-1)} 
                className={`flex items-center justify-center border-gray-200 border-2 border-dashed rounded-xl ${isImg && imgView}`}
                >
                    <IconPlusCircle className='w-7 h-7' />
                </div>
            }
            
            <input type="file" accept={accept} className="hidden" id={name} onChange={(e: any) => {fileInputChange(e.target.files[0])}} />
        </div>
        : null
    )
}

export type FileUploadOption = {
    name: string,
    acceptType?: string[]
    values?: string[]
    useDefaultView?: boolean
    type?: 'img' | 'file'
    width?: string
    imgView?: string
    maxFileCount?: number
    maxFileSize?: number
    onFaild?: (msg: string) => void
    onChange: (fileTypes: FileType[]) => void
}

export type FileType = {
    id: number,
    name?: string,
    url: string,
}

export default FileUpload