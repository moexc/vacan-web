import { FC, useEffect, useRef, useState } from "react"
import IconPlusCircle from "./Icon/IconPlusCircle"
import { fileUploadApi } from "../config/api/file"
import { typeDefine } from "../util/fileType"
import IconError from "./IconError"
import { RefreshIconBtn, XCircleIconBtn } from "./IconBtn"

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
        onChange
    } = fileUploadOption

    const isImg = type === 'img'
    const fileInput = document.getElementById(name)
    const currentChangeIdRef = useRef(-1)
    const [accept, setAccept] = useState('')
    const selectedId = useRef(new Set<number>())
    const uploadingId = useRef(new Set<number>())

    useEffect(() => {
        setAccept(
            acceptType?.map(v => {
                return typeDefine.get(v)
            }).join(',') || ''
        )
    }, [])

    useEffect(() => {
        filesListen()
    }, [values])

    const filesListen = () => {
        values.forEach(doc => {
            if(doc.status === 'selected' && !selectedId.current.has(doc.id)) selectedExec(doc)
            if(doc.status === 'uploading' && !uploadingId.current.has(doc.id)) uploadingExec(doc)
        })
    }

    const selectedExec = (doc: Document) => {
        selectedId.current.add(doc.id)
        modfiyFiles({...doc, status: 'uploading'})
    }

    const uploadingExec = async (doc: Document) => {
        uploadingId.current.add(doc.id)
        const file = doc.file
        if(!file) {
            modfiyFiles({...doc, status: 'error', message: '获取文件失败'})
            return
        }

        const fileExt = doc.name.split('.').pop() || ''
        if(acceptType && !acceptType.includes(fileExt.toLocaleLowerCase())){
            modfiyFiles({...doc, status: 'error', message: '格式不正确'})
            return
        }

        if(maxFileSize && file.size > maxFileSize){
            modfiyFiles({...doc, status: 'error', message: '超出限定大小'})
            return
        }

        let res
        await fileUploadApi(file, (resData) => res = resData)

        if(!res) {
            modfiyFiles({...doc, status: 'error', message: '上传失败'})
            return
        }
        const {code, data: url, msg} = res
        if(code != 0){
            modfiyFiles({...doc, status: 'error', message: msg})
            return
        }
        modfiyFiles({...doc, status: 'done', url})
    }

    const modfiyFiles = (doc: Document, oper: 'add' | 'update' | 'delete' = 'update') => {
        let newDocs: Document[] = []
        if(oper === 'add'){
            newDocs = [...values, doc]
        }else if(oper === 'update'){
            newDocs = values.map(item => {
                if(item.id === doc.id) return doc
                else return item
            })
        }else if(oper === 'delete'){
            newDocs = values.filter(item => item.id != doc.id)
        }
        onChange(newDocs)
    }

    const addFile = (file: File) => {
        let currentChangeId = currentChangeIdRef.current
        currentChangeIdRef.current = -1

        if(currentChangeId === -1) {
            modfiyFiles({id: new Date().getTime(), file, name: file.name, status: 'selected', url: '', message: ''}, 'add')
        } else {
            selectedId.current.delete(currentChangeId)
            uploadingId.current.delete(currentChangeId)
            modfiyFiles({id: currentChangeId, file, name: file.name, status: 'selected', url: '', message: ''})
        }
    }

    const reupload = (index: number) => {
        const currentDoc = values[index]
        uploadingId.current.delete(currentDoc.id)
        modfiyFiles({...currentDoc, status: 'uploading'})
    }

    const delFile = (index: number) => {
        modfiyFiles(values[index], 'delete')
    }

    const updateFile = (id: number) => {
        currentChangeIdRef.current = id
        fileInput?.click()
    }

    return (
        useDefaultView ? 
        <div className={`grid ${isImg ? 'grid-cols-4' : 'grid-cols-1'} ${width}`}>
            {values.map((doc, index) => {
                return (
                    <div key={`${name}_${index}`} className={`${!isImg ? 'mb-2 border-blue-100 border-b-2 hover:bg-gray-200' : ''}`}>
                        <div onClick={() => {updateFile(doc.id)}} 
                        className={`relative ${isImg ? `${imgView} border-blue-100 border-2 rounded-xl flex items-center justify-center` : 'h-6'} `}>
                            {doc.status === 'uploading' && 
                            <span 
                            className={`animate-spin border-8 border-[#f1f2f3] border-l-primary rounded-full inline-block align-middle m-auto 
                            ${isImg ? {imgView} : 'w-4 h-4'}
                            `}/>
                            }
                            {isImg && doc.status === 'done' && 
                            <img src={doc.url} alt={doc.name} className={`${imgView} rounded-xl`} />
                            }
                            {!isImg && doc.status === 'done' && 
                            <div className="rounded-sm h-6 ml-2" >{doc.name}</div>
                            }
                            {isImg && doc.status === 'error' && 
                            <div className={`${imgView} flex items-center justify-center`}>
                                <IconError className='h-16 w-16'/>
                                <span className="text-xs">{doc.message ? doc.message : '上传失败'}</span>
                            </div>
                            }
                            {!isImg && doc.status === 'error' && 
                            <div className="rounded-sm h-6 ml-2 text-red-500">{doc.message ? doc.message : '上传失败'}</div>
                            }
                            {doc.status === 'error' && 
                            <div>
                                <RefreshIconBtn onClick={() => {reupload(index)}} className={`absolute ${isImg ? 'top-[-10px] right-[10px]' : 'bottom-[0px] right-[20px]'}`}/>
                            </div>
                            }
                            <div >
                                <XCircleIconBtn onClick={() => {delFile(index)}} className={`absolute ${isImg ? 'top-[-10px] right-[-10px]' : 'bottom-[0px] right-[0px]'}`}/>
                            </div>
                        </div>
                    </div>
                )
            })}
            {values.length < maxFileCount && 
                <div onClick={() => updateFile(-1)} 
                className={`flex items-center justify-center border-gray-200 border-2 border-dashed rounded-xl ${isImg && imgView}`}
                >
                    <IconPlusCircle className='w-7 h-7' />
                </div>
            }

            <input type="file" accept={accept} className="hidden" id={name} onChange={(e: any) => {addFile(e.target.files[0])}} />
        </div>
        : null
    )
}

export type FileUploadOption = {
    name: string,
    acceptType?: string[]
    values?: Document[]
    useDefaultView?: boolean
    type?: 'img' | 'file'
    width?: string
    imgView?: string
    maxFileCount?: number
    maxFileSize?: number
    onChange: (docs: Document[]) => void
}

export type Document = {
    id: number
    file?: File
    name: string
    url: string
    status: 'selected' | 'uploading' | 'done' | 'error'
    message?: string
}

export default FileUpload