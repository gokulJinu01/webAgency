const services = new Set(['A business website','Website redesign','Booking & integrations','Website care','Something else']);
export function validateEnquiry(body){
 if(!body || typeof body!=='object' || Array.isArray(body))return {error:'Please provide your project details.'};
 if(body.website)return {spam:true};
 const fields={};
 for(const [key,max] of Object.entries({name:100,email:254,business:150,message:3000,service:100})){
   if(body[key]!==undefined && typeof body[key]!=='string')return {error:'Please check your project details.'};
   fields[key]=(body[key]||'').trim();
   if(fields[key].length>max)return {error:`Your ${key} is too long.`};
 }
 if(fields.name.length<1)return {error:'Please enter your name.'};
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))return {error:'Please enter a valid email address.'};
 if(fields.message.length<10)return {error:'Tell us a little more about your project (at least 10 characters).'};
 if(!services.has(fields.service))return {error:'Please choose a service.'};
 return {data:fields};
}
