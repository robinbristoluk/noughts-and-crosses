import React from 'react';
import useTypeText from '../Hooks/useTypeText';

export default () => {
    const typedText = useTypeText("Noughts and Crosses");

    return <h1>&nbsp;{typedText}&nbsp;</h1>
}