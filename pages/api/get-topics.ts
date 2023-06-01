import {manualsStorage} from "../../server";

export default async function (req, res) {
    res.send(manualsStorage.getCachedTopics().map(str => {
        const [topic, language] = str.split(':');
        return {topic, language};
    }));
}
