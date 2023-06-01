import path from "path";
import * as fs from "fs";
import {generatePrompt} from "./generatePrompt";
import {makeRequest} from "./makeRequest";

const manualsSaveFilePath = path.join(__dirname, '../../../../manuals-save.json');

export interface ManualSettings {
    topic: string;
    language: string;
}

export interface OpenAIMessage {
    role: string;
    content: string;
}

export type ManualData = ManualSettings & {
    article: string;
    conversation: OpenAIMessage[];
    clarifications: Record<string, string>
}

export class ManualsStorage {
    private static loadManuals() {
        if (!fs.existsSync(manualsSaveFilePath)) {
            return {};
        }
        return JSON.parse(fs.readFileSync(manualsSaveFilePath, {encoding: 'utf8'}) ?? '{}');
    }

    private storage = ManualsStorage.loadManuals();

    constructor() {
    }

    private saveManuals() {
        fs.writeFileSync(manualsSaveFilePath, JSON.stringify(this.storage), {encoding: 'utf8'});
    }

    async getManual(settings: ManualSettings): Promise<string> {
        const key = `${settings.topic}:${settings.language}`;

        if (!this.storage[key]) {
            this.storage[key] = await this.getNewManual(settings);
            this.saveManuals();
        }

        return this.storage[key];
    }

    async getNewManual(settings: ManualSettings) {
        const conversation: OpenAIMessage[] = [
            {role: 'user', content: generatePrompt({topic: settings.topic, lang: settings.language})}
        ];
        const resp = await makeRequest(conversation);
        if ( !resp?.choices && resp?.error?.message ) {
            console.log(resp);
            throw new Error(resp?.error?.message);
        }
        const content = resp?.choices[0]?.message?.content;
        if ( !content ) {
            console.log(resp);
            throw new Error('No content found!');
        }

        const newManual: ManualData = {
            ...settings,
            article: content,
            conversation: [...conversation, { role: 'system', content }],
            clarifications: {}
        }
        return newManual;
    }

    getCachedTopics() {
        return Object.keys(this.storage);
    }
}

export const manualsStorage = new ManualsStorage();
