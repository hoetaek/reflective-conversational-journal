#!/usr/bin/env node

const now = new Date();

const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];

const datetime = `${year}-${month}-${day} (${dayOfWeek}) ${hours}:${minutes}:${seconds}`;

console.log(`<current-time>${datetime}</current-time>`);
