import React, {useMemo} from "react";
import {useArticleList} from "../useArticleList";
import Link from "next/link";

export const SavedArticlesList: React.FC = () => {
    const {articles} = useArticleList();

    return useMemo(() => <div>
        {articles.map(({topic, language}, i) =>
            <Link key={i} href={`topic/${topic}?lang=${encodeURIComponent(language)}`}>{topic} ({language})</Link>)}
    </div>, [articles]);
}
