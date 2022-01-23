import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import copy from 'recursive-copy';

export default async function tsseed() {
    console.time('Done');

    const [nodeBinary, binFilename, projectName, ...flagsArray] = process.argv;
    const flags = new Set(flagsArray);

    const projectDir = resolve(process.cwd(), projectName);
    const skelDir = resolve(__filename, '../../../skel');

    await copy(skelDir, projectDir, { dot: true, debug: true, overwrite: true });

    setPackageName(projectDir, projectName);

    execSync('npm i', { cwd: projectDir });

    if (flags.has('-o')) {
        tryOpenWithVscode(projectDir);
    }

    console.timeEnd('Done');
}

function setPackageName(projectDir: string, projectName: string) {
    const packageFileName = projectDir + '/package.json';
    const packageFile = readFileSync(packageFileName).toString();

    writeFileSync(packageFileName, packageFile.replace('@lunarade/tsseed', projectName));
}

function tryOpenWithVscode(projectDir: string) {
    execSync(`code ${projectDir}`);
}