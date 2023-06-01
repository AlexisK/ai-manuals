import {useEffect, useState} from "react";
import {httpReq} from "./httpReq";

export function useArticle(topic: string, language: string = 'English') {
    const [isLoading, setIsLoading] = useState(false);
    const [article, setArticle] = useState<string>('');

    useEffect(() => {
        if ( !topic ) {
            return;
        }
        setIsLoading(true);
        httpReq("/api/generate", {
            topic,
            language,
        })
            .then(data => {
                setArticle(data.article);
            })
            .catch(err => {
                console.error(err);
                alert(err.message);
                setIsLoading(false);
            })
            .finally(() => setIsLoading(false));

    }, [topic, language]);

    return {article, isLoading};
}
