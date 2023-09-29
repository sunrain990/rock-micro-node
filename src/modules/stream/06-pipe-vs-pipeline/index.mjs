// node -e "process.stdout.write('hello world'.repeat(1e7))" > big.file

import { createReadStream } from 'node:fs';
import {
    createServer,
    get
} from 'node:http'
import {
    setTimeout
} from 'node:timers/promises'
import { pipeline } from 'node:stream/promises';
import { PassThrough } from 'node:stream';
import { CallTracker, deepStrictEqual } from 'node:assert';


const file1 = createReadStream('./big.file');
const file2 = createReadStream('./big.file');

createServer((request, response) => {
    console.log('connection received from API 01')
    // can consume partically stream
    file1.pipe(response);
}).listen(3000, () => console.log('running at 3000'));

createServer(async (request, response) => {
    console.log('connection received from API 02')
    // ERR_STREAM_PREMATURE_CLOSE if you don't consume the whole stream!
    await pipeline(
        file2,
        response
    );
}).listen(3001, () => console.log('running at 3001'));


// --- --- --- --- --- --- --- ---
await setTimeout(500)

const getHttpStream = (url) => new Promise(resolve => {
    get(url, response => resolve(response))
})

const pass = () => PassThrough();
const streamPipe = await getHttpStream('http://localhost:3000')
streamPipe.pipe(pass());

const streamPipeline = await getHttpStream('http://localhost:3001')
streamPipeline.pipe(pass());

streamPipe.destroy();
streamPipeline.destroy();

const tracker = new CallTracker();
const fn = tracker.calls((msg) => {
    console.log("stream.pipeline rejects if you don't fully consume it")
    deepStrictEqual(msg.message, "Premature close")
    process.exit();
})

process.on('uncaughtException', fn);

await setTimeout(10);
tracker.verify();