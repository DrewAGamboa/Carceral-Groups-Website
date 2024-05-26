import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
// import { DefaultAzureCredential } from '@azure/identity';


/*
    Allow CORS for Azure Blob Storage
    Generate a SAS token for the container
    get the url of the uploaded file
    https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#cors
*/
const containerName = import.meta.env.VITE_AZURE_BLOB_CONTAINER_NAME as string;

const storageUrl = "https://carceralwebmapstorage.blob.core.windows.net"
const credential = undefined;
export const getContainerClient = (token: string): ContainerClient => {
    console.log("token", token)
    // const defaultAzureCredential = new DefaultAzureCredential({token});
    const blobServiceClient = new BlobServiceClient(storageUrl, credential);
    return blobServiceClient.getContainerClient(containerName);
};

export const uploadFileToBlob = async (file: File, token: string): Promise<string> => {
    const containerClient = getContainerClient(token);
    const blobName = file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file);

    return blockBlobClient.url;
};
