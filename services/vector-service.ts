import { Chroma } from "@langchain/community/vectorstores/chroma"
import { bgeEmbedding } from "../libs/ollama"
import { env } from "../config/environment"
import type { Document } from "langchain/document"
import { chromadbClient } from "../libs/chromadb"
import {v4 as uuidV4} from 'uuid'


export const getVectorStore = (
) => {
    return  Chroma.fromExistingCollection(bgeEmbedding, {
        url : env.CHROMADB_URL,
        collectionName : env.COLLECTION_NAME
    })
}
export async function insertIntoVector(docs : Document[]): Promise<Chroma> {
   try{
    console.log('Inserting into vector ',docs.length)
    const collection = await chromadbClient.getOrCreateCollection({
        name : env.COLLECTION_NAME,
        embeddingFunction : {
            generate : async(text) => {
                return await Promise.all(text.map(async item => await bgeEmbedding.embedQuery(item)))
            }
        },
    })
    const embeddings = await Promise.all(docs.map(async(doc) => await bgeEmbedding.embedQuery(doc.pageContent)))
    console.log(JSON.stringify(docs, null, 2))
    const param = {
        ids : docs.map(() => uuidV4()),
        documents : docs.map(doc => doc.pageContent),
        embeddings,
        metadatas : docs.map(doc => ({source: doc.metadata?.source, fileName: doc.metadata?.fileName}))
    }
    console.log(param)
    await collection.upsert(param)
    // const vectorStore = await Chroma.fromDocuments(docs, bgeEmbedding, {
    //     collectionName : env.COLLECTION_NAME,
    //     url :env.CHROMADB_URL
    // })
    console.log('Done Insert ')
    return await getVectorStore()
   }catch(e){
    console.log('Error at insertIntoVector ',e)
    throw e
   }
}
