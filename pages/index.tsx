import Head from "next/head";
import styles from "./index.module.css";
import {MainPage} from "./ui/main-page";

export default function Home() {
    return (
        <div>
            <Head>
                <title>OpenAI Quickstart</title>
            </Head>
          <main className={styles.main}>
            <MainPage/>
          </main>
        </div>
    );
}
