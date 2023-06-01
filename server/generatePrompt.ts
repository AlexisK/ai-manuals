export function generatePrompt({topic, lang}) {
    const formattedTopic =
        `"${topic[0].toUpperCase()}${topic.slice(1).toLowerCase()}"`;
    return `Topic: ${formattedTopic}

Please generate a comprehensive manual that provides step-by-step instructions, guidelines, and tips on how to effectively ${formattedTopic}. \
Your manual should cover all aspects of the process, including preparation, execution, troubleshooting, and best practices. \

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

Use ${lang} language, format output in HTML with links where applicable.
`; // Feel free to use your creativity and expertise to generate the best manual possible.
}
