export function filterInput(req, key): string | undefined {
    if ( !req.body ) { return; }
    return (req.body[key] ?? [key]).replace(':', '').trim();
}
