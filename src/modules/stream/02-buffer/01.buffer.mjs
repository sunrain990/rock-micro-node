const buffer = Buffer.alloc(5);
buffer.fill('hi', 0, 2);
buffer.fill(0x3a, 2, 3); // hexadecimal char code for :
buffer.fill(0x29, 4, 5); // hexadecima char code for )
console.log(buffer.toString(), buffer, buffer.byteLength);

// error
// buffer.fill('h', 5, 6);

const anotherBuffer = Buffer.alloc(6);
anotherBuffer.set(buffer, buffer.byteOffset);
anotherBuffer.fill('four', 5, 6);
console.log(anotherBuffer.toString(), anotherBuffer, anotherBuffer.byteLength);

const msg = 'Hey there!'
const preAllocated = Buffer.alloc(msg.length, msg);
console.log(preAllocated.toString(), preAllocated, preAllocated.byteLength);

const withBufferFrom = Buffer.from(msg);
console.log(withBufferFrom.toString(), withBufferFrom, withBufferFrom.byteLength);



const str = 'Hello World'
const bytes = [];
const charCodes = [];
for(const index in str) {
    // integer or decimals
    const code = str.charCodeAt(index)
    const byteCode = '0x' + Math.abs(code).toString(16);
    charCodes.push(code);
    bytes.push(byteCode);

    console.log({code, byteCode})
}
console.log({
    charCodes,
    bytes,
    contentFromCharCodes: Buffer.from(charCodes).toString(),
    contentFromHexaBytes: Buffer.from(bytes).toString()
})