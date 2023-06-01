import {useEffect, useState} from "react";
import {httpReq} from "./httpReq";

export function useClarification(topic: string, language: string, sentence: string | undefined) {
    const [explanation, setExplanation] = useState<string | undefined>();

    useEffect(() => {
        if ( !sentence ) { return; }
        const input = sentence.trim();
        httpReq(
            `/api/clarify`,
            {
                topic,
                language,
                sentence: input
            }
        )
            .then(data => {
                if (data && data.explanation) {
                    setExplanation(data.explanation);
                }
            })
    }, [topic, language, sentence]);

    return {explanation};
}
