import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";

const apiKey = process.env.OPENAI_API_KEY;

export async function makeRequest(messages) {
    if (!apiKey) {
        throw new Error('No API key! Add .env file with OPENAI_API_KEY');
    }
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages,
        })
    });
    return resp.json();
}
