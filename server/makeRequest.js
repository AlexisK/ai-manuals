const apiKey = process.env.OPENAI_API_KEY;

export async function makeRequest(messages) {
    if (!apiKey) {
        throw new Error('No API key! Add .env file with OPENAI_API_KEY');
    }
    console.log('Requesting', messages);
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
    const result = await resp.json();
    console.log(result);
    return result;
}
