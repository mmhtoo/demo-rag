import { configDotenv } from "dotenv"
import { getCollections } from "./services/chroma-service"
import { chromadbClient } from "./libs/chromadb"
import { bgeEmbedding } from "./libs/ollama"

async function main(){
    configDotenv()
    // await chromadbClient.deleteCollection({ name : 'books' })
    await chromadbClient.createCollection({
        name : 'books',
        metadata : {
            'embedding_size' : 1024
        },
        embeddingFunction :  {
            generate : async(text) => {
                return await Promise.all(text.map(async item => await bgeEmbedding.embedQuery(item)))
            }
        }
,    })
    const collection = await chromadbClient.getCollection({
        name : 'books',
        embeddingFunction :  {
            generate : async(text) => {
                return await Promise.all(text.map(async item => await bgeEmbedding.embedQuery(item)))
            }
        }
    })
    console.log(collection.metadata)
    // const collections = await getCollections()
    // console.log('collections ', collections)
}

main().catch(console.error)