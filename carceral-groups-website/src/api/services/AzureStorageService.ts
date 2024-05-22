import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';


/*
    Allow CORS for Azure Blob Storage
    Generate a SAS token for the container
    get the url of the uploaded file
    https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#cors
*/
const blobSasUrl = import.meta.env.VITE_AZURE_BLOB_SAS_URL as string;
const containerName = import.meta.env.VITE_AZURE_BLOB_CONTAINER_NAME as string;

const credential = undefined;

export const getContainerClient = (): ContainerClient => {
    const blobServiceClient = new BlobServiceClient(blobSasUrl, credential);
    return blobServiceClient.getContainerClient(containerName);
};

export const uploadFileToBlob = async (file: File): Promise<string> => {
    const containerClient = getContainerClient();
    const blobName = file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file);

    return blockBlobClient.url;
};
