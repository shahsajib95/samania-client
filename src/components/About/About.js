import React, { useContext } from 'react';
import { LanguageContext } from '../context/Language';
import ReactHtmlParser from 'react-html-parser';

const About = () => {
    const { dataLang } = useContext(LanguageContext)
    const { text } = dataLang[0].about
    return (
        <div className="p-5">
            {ReactHtmlParser(text)}
        </div>
    );
};

export default About;