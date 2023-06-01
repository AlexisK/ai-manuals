import React from "react";
import Head from "next/head";
import {Header} from "./Header";
import {SavedArticlesList} from "./SavedArticlesList";

export const Template: React.FC = ({children}) => {
    return <div>
        <Head>
            <title>AI Manuals</title>
        </Head>
        <main className="main">
            <Header />
            <div className="wrapper">
                <div className="sidebar">
                    <p>Saved articles:</p>
                    <SavedArticlesList />
                </div>
                <div className="content">
                {children}
                </div>
            </div>
        </main>
    </div>
}
