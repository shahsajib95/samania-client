
import React, { useState, createContext, useEffect } from 'react';
import BN from '../DB/Language/LanguageBN';
import EN from '../DB/Language/LanguageEN';

export const LanguageContext = createContext()

export const LanguageProvider = props => {

    const [language, setlanguage] = useState('en')
    const [dataLang, setdataLang] = useState(EN)

    useEffect(()=>{
        if(language === 'bn'){
            setdataLang(BN)
        }
        if(language === 'en'){
            setdataLang(EN)
        }
    },[dataLang, language])

    const data = {dataLang, setlanguage}
    return (
        <LanguageContext.Provider value={data}>
            {props.children}
        </LanguageContext.Provider>
    )

}