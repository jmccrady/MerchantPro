export async function POST(request:Request){
const reply=(error:string,status:number)=>Response.json({error},{status,headers:{'Cache-Control':'no-store'}});
const origin=request.headers.get('origin');if(!origin||origin!==new URL(request.url).origin)return reply('Please submit your request from this website.',403);
if(!request.headers.get('content-type')?.startsWith('application/json'))return reply('Unsupported request format.',415);
if(Number(request.headers.get('content-length')||0)>4096)return reply('Your request is too long.',413);
let data;try{const raw=await request.text();if(raw.length>4096)return reply('Your request is too long.',413);data=JSON.parse(raw)}catch{return reply('Please check your request and try again.',400)}
if(!data||typeof data!=='object')return reply('Please check your request.',400);
const valid=(key:string,max:number)=>typeof data[key]==='string'&&data[key].trim().length>0&&data[key].length<=max;
if(!valid('name',100)||!valid('business',160)||!valid('contact',254)||!['phone','email'].includes(data.method)||typeof data.message!=='string'||data.message.length>500)return reply('Please check your name, business, and contact details.',400);
if(data.method==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact))return reply('Please enter a valid email address.',400);
if(data.method==='phone'&&(data.contact.replace(/\D/g,'').length<7||data.contact.replace(/\D/g,'').length>15))return reply('Please enter a valid phone number.',400);
if(data.website||typeof data.startedAt!=='number'||Date.now()-data.startedAt<1500)return reply('Please wait a moment and try again.',400);
// Fail closed until the business selects and configures an approved intake destination.
// Never record personal information in logs or confirm an undelivered inquiry.
return reply('Online requests are not available yet. Please call 888-573-1133 to request your statement review.',503);
}


