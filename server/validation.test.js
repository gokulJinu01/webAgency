import test from 'node:test';
import assert from 'node:assert/strict';
import {validateEnquiry} from './validation.js';
const valid={name:' Alex ',email:'alex@example.ca',business:'Local Cafe',service:'Website redesign',message:'We need a website for our cafe.'};
test('accepts valid enquiries and trims names',()=>assert.equal(validateEnquiry(valid).data.name,'Alex'));
test('rejects malformed, oversized, and operator-valued inputs',()=>{for(const body of [null,[],{...valid,email:'bad'},{...valid,name:{$ne:null}},{...valid,message:'x'.repeat(3001)},{...valid,service:'invalid'},{...valid,message:'short'}])assert.ok(validateEnquiry(body).error)});
test('does not persist honeypot submissions',()=>assert.equal(validateEnquiry({...valid,website:'spam.test'}).spam,true));
