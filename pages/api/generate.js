import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";

const config = {
  apiKey: process.env.OPENAI_API_KEY,
};

async function makeRequest(messages) {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
    })
  });
  return resp.json();
}

export default async function (req, res) {
  if (!config.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const topic = req.body.topic ?? '';
  const lang = req.body.language ?? 'English';

  if (topic.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid topic",
      }
    });
    return;
  }

  try {
    const resp = await makeRequest([
        { role: 'user', content: generatePrompt({topic, lang})}
    ]);
    console.log(resp);
    res.status(200).json({ result: resp?.choices[0]?.message?.content ?? '[NO CONTENT]' });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt({topic, lang}) {
  const formattedTopic =
    `"${topic[0].toUpperCase()}${topic.slice(1).toLowerCase()}"`;
  return `Topic: ${formattedTopic}

Please generate a comprehensive manual that provides step-by-step instructions, guidelines, and tips on how to effectively ${formattedTopic}. \
Your manual should cover all aspects of the process, including preparation, execution, troubleshooting, and best practices. \
Use ${lang} language, format output in HTML with links where applicable.

Consider including the following sections in your manual:

Introduction: Provide an overview of the topic and its importance, as well as a brief explanation of the manual's structure.
Getting Started: Outline the necessary tools, equipment, or software required to perform the ${formattedTopic}. Include any safety precautions or prerequisites.
Step-by-Step Instructions: Break down the process into clear, sequential steps. Include detailed descriptions, diagrams, or visuals to assist the reader.
Troubleshooting: Anticipate common issues or challenges that readers may encounter during the process. Provide troubleshooting tips, solutions, or workarounds.
Best Practices: Offer expert advice and recommendations to help readers achieve optimal results. Share any pro-tips, shortcuts, or strategies that can enhance their performance.
Frequently Asked Questions (FAQs): Compile a list of commonly asked questions related to the ${formattedTopic}. Provide concise and informative answers to address readers' queries.
Glossary: Include a glossary of relevant terms or jargon used in the manual to assist readers in understanding the terminology.
Additional Resources: Provide a list of recommended books, websites, videos, or other resources that readers can explore for further learning or reference.
Please ensure that the generated manual is clear, concise, and user-friendly. Focus on providing accurate information and helpful guidance to enable readers to successfully perform the ${formattedTopic}.
`; // Feel free to use your creativity and expertise to generate the best manual possible.
}
