import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { FILE_PATHS } from '../enums/files';

let vectorStore: MemoryVectorStore | null = null;

export const generateOntologyVectorStore = async () => {
    // If we've already created and populated the store, just return it
    if (vectorStore) {
        return vectorStore;
    }

    // Otherwise, instantiate
    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: 'text-embedding-004',
    });
    vectorStore = new MemoryVectorStore(embeddings);

    // Load & add documents once
    const ontologyLoader = new TextLoader(FILE_PATHS.EDM_ONTOLOGY);
    const ontologyDocs = await ontologyLoader.load();

    // Optionally chunk your docs with a TextSplitter here if needed
    // ...
    await vectorStore.addDocuments(ontologyDocs);

    return vectorStore;
};
