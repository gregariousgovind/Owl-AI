/* eslint-disable prettier/prettier */
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";

const tools = [];
async function callModel(state: typeof MessagesAnnotation.State) {
    const model = new ChatOpenAI({ model: "gpt-4o" }).bindTools(tools);
    const response = await model.invoke([
        { role: "system", content: `You are a helpful assistant. Date: ${new Date().toISOString()}.` },
        ...state.messages,
    ]);
    return { messages: response };
}

const workflow = new StateGraph(MessagesAnnotation)
    .addNode("callModel", callModel)
    .addEdge("__start__", "callModel")

export const graph = workflow.compile();
