import { FC } from 'react';

interface IconPushProp {
    className?: string;
    duotone?: boolean;
}

const IconPush: FC<IconPushProp> = ({ className, duotone = true }) => {
    return (
        <svg width="28" height="28" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path opacity={duotone ? '0.7' : '1'} fill={duotone ? 'currentColor' : 'white'} color='#000000' d="M477.636923 726.173538H272.502154a12.150154 12.150154 0 0 1-12.150154-12.150153V482.599385h473.422769a90.998154 90.998154 0 0 0 90.919385-90.899693v-76.366769a91.017846 91.017846 0 0 0-90.899692-90.919385H272.502154a91.017846 91.017846 0 0 0-90.919385 90.919385V714.043077a91.017846 91.017846 0 0 0 90.919385 90.919385h205.134769a39.384615 39.384615 0 0 0 39.384615-39.384616 39.384615 39.384615 0 0 0-39.384615-39.404308zM260.352 315.313231a12.150154 12.150154 0 0 1 12.150154-12.150154h461.292308a12.150154 12.150154 0 0 1 12.130461 12.150154v76.366769a12.169846 12.169846 0 0 1-12.150154 12.130462H260.352z"></path>
            <path opacity={duotone ? '0.7' : '1'} fill={duotone ? 'currentColor' : 'white'} color='#000000' d="M840.802462 633.324308l-86.803693-87.453539a39.384615 39.384615 0 0 0-55.689846-0.196923 39.384615 39.384615 0 0 0-0.196923 55.709539l20.164923 20.302769h-129.339077a39.384615 39.384615 0 0 0-39.384615 39.384615 39.384615 39.384615 0 0 0 39.384615 39.384616h129.339077l-20.164923 20.302769a39.384615 39.384615 0 0 0 0.196923 55.709538 39.246769 39.246769 0 0 0 27.746462 11.421539 39.207385 39.207385 0 0 0 27.943384-11.638154l86.803693-87.433846a39.384615 39.384615 0 0 0 0-55.492923z"></path>
        </svg>
    );
};

export default IconPush;
