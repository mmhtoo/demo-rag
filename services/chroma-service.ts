import type { CollectionMetadata, ListCollectionsParams } from "chromadb"
import { chromadbClient } from "../libs/chromadb"


export async function createNewCollection(collectionName: string, metadata?: CollectionMetadata){
    try{
        return await chromadbClient.createCollection({
            name: collectionName,
            metadata 
        })
    }catch(e){
        console.log('Failed to createNewCollection ',e)
        throw e
    }

}

export async function getCollections(param : ListCollectionsParams = {limit : 100}){
    try{
        return await chromadbClient.listCollections(param)
    }catch(e){
        console.log('Failed to getCollections ',e)
        throw e
    }
}

export function heartbeat(){
    try{
        return chromadbClient.heartbeat()
    }catch(e){
        console.log('Failed to heartbeat ',e)
        throw e
    }
}