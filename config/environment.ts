
export const env = {
    CHROMADB_URL : process.env.CHROMADB_URL || 'http://localhost:8000',
    CHROMADB_USERNAME: process.env.CHROMADB_USERNAME || 'root',
    CHROMADB_PASSWORD : process.env.CHROMADB_PASSWORD || 'root@123',
    COLLECTION_NAME : process.env.COLLECTION_NAME || 'books',
    OLLAMA_URL : process.env.OLLAMA_URL || 'http://localhost:11434',
    EMBEDDING_MODEL_NAME : process.env.EMBEDDING_MODEL_NAME || 'bge-m3:latest',
    LLM_NAME : process.env.LLM_NAME || 'deepseek-r1:1.5b'
}
