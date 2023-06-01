import {useEffect, useState} from "react";
import {httpReq} from "./httpReq";

export interface ArticleData {
    topic: string;
    language: string;
}

export function useArticleList() {
    const [isLoading, setIsLoading] = useState(false);
    const [articles, setArticles] = useState<ArticleData[]>([]);

    useEffect(() => {
        setIsLoading(true);
        httpReq('/api/get-topics', {})
            .then(data => {
                setArticles(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return {articles, isLoading};
}
