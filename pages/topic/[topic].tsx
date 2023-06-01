import React from "react";
import {useRouter} from 'next/router';
import {getRouterValue, useArticle} from "../../client";

export const TopicPage: React.FC = () => {
    const router = useRouter();
    const topic = getRouterValue(router, 'topic');
    const lang = getRouterValue(router, 'lang') ?? 'English';
    const { article, isLoading } = useArticle(topic, lang);

    return <div>
        <div>Topic page: {topic} in { lang }</div>
        { isLoading ? <div>Loading...</div> : <div dangerouslySetInnerHTML={{__html: article}} />}
    </div>
};

export default TopicPage;
