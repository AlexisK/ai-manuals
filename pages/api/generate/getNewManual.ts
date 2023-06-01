import {makeRequest} from "./makeRequest";
import {generatePrompt} from "./generatePrompt";

export async function getNewManual(topic: string, lang: string) {
    const resp = await makeRequest([
        {role: 'user', content: generatePrompt({topic, lang})}
    ]);
    console.log(resp);
    if ( !resp?.choices && resp?.error?.message ) {
        throw new Error(resp?.error?.message);
    }
    return resp?.choices[0]?.message?.content ?? '[NO CONTENT]';
}
