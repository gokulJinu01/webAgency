import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateEnquiry} from './validation.js';
const app=express();
app.disable('x-powered-by');
// Set this only to the known number of reverse proxies in your production host.
if(process.env.TRUST_PROXY_HOPS)app.set('trust proxy',Number(process.env.TRUST_PROXY_HOPS));
const origins=(process.env.CLIENT_ORIGINS||'http://localhost:5173').split(',').map(x=>x.trim());
app.use(helmet({contentSecurityPolicy:{directives:{'img-src':["'self'",'data:'],'style-src':["'self'","'unsafe-inline'",'https://fonts.googleapis.com'],'font-src':["'self'",'https://fonts.gstatic.com'],'connect-src':["'self'"]}}}));
app.use(cors({origin(origin,cb){cb(null,!origin||origins.includes(origin))}}));
app.use(express.json({limit:'16kb'}));
const Enquiry=mongoose.model('Enquiry',new mongoose.Schema({name:{type:String,required:true,maxlength:100},email:{type:String,required:true,maxlength:254},business:{type:String,maxlength:150},service:{type:String,required:true},message:{type:String,required:true,maxlength:3000},status:{type:String,default:'new',enum:['new','contacted','closed']}},{timestamps:true}));
app.get('/api/health',(_req,res)=>res.status(mongoose.connection.readyState===1?200:503).json({status:mongoose.connection.readyState===1?'ready':'database_unavailable'}));
app.post('/api/enquiries',rateLimit({windowMs:15*60*1000,limit:5,standardHeaders:'draft-7',legacyHeaders:false,message:{error:'Too many enquiries. Please try again in 15 minutes.'}}),async(req,res)=>{
 const result=validateEnquiry(req.body);
 if(result.spam)return res.status(202).json({received:true});
 if(result.error)return res.status(400).json({error:result.error});
 if(mongoose.connection.readyState!==1)return res.status(503).json({error:'Enquiries are temporarily unavailable. Your message has not been sent. Please try again later.'});
 try{await Enquiry.create(result.data);res.status(201).json({received:true})}catch{res.status(503).json({error:'Your enquiry could not be saved. Please try again.'})}
});
app.use('/api',(_req,res)=>res.status(404).json({error:'Endpoint not found.'}));
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
app.use(express.static(path.join(root,'dist')));
app.get('/',(_req,res)=>res.sendFile(path.join(root,'dist/index.html')));
app.use((err,_req,res,_next)=>res.status(err.status===413?413:400).json({error:err.status===413?'Your message is too large.':'Please send valid project details.'}));
const port=Number(process.env.PORT||3001);
if(process.env.MONGODB_URI){try{await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:5000})}catch{console.error('MongoDB connection failed; enquiries will return unavailable until reconnected.')}}else{console.warn('MONGODB_URI is not set; enquiries will return unavailable.');}
const server=app.listen(port,()=>console.log(`Studio server listening on port ${port}`));
const shutdown=()=>server.close(async()=>{await mongoose.disconnect();process.exit(0)});
process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
