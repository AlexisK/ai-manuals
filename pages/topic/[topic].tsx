import React, {useState} from "react";
import {useRouter} from 'next/router';
import {getRouterValue, useArticle, useClarification} from "../../client";
import {Template} from "../../client/components";

function expandToWord(r) {
    if (r.collapsed) {
        return;
    }
    while (r.startOffset > 0 && r.toString()[0].match(/\w/)) {
        r.setStart(r.startContainer, r.startOffset - 1);
    }
    while (r.endOffset < r.endContainer.length && r.toString()[r.toString().length - 1].match(/\w/)) {
        r.setEnd(r.endContainer, r.endOffset + 1);
    }
}

export const TopicPage: React.FC = () => {
    const [selectedText, setSelectedText] = useState<string|undefined>();
    const [selectedTextPosition, setSelectedTextPosition] = useState<{x: number, y: number}>({x: 0, y: 0});
    const router = useRouter();
    const topic = getRouterValue(router, 'topic');
    const lang = getRouterValue(router, 'lang') ?? 'English';
    const { article, isLoading } = useArticle(topic, lang);
    const { explanation } = useClarification(topic, lang, selectedText);

    function onSelected(ev) {
        const selectionGetter = window.getSelection || document.getSelection;
        const rng = selectionGetter().getRangeAt(0);
        if ( rng.endOffset - rng.startOffset > 1 ) {
            expandToWord(rng);
            const word = rng.toString();
            const pos = rng.getBoundingClientRect();
            setSelectedTextPosition({x: pos.x + window.scrollX, y: pos.y + window.scrollY});
            setSelectedText(word);
        } else {
            setSelectedText(undefined);
        }
    }

    return <Template>
        <div>Topic page: {topic} in { lang }</div>
        { isLoading
            ? <div>Loading. It might take a while...</div>
            : <>
                <div onMouseUp={onSelected}><div dangerouslySetInnerHTML={{__html: article}} /></div>
                {selectedText ? <div className="explanation" style={
                    {
                        top:`${selectedTextPosition.y}px`,
                        left:`${selectedTextPosition.x}px`,
                    }
                }>{explanation ?? 'Loading...'}</div> : null}
            </>
        }
    </Template>
};

export default TopicPage;
