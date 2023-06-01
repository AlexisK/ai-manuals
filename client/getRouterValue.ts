import {NextRouter} from "next/router";

export function getRouterValue(router: NextRouter, key: string): string | undefined {
    const val = router.query[key];
    if ( !val ) return;
    if ( typeof val === "object" ) return decodeURIComponent(val[0]);
    return decodeURIComponent(val);
}
