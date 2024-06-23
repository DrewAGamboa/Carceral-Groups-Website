import { InteractiveBrowserCredential } from '@azure/identity';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { credOptions, storageUrl } from '../../authConfig';

/*
    Allow CORS for Azure Blob Storage
    Generate a SAS token for the container
    get the url of the uploaded file
    https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#cors
*/
const containerName = import.meta.env.VITE_AZURE_BLOB_CONTAINER_NAME as string;

export const getContainerClient = (): ContainerClient => {
    const defaultAzureCredential = new InteractiveBrowserCredential(credOptions);
    const blobServiceClient = new BlobServiceClient(storageUrl, defaultAzureCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    return containerClient
};

export const uploadFileToBlob = async (file: File): Promise<string> => {
    const containerClient = getContainerClient();
    const blobName = file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file);
    return blockBlobClient.url;
};
