BEGIN TRANSACTION;

-- Step 1: Clear the LocationStat table
TRUNCATE TABLE LocationDocumentStats;

-- Step 2: Insert new records with the current date and time
INSERT INTO LocationDocumentStats (CategoryId, InstitutionId, GeographicLocationId, DocumentCount, LastUpdated)
SELECT 
    CategoryId, 
    InstitutionId, 
    GeographicLocationId, 
    COUNT(DocumentId) AS DocumentCount,
    GETUTCDATE() AS LastUpdated
FROM 
    [dbo].[Documents]
GROUP BY 
    CategoryId, 
    InstitutionId, 
    GeographicLocationId;

COMMIT TRANSACTION;
