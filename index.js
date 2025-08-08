export default {
  async fetch(request) {
    // Block non-POST requests (optional but recommended)
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Get user input from the frontend
    const { prompt } = await request.json();

    // Call Hugging Face API (token is hidden in environment variables)
    const response = await fetch("https://api-inference.huggingface.co/models/deepseek-ai/deepseek-llm", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    // Return AI response to the frontend
    return response;
  }
};
