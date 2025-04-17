
// This code demonstrates a simple long-polling mechanism using Express.js.
// It simulates a job submission and allows the client to check the status of 
// the job until it is complete.
const express = require('express');

const app = express();
const PORT = 3000;
const jobs = {}; 

app.post('/submit', (req, res) => {
    const jobId = Date.now().toString(); 
    jobs[jobId] = 0; 
    simulateProgress(jobId); 
    res.json({ jobId });
});

function simulateProgress(jobId) {
    const interval = setInterval(() => {
        if (jobs[jobId] >= 100) {
            clearInterval(interval);
        } else {
            jobs[jobId] += 10;
            console.log(`Job ${jobId} progress: ${jobs[jobId]}%`);
        }
    }, 1000);
}

app.get('/status/:jobId', async (req, res) => {
    const jobId = req.params.jobId;

    if (!(jobId in jobs)) {
        return res.status(404).json({ error: 'Job not found' });
    }

    const waitUntilComplete = () => {
        return new Promise((resolve) => {
            const check = () => {
                if (jobs[jobId] >= 100) {
                    resolve();
                } else {
                    setTimeout(check, 1000); 
                }
            };
            check();
        });
    };

    await waitUntilComplete();
    res.json({ jobId, status: 'complete', progress: 100 });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});