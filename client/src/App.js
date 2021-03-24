import React from 'react'
import './App.css';
import JobsFunc from './Jobs';

const JOB_API_URL = 'http://localhost:3001/jobs';

async function fetchJobs(updateJobs) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();
  console.log({json});
  updateJobs(json);
}

function App() {
  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, []);

  return (
    <div className="App">
      <JobsFunc jobs={jobList}/>
    </div>
  );
}

export default App;
