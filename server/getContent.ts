export function getContent(resp) {
    if ( !resp?.choices && resp?.error?.message ) {
        console.log(resp);
        throw new Error(resp?.error?.message);
    }
    const content = resp?.choices[0]?.message?.content;
    if ( !content ) {
        console.log(resp);
        throw new Error('No content found!');
    }
    return content;
}
