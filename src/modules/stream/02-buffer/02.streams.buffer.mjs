// for i in `seq 1 100`; do node -e "process.stdout.write('$i-hello world\n')" >> text.txt; done
import  { readFile } from 'fs/promises';

const data = (
    await readFile('./text.txt')
).toString().split('\n');

const LINES_PER_ITERACTION = 10;
const iterations = data.length / LINES_PER_ITERACTION // ten in ten lines (not bytes!)
let page = 0;
for(let index = 1; index < iterations; index++) {
    const chunk = data.slice(page, page += LINES_PER_ITERACTION).join('\n');
    const buffer = Buffer.from(chunk);

    const amountOfBytes = buffer.byteOffset;
    const bufferData = buffer.toString().split("\n");
    const amountOfLines = bufferData.length;

    console.log('processing', bufferData, `lines: ${amountOfLines}, bytes: ${amountOfBytes}`)
}