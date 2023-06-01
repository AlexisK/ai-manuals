export function httpReq(uri: string, data: any) {
    return fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(d => d.json())
}
