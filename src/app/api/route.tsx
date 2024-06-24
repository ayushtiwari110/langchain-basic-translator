import { ChatVertexAI } from "@langchain/google-vertexai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function POST(req: Request) {

  const {text, language} = await req.json();
  console.log(text, language);
  
  const model = new ChatVertexAI({
    model: "gemini-1.5-pro",
    temperature: 0,
    authOptions: {
      projectId: process.env.PROJECT_ID,
    }
  });
  const parser = new StringOutputParser();
  const systemTemplate = `Translate the following into {language}:`;
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
  ]);
  const chain = promptTemplate.pipe(model).pipe(parser)
  const response = await chain.invoke({language, text})
  console.log(response)
  return Response.json({ response })
}
  
  
  // const chain = model.pipe(parser);
  // const messages = [
  //   new SystemMessage("Translate the following from English into Italian"),
  //   new HumanMessage("hi!"),
  // ];
  // const result = await model.invoke(messages)
  // console.log(await chain.invoke(messages))
  // const result = await promptTemplate.invoke({ language: "italian", text: "hi" });
  // result.toChatMessages()
  // const data = await res.json()
  
  // return Response.json({ data })