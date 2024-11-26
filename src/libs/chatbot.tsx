import OpenAI from "openai";

const assistantId = process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID || "";
const openAPIKey = process.env.NEXT_PUBLIC_OPENAI_KEY || "";
export const openai = new OpenAI({ apiKey: openAPIKey, dangerouslyAllowBrowser: true });

// Create a new thread
export async function createThread() {
  const thread = await openai.beta.threads.create();
  return Response.json({ threadId: thread.id });
}

// Create a new assistant
export async function createAssistant() {
    const assistant = await openai.beta.assistants.create({
      instructions: "You are a helpful assistant.",
      name: "Quickstart Assistant",
      model: "gpt-4o",
      tools: [
        { type: "code_interpreter" },
        {
          type: "function",
          function: {
            name: "get_weather",
            description: "Determine weather in my location",
            parameters: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "The city and state e.g. San Francisco, CA",
                },
                unit: {
                  type: "string",
                  enum: ["c", "f"],
                },
              },
              required: ["location"],
            },
          },
        },
        { type: "file_search" },
      ],
    });
    return Response.json({ assistantId: assistant.id });
}

// Send a new message to a thread
export async function sendMessageToThread(threadId: string, content: string) {
  
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    });
  
    const stream = openai.beta.threads.runs.stream(threadId, {
      assistant_id: assistantId,
    });
  
    return new Response(stream.toReadableStream());
}

export async function submitAction(runId: any, toolCallOutputs: any, threadId: string) {
    const stream = openai.beta.threads.runs.submitToolOutputsStream(
      threadId,
      runId,
      // { tool_outputs: [{ output: result, tool_call_id: toolCallId }] },
      { tool_outputs: toolCallOutputs }
    );
  
    return new Response(stream.toReadableStream());
  }