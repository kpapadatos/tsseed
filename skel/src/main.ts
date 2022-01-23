export default function tsseed() {
    console.log('works', process.argv);
    const [nodeBinary, binFilename, projectName, ...flags] = process.argv;

    console.log({
        nodeBinary,
        binFilename,
        prjectName: projectName,
        flags
    });
}