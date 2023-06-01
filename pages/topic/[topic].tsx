import React from "react";
import {useRouter} from 'next/router';
import {getRouterValue, useArticle} from "../../client";
import {Template} from "../../client/components";

export const TopicPage: React.FC = () => {
    const router = useRouter();
    const topic = getRouterValue(router, 'topic');
    const lang = getRouterValue(router, 'lang') ?? 'English';
    const { article, isLoading } = useArticle(topic, lang);

    return <Template>
        <div>Topic page: {topic} in { lang }</div>
        { isLoading ? <div>Loading...</div> : <div dangerouslySetInnerHTML={{__html: article}} />}
    </Template>
};

export default TopicPage;
