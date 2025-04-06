import fs from 'fs'
import { Document } from 'langchain/document'
import { MarkdownTextSplitter } from 'langchain/text_splitter'
import path from 'path'
import { getVectorStore, insertIntoVector } from '../services/vector-service'
import { bgeEmbedding } from '../libs/ollama'
import { env } from '../config/environment'
import { createRagPipeline } from '../services/rag-service'
import { configDotenv } from 'dotenv'


async function prepareMarkdownFiles(){
   const files = fs.readdirSync('./books')
                    .filter(file => file.endsWith('.md'))
                    .map(file => path.join('./books', file))

    const documents = files.map(filePath => {
        const fileResult = fs.readFileSync(filePath, {encoding:'utf-8'})
        const fileName = path.basename(filePath)
        return new Document({
            pageContent : fileResult,
            metadata : {
                fileName,
                source: filePath
            }
        })
    })

    const textSplitter = new MarkdownTextSplitter({
        chunkSize : 1000,
        chunkOverlap : 200
    })

    const splitDocs = await textSplitter.splitDocuments(documents)
    console.log(`Split ${documents.length} documents into ${splitDocs.length} chunks`);
    
    return splitDocs
}



async function main(){
    configDotenv()
    // prepare markdown files
    // const splittedDocs = await prepareMarkdownFiles()

   // store into vector
    // await insertIntoVector(splittedDocs)
    const vectorStore = await getVectorStore()

    console.log('Started')
   const ragChain = await createRagPipeline(vectorStore)

//    const res = await ragChain.invoke({
//     question : "Let me condition of Myanmar in recent years?"
//    })
// const res = await ragChain.invoke({
//         question : "Any polical changes in myanmar?"
//        })
       
const res = await ragChain.invoke({
        question : "How many ethnic groups in Myanamr?"
       })
   console.log(res)
   
}

main().catch(console.error)