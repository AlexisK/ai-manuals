import React, {useState} from "react";
import styles from "../index.module.css";
import {SavedArticlesList} from "../../client/components";
import {useRouter} from "next/router";

export const MainPage: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [topicInput, setTopicInput] = useState("");
    const [langInput, setLangInput] = useState("English");

    async function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        const topic = topicInput.trim();
        const lang = langInput.trim();
        if ( !topic || !lang ) { return; }
        await router.push(`/topic/${topic}/?lang=${encodeURIComponent(lang)}`);
        setIsLoading(false);
    }

    return (
        <div>
            <h3>Generate Manual</h3>
            <form onSubmit={onSubmit}>
                <input
                    style={{ width: '320px' }}
                    type="text"
                    name="topic"
                    placeholder="Enter a topic"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                />
                <input
                    type="text"
                    name="language"
                    placeholder="Enter a language"
                    value={langInput}
                    onChange={(e) => setLangInput(e.target.value)}
                />
                <input type="submit" value="Generate manual" disabled={isLoading} />
            </form>
            <SavedArticlesList />
        </div>
    );
}
