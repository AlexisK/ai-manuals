import path from "path";
import * as fs from "fs";
import {getNewManual} from "./getNewManual";

const manualsSaveFilePath = path.join(__dirname, '../../../../manuals-save.json');

export class ManualsStorage {
    private static loadManuals() {
        if (!fs.existsSync(manualsSaveFilePath)) { return {}; }
        return JSON.parse(fs.readFileSync(manualsSaveFilePath, { encoding: 'utf8'}) ?? '{}');
    }

    private storage = ManualsStorage.loadManuals();

    constructor() {
    }

    private saveManuals() {
        fs.writeFileSync(manualsSaveFilePath, JSON.stringify(this.storage), { encoding: 'utf8'});
    }

    async getManual(name: string, lang: string): Promise<string> {
        const key = `${name}:${lang}`;

        if ( !this.storage[key] ) {
            this.storage[key] = await getNewManual(name, lang);
            this.saveManuals();
        }

        return this.storage[key];
    }
}

export const manualsStorage = new ManualsStorage();
