import { FC } from 'react';

interface IconShelveProp {
    className?: string;
    duotone?: boolean;
}

const IconShelve: FC<IconShelveProp> = ({ className, duotone = true }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path opacity={duotone ? '0.7' : '1'} fill={duotone ? 'currentColor' : 'white'} color='#000000' d="M704 288h130.986667c8.704 0 15.872 2.645333 21.546666 7.978667a35.114667 35.114667 0 0 1 10.496 20.992L886.016 512h-64l-16-160H704v96a31.146667 31.146667 0 0 1-8.96 23.04 31.146667 31.146667 0 0 1-23.04 8.96 31.146667 31.146667 0 0 1-23.04-8.96 31.146667 31.146667 0 0 1-8.96-23.04V352H384v96a31.146667 31.146667 0 0 1-8.96 23.04 31.146667 31.146667 0 0 1-23.04 8.96 31.146667 31.146667 0 0 1-23.04-8.96 31.146667 31.146667 0 0 1-8.96-23.04V352H217.984l-50.986667 512h344.96v64H130.986667a30.378667 30.378667 0 0 1-23.466667-10.496 28.885333 28.885333 0 0 1-7.466667-24.533333L157.013333 317.013333a35.328 35.328 0 0 1 10.496-20.992 30.08 30.08 0 0 1 21.504-7.978666H320v-22.016c1.365333-57.344 20.010667-105.002667 56.021333-143.018667 35.968-37.973333 81.322667-57.642667 135.978667-59.008 54.698667 1.365333 100.010667 21.034667 136.021333 59.008 35.968 37.973333 54.613333 85.674667 55.978667 143.018667v22.016z m-64 0v-22.016c-0.64-39.338667-13.141333-72.021333-37.504-98.005333-24.32-26.026667-54.485333-39.338667-90.496-40.021334-36.010667 0.682667-66.176 13.994667-90.496 40.021334-24.32 26.026667-36.821333 58.666667-37.504 98.005333v22.016h256z m200.96 484.010667L768 697.984v230.016a31.146667 31.146667 0 0 1-8.96 23.04 31.146667 31.146667 0 0 1-23.04 8.96 31.146667 31.146667 0 0 1-23.04-8.96 31.146667 31.146667 0 0 1-8.96-23.04v-230.016l-72.96 74.026667c-9.386667 8.661333-19.882667 11.306667-31.530667 7.978666a29.781333 29.781333 0 0 1-22.016-22.485333 30.848 30.848 0 0 1 7.509334-30.506667l128-128a31.616 31.616 0 0 1 22.997333-10.026666c8.661333 0 16.341333 3.370667 23.04 10.026666l128 128a30.933333 30.933333 0 0 1 7.466667 30.506667 29.738667 29.738667 0 0 1-22.016 22.485333c-11.690667 3.328-22.186667 0.682667-31.488-7.978666z"></path>
        </svg>
    );
};

export default IconShelve;
