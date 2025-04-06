import type { Chroma } from "@langchain/community/vectorstores/chroma"
import { PromptTemplate } from "@langchain/core/prompts"
import { RunnableSequence } from "@langchain/core/runnables";
import { ollamaDeepSeek } from "../libs/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";


type RagInput = {
    question : string
}

export async function createRagPipeline(vectoreStore: Chroma) : Promise<RunnableSequence<RagInput, string>>{
    try{
        const retriever = vectoreStore.asRetriever({
            
        })


        const promptTemplate = PromptTemplate.fromTemplate(`
            Answer the question based on the following context:
      
            Context: {context}
            
            Question: {question}
            
            Answer:
        `);    


        const ragChain = RunnableSequence.from([
            {
                context : async (input : RagInput ) => {
                    console.log(`Retrieving documents for question: ${input.question}`);
                    const docs = await retriever.invoke(input.question);
                    console.log(`Retrieved ${docs.length} documents`); 
                    const formattedDocs = docs.map(doc => {
                        const formattedDoc = `Source: ${doc.metadata?.source}\n${doc.pageContent}`
                        return formattedDoc
                    })
                    return formattedDocs
                },
                question : (input: RagInput) => input.question
            },
            promptTemplate,
            ollamaDeepSeek,
            new StringOutputParser()
        ])
        return ragChain
    }catch(e){
        console.log('Error at createRagPipeline ', e)
        throw e
    }
}