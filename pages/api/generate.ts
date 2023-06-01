import {filterInput, manualsStorage} from "../../server";

const apiKey = process.env.OPENAI_API_KEY;


export default async function (req, res) {
    if (!apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    const topic = filterInput(req, 'topic');
    const language = filterInput(req, 'language') ?? 'English';

    if (topic.length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid topic",
            }
        });
        return;
    }

    try {
        res.status(200).json(await manualsStorage.getOrCreateManual({ topic, language }));
    } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: error.message,
                }
            });
        }
    }
}
