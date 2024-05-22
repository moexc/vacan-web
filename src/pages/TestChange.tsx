import { useEffect, useRef, useState } from "react"

type Document = {
    id: number
    // file: File
    status: 'selected' | 'uploading' | 'done' | 'error'
    message: string
}

const TestChange = () => {

    const [files, setFiles] = useState<Document[]>([])
    const selectedId = useRef(new Set<number>())
    const uploadingId = useRef(new Set<number>())

    useEffect(() => {
        console.log(files);
        filesListen()
    }, [files])

    const filesListen = () => {
        files.forEach(doc => {
            if(doc.status === 'selected' && !selectedId.current.has(doc.id)) selectedExec(doc)
            if(doc.status === 'uploading' && !uploadingId.current.has(doc.id)) uploadingExec(doc)
        })
    }

    const selectedExec = (doc: Document) => {
        selectedId.current.add(doc.id)
        setTimeout(() => {
            modfiyFiles({...doc, status: 'uploading'})
        }, 1000)
    }

    const uploadingExec = (doc: Document) => {
        uploadingId.current.add(doc.id)
        setTimeout(() => {
            modfiyFiles({...doc, status: 'error'})
        }, 3000)
    }

    const modfiyFiles = (doc: Document) => {
        setFiles(bfiles => 
            bfiles.map(item => {
                if(item.id === doc.id) return doc
                else return item
            })
        )
    }

    const add = () => {
        const id = new Date().getTime()
        setFiles((bfiles) => [...bfiles, {id: id, status: 'selected', message: ''}])
    }

    const reupload = (id: number) => {
        uploadingId.current.delete(id)
        modfiyFiles({id, status: 'uploading', message: ''})
    }

    return(
        <div>
            {files.map(item => {
                return <div key={item.id}>{item.status}{item.status === 'error' && <button onClick={() => reupload(item.id)}>重试</button>}</div>
            })}
            <button onClick={add}>添加</button>
        </div>
    )
}

export default TestChange