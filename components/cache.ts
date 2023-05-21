import RNFetchBlob from 'rn-fetch-blob';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

const getFile = async (id: string): Promise<string> => {
    const cachePath = `${RNFetchBlob.fs.dirs.CacheDir}/file_${id}`;

    // Check if the file with the given ID is cached
    const isCached = await RNFetchBlob.fs.exists(cachePath);

    if (isCached) {
        // File is already cached, return the file path
        return cachePath;
    } else {
        // File is not cached, download it asynchronously
        const url = `https://streamify.jjhost.tk/stream/${id}`;

        // Fetch the HEAD method to get the headers without downloading the entire file
        const rsp = await fetch(url, { method: 'HEAD' });

        const contentLengthHeader = rsp.headers.get('Content-Length');
        const fileSize = contentLengthHeader ? parseInt(contentLengthHeader) : null;

        if (fileSize && fileSize <= MAX_FILE_SIZE) {
            RNFetchBlob.config({
                path: cachePath,
            }).fetch('GET', url);
        }
        else {
            // Too large to cache
            console.log("Too Large too cache")
        }
        // Return the original URL
        return url;
    }
};
export default getFile;