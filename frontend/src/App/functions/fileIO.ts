export const loadFile = async (path: string) => {
    const response = await fetch(`http://localhost:9001/getFile?path=${path}`);
    const result = await response.json();
    return result;
};
