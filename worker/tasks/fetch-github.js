var fetch = require('node-fetch');
var redis = require("redis");
client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client); 

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {

	//Fetch all pages
	let onPage = 0, count = 1, total = 0;
	const alljobs = []
	while (count) {
		const res = await fetch(`${baseURL}?page=${onPage}`);
		const jobs = await res.json();
		console.log(jobs.length);
		alljobs.push(...jobs);
		onPage ++;
		count = jobs.length
		total += jobs.length;
	}
	console.log('total ', alljobs.length, 'jobs');

	//Filter for only junior jobs
	const jrJobs = [];
	for (var i = 0; i < alljobs.length; i ++) {
		if (!alljobs[i].title.toLowerCase().includes("senior")) {
			jrJobs.push(alljobs[i]);
			console.log(jrJobs[jrJobs.length-1].title + " " + i);
		}
	}

	//Set in redis
	const success = await setAsync('github', JSON.stringify(jrJobs));
	console.log({success});
}

// fetchGithub();

module.exports = fetchGithub;