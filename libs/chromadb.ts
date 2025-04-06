import { ChromaClient } from "chromadb";
import { env } from "../config/environment";


export const chromadbClient = new ChromaClient({
    path : env.CHROMADB_URL,
})