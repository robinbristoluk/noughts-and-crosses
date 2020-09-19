import {useState, useEffect} from 'react';

const useTypeText = (text, delayPerKeystroke = 100) => {

    const [typedText, setTypedText] = useState('');

    useEffect(() => {

        const timeout = setTimeout(() => {
            if (typedText.length < text.length) {
                setTypedText((oldText) => `${oldText}${text[oldText.length]}`);
            }
        }, delayPerKeystroke);

        return () => {
            clearTimeout(timeout);
        }

    }, [text, typedText, delayPerKeystroke]);

    return typedText;
}

export default useTypeText;