import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeDocument(text: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that analyzes documents and provides clear, concise summaries and insights. Format your response in JSON when appropriate."
        },
        {
          role: "user",
          content: `Please analyze the following document and provide a structured analysis with key metrics, insights, and recommendations:\n\n${text}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    return response.choices[0].message.content || 'No analysis available.';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze document. Please try again.');
  }
}

export async function convertToStructuredData(text: string): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Convert the provided text into a structured JSON format, organizing key information into appropriate categories."
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    const jsonResponse = response.choices[0].message.content;
    return jsonResponse ? JSON.parse(jsonResponse) : null;
  } catch (error) {
    console.error('OpenAI Conversion Error:', error);
    throw new Error('Failed to convert document to structured data');
  }
}