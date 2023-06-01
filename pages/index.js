import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [topicInput, setTopicInput] = useState("");
  const [langInput, setLangInput] = useState("English");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topicInput,
          language: langInput,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setIsLoading(false);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
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
        <div className={styles.result} dangerouslySetInnerHTML={{__html: result}} />
      </main>
    </div>
  );
}
