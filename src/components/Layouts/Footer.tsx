import { FC } from "react";

const Footer: FC<{align?: 'left' | 'center' | 'right'}> = ({align = 'center'}) => {
    let textCenter
    if(align === 'left') textCenter = 'text-left'
    else if(align === 'center') textCenter = 'text-center'
    else if(align === 'right') textCenter = 'text-right'
    return <div className={`dark:text-white-dark p-6 pt-2 ${textCenter}`}>© {new Date().getFullYear()}. Vristo All rights reserved.</div>;
};

export default Footer;
