import {filterInput, getContent, makeRequest, manualsStorage} from "../../server";

export default async function (req, res) {

    const topic = filterInput(req, 'topic');
    const sentence = filterInput(req, 'sentence');
    const language = filterInput(req, 'language') ?? 'English';

    const manual = await manualsStorage.getManual({ topic, language });

    if (!manual) {
        res.send(`There is no manual ${topic} ( ${language} )`);
    }

    const { conversation, clarifications } = manual;

    if ( !clarifications[sentence] ) {
        const resp = await makeRequest([...conversation, {role: 'user', content: `Explain the following: "${sentence}" in 1 sentence.`}]);
        clarifications[sentence] = getContent(resp);
    }

    res.send({ explanation: clarifications[sentence]});
}
