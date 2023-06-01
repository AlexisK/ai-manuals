import path from "path";
import * as fs from "fs";
import {generatePrompt} from "./generatePrompt";
import {makeRequest} from "./makeRequest";
import {getContent} from "./getContent";

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

    async getManual(settings: ManualSettings): Promise<ManualData|undefined> {
        const key = `${settings.topic}:${settings.language}`;
        return this.storage[key];
    }

    async getOrCreateManual(settings: ManualSettings): Promise<ManualData> {
        const key = `${settings.topic}:${settings.language}`;

        if (!this.storage[key]) {
            this.storage[key] = await this.getNewManual(settings);
            this.saveManuals();
        }

        return this.storage[key];
    }

    async getNewManual(settings: ManualSettings) {
        const conversation: OpenAIMessage[] = [
            {role: 'system', content: 'You generate very detailed manuals'},
            {role: 'user', content: generatePrompt({topic: settings.topic, lang: settings.language})}
        ];
        const resp = await makeRequest(conversation);
        const content = getContent(resp);

        const newManual: ManualData = {
            ...settings,
            article: content,
            conversation: [
                ...conversation,
                {
                    role: 'assistant',
                    content: content.replace(/<[^>]+>/g, '') // replace html with text
                }
            ],
            clarifications: {}
        }
        return newManual;
    }

    getCachedTopics() {
        return Object.keys(this.storage);
    }
}

export const manualsStorage = new ManualsStorage();
