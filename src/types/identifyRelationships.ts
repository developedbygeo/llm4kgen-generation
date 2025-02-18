export type FileToBatchAndProcess = {
    path: string;
    identifier: string;
};

export type ProcessedFile = {
    fileIdentifier: string;
    headers: string[];
    data: string[];
};
