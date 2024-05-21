import { PropsWithChildren } from 'react';
import App from '../../App';
import BlankHeader from './BlankHeader';
import Footer from './Footer';

const BlankLayout = ({ children, header = true }: PropsWithChildren<{header?: boolean}>) => {
    return (
        <App>
            <div className='min-h-screen'>
                {header && <BlankHeader/>}
                <div className="text-black dark:text-white-dark" style={{minHeight: 'calc(100vh - 110px)'}}>{children} </div>
                {header && <Footer align='center'/>}
            </div>
        </App>
    );
};

export default BlankLayout;
