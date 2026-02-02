// Configuration constants
const FEATURE_SERVICE_URL = 'https://services1.arcgis.com/oC086ufSSQ6Avnw2/arcgis/rest/services/survey123_af503dce7c7347b0964bd3c39c541829_results/FeatureServer/0/query';
const TOKEN = '3NKHt6i2urmWtqOuugvr9WWH4yiFOV2GBtoX0t7v7RQTILUn0Ehm16rl4o6NYokAqofeej5gqZwCY1LxRj9e8jnnQfHL80BqWG53I_saSn0UmP5dbCWGWwBzuPMHCVX_pOZLwlUAqe4FQFJBBxJWonQyZdETCZaUOw3n5aA6qSBJz3AhAhhiR26PG7xx4hFBJfCXUahrU1niuieEpq9WRgEd3r6Ef6xFeFhBoLYngzo';

// Extract shareId from feature service URL
function extractShareId(serviceUrl) {
    const match = serviceUrl.match(/survey123_([a-f0-9]+)_results/);
    return match ? match[1] : null;
}

// Build Survey123 link URL
function buildSurvey123Link(shareId, objectId, extent = null) {
    if (!shareId || !objectId) return null;
    let url = `https://survey123.arcgis.com/share/${shareId}/result/data`;
    const params = [];
    if (extent) {
        params.push(`extent=${extent}`);
    }
    params.push(`objectIds=${objectId}`);
    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }
    return url;
}

const SURVEY123_SHARE_ID = extractShareId(FEATURE_SERVICE_URL);

