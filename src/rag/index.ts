import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { FILE_PATHS } from '../enums/files';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

let vectorStore: MemoryVectorStore | null = null;

export const generateOntologyVectorStore = async () => {
    if (vectorStore) {
        return vectorStore;
    }

    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: 'text-embedding-004',
    });
    vectorStore = new MemoryVectorStore(embeddings);

    const ontologyLoader = new TextLoader(FILE_PATHS.EDM_ONTOLOGY);
    const ontologyDocs = await ontologyLoader.load();

    // can optionally chunk before adding
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000, // Size of each chunk (in characters)
        chunkOverlap: 200, // Overlap between chunks (in characters)
    });

    const chunkedDocs = await textSplitter.splitDocuments(ontologyDocs);
    await vectorStore.addDocuments(chunkedDocs);

    return vectorStore;
};
