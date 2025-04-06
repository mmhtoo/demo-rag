import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import { env } from "../config/environment";

export const bgeEmbedding = new OllamaEmbeddings({
    baseUrl : env.OLLAMA_URL,
    model: env.EMBEDDING_MODEL_NAME
})

export const ollamaDeepSeek = new Ollama({
    baseUrl : env.OLLAMA_URL,
    model : env.LLM_NAME
})