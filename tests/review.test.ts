import {test} from 'node:test';
import assert from 'node:assert/strict';
import {POST} from '../app/api/review/route.ts';
const input={name:'Test User',business:'Example Test Business',method:'email',contact:'test@example.com',message:'Synthetic validation test',website:'',startedAt:Date.now()-5000};
const request=(body:unknown,origin='https://example.com')=>new Request('https://example.com/api/review',{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)});
test('valid requests cannot falsely confirm delivery',async()=>{const result=await POST(request(input));assert.equal(result.status,503);assert.match(await result.text(),/888-573-1133/)});
test('rejects cross-origin submissions',async()=>assert.equal((await POST(request(input,'https://other.example'))).status,403));
test('rejects missing fields and malformed email',async()=>{for(const invalid of [{...input,name:''},{...input,contact:'invalid'},null])assert.equal((await POST(request(invalid))).status,400)});
test('rejects oversized messages and honeypots',async()=>{for(const invalid of [{...input,message:'x'.repeat(501)},{...input,website:'bot'}])assert.equal((await POST(request(invalid))).status,400)});
