
import Quill from "quill"
import 'quill/dist/quill.snow.css'
import { FC, PropsWithChildren, useEffect, useRef } from "react"
import './QuillEdit.css'

let quill
const QuillEdit: FC<{
    onChange: (data: string) => {}
}> = ({onChange}) => {

    const flag = useRef<boolean>(true)

    //富文本modules配置
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
        ["blockquote", "code-block"], // 引用，代码块
        [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
        [{ list: "ordered" }, { list: "bullet" }], // 列表
        [{ script: "super" }, { script: "sub" }], // 上下标
        [{ indent: "+1" }, { indent: "-1" }], // 缩进
        [{ direction: "rtl" }], // 文本方向
        [{ size: ["small", false, "large", "huge"] }], // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
        [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
        // [{ font: [] }], // 字体
        [{ align: [] }], // 对齐方式
        ["clean"], // 清除字体样式
        ["link", "image", "video"], // 上传图片、上传视频               // remove formatting button
    ];
    
    //富文本配置
    const options = {
        modules: {
            toolbar: toolbarOptions,
        },
        placeholder: "请输入...",
        theme: "snow",
    };

    const titleConfig: Map<string, string> = new Map([
        ['ql-bold','加粗'],
        ['ql-italic','斜体'],
        ['ql-underline','下划线'],
        ['ql-strike','删除线'],

        ['ql-blockquote','引用'],
        ['ql-code-block','代码块'],

        ['ql-direction','文本方向'],

        ['ql-size','字体大小'],
        ['ql-header','标题'],

        ['ql-color','颜色'],
        ['ql-background','背景颜色'],

        ['ql-font','字体'],

        ['ql-align','对齐方式'],

        ['ql-clean','清除字体样式'],

        ['ql-link','链接'],
        ['ql-image','图片'],
        ['ql-video','视频'],
    ])
        
    function addQuillTitle(){
        const oToolBar = document.querySelector('.ql-toolbar'), 
            aButton = oToolBar?.querySelectorAll('button'),
            aSpan = oToolBar?.querySelectorAll('span .ql-picker') || []
        aButton?.forEach(item => {
            if(item.className === 'ql-header'){
                item.value === '1' ? item.title = '一级标题' :
                item.value === '2' ? item.title = '二级标题' :
                item.value === '3' ? item.title = '三级标题' :
                item.value === '4' ? item.title = '四级标题' :
                item.value === '5' ? item.title = '五级标题' :
                item.value === '6' ? item.title = '六级标题' : ''
            }else if(item.className === 'ql-list'){
                item.value === 'ordered' ? '有序列表' :
                item.value === 'bullet' ? '无序列表' : ''
            }else if(item.className === 'ql-script'){
                item.value === 'sub' ? item.title = '下标': 
                item.value === 'super' ? item.title = '上标' : ''
            }else if(item.className === 'ql-indent'){
                item.value === '+1' ? item.title ='向右缩进': 
                item.value === '-1' ? item.title ='向左缩进' : ''
            }else{
                item.title = titleConfig.get(item.classList[0]) || '';
            }
        })
        aSpan?.forEach((item: any) => {
            const label = item.querySelector('.ql-picker-label')
            const classOne = item.classList[0]
            if(label) label.title = titleConfig.get(classOne) || ''
        })
    }

    useEffect(()=>{
        //重复挂载会出现两个ToolBar
        if (flag.current) {
            flag.current = false
            quill = new Quill('#quill-plane', options)
            addQuillTitle()
            return
        }
    },[])

    return (
        <div>
            <div id="quill-plane"></div>
        </div>
    )
    
}

export default QuillEdit