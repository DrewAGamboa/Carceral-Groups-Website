-- Summary: This script calculates the number of documents for each location and category and inserts the results into the LocationDocumentStats table.
-- The script is intended to run to calculate all the statistics for all current documents in the database.

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
