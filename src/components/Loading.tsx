import { FC } from "react"

const Loading:FC<{height?: number}> = ({height = 300}) => {
    return (
        <div style={{minHeight: `${height}px`}} className='flex items-center justify-center'>
                <span className='animate-spin border-8 border-[#f1f2f3] border-l-primary rounded-full inline-block align-middle m-auto w-20 h-20'/>
        </div>
    )
}

export default Loading