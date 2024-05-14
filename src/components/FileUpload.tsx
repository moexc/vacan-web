import { FC, useEffect, useRef, useState } from "react"
import IconPlusCircle from "./Icon/IconPlusCircle"
import IconXCircle from "./Icon/IconXCircle"
import useSyncCallback from "../util/callbackState"
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
        
        setFiles(
            values.map(v => {
                return {id: new Date().getTime() + Math.random(), url: v, name: v.split('/').pop(), status: 'done'}
            })
        )
    },[])

    useEffect(() => {
        onChange(files)
    }, [files])

    const fileInputChange = (file: File) => {
        let currentChangeId = currentChangeIdRef.current
        currentChangeIdRef.current = -1

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

        if(currentChangeId === -1) {
            currentChangeId = new Date().getTime()
            setFiles(preState => [...preState, {id: currentChangeId, url: "", name: file.name, file, status: 'uploading'}])
        }else{
            const newFile: FileType = {id: currentChangeId, url: "", name: file.name, file, status: 'uploading'}
            modfiyFileType(newFile)
        }
        uploadFile(currentChangeId)
    }

    const uploadFile = useSyncCallback(async (currentChangeId: number) => {
        const fileType = files.filter(f => f.id === currentChangeId)[0]
        const {file, id} = fileType

        if(file){
            let res
            await fileUploadApi(file, (resData) => {
                res = resData
            })

            if(!res) {
                removeFileType(id)
                return
            }
            const {code, data: url, msg} = res
            if(code != 0){
                onFaild && onFaild(msg)
                removeFileType(id)
                return
            }
            modfiyFileType({...fileType, url, status: 'done'})
        }
    })

    const removeFileType = useSyncCallback((id: number) => {
        setFiles(
            files.filter(item => {
                return item.id !== id
            })
        )
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
        useDefaultView ? 
        <div className={`grid ${isImg ? 'grid-cols-4' : 'grid-cols-1'} ${width}`}>
            {files.map((fileType, index) => {
                return (
                    <div key={`${name}_${index}`} className={`${!isImg && 'mb-2 border-blue-100 border-b-2 hover:bg-gray-200'}`}>
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
                            <img src={fileType.url} alt={fileType.name} className={`${imgView} rounded-xl`} />
                            }
                            {!isImg && fileType.status === 'done' && 
                            <div className="rounded-sm h-6 ml-2" >{fileType.name}</div>
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
    file?: File,
    name?: string,
    url: string,
    status: 'uploading' | 'done'
}

export default FileUpload