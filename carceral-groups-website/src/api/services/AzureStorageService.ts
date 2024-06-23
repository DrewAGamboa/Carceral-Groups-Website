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

// const credential = undefined;
export const getContainerClient = (): ContainerClient => {
    const defaultAzureCredential = new InteractiveBrowserCredential(credOptions);
    console.log("TODO_defaultAzureCredential", defaultAzureCredential)
    const blobServiceClient = new BlobServiceClient(storageUrl, defaultAzureCredential);
    console.log("TODO_blobServiceClient", blobServiceClient, containerName)
    const containerClient = blobServiceClient.getContainerClient(containerName);
    console.log("TODO_containerClient", containerClient)
    return containerClient
};

export const uploadFileToBlob = async (file: File): Promise<string> => {
    const containerClient = getContainerClient();
    const blobName = file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.log("TODO_uploadFileToBlob", containerClient, blockBlobClient, file)
    await blockBlobClient.uploadData(file);
    console.log("TODO_blockblob", blockBlobClient, blockBlobClient.url)
    return blockBlobClient.url;
};
