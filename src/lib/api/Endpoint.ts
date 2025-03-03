export const Endpoints = Object.freeze({
    partitions: '/v1/api/partitions',
    sources: '/v1/api/partitions/:partitionId/data/sources',
    partitionData: '/v1/api/partitions/:partitionId/data',
    performanceReport: '/v1/api/partitions/:partitionId/report/performance',
    summaryStats: '/v1/api/partitions/:partitionId/totals',
});