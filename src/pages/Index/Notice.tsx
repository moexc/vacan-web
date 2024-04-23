import { useEffect, useState } from "react"
import { guessLikesapi } from '../../config/api/shop';
import { useTranslation } from "react-i18next";

const Notice = () => {
    const {t} = useTranslation()

    useEffect(()=>{
        
    }, [])

    return (
        <div>
            Notice
        </div>
    )
}

export default Notice