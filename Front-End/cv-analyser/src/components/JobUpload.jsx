import React, { useState } from 'react'
import axios from "axios";


const JobUpload = () => {
    const [jobText, setJobText] = useState("");

    const handleUpload = async () => {
        if (!jobText.trim()) return alert("Please input a job description.");
        try {
            const userId = 1;

            const res = await axios.post("http://localhost:8000/upload_job/", {
                user_id: userId,
                job_text: jobText
            });

            alert(`Saved job description: ${res.data.job_text.substring(0, 50)}`);
        } catch (error) {
            console.error(error);
            alert("Failed to upload job description");
        }
    }

    return (
        <div>
            <textarea
            className='border p-2 w-full'
            rows={5}
            placeholder='Paste Job Description here...'
            value={jobText}
            onChange={e => setJobText(e.target.value)}
            />
            <button className='mt-2 px-3 py-1 bg-green-500 text-white rounded cursor-pointer' onClick={handleUpload}>Upload Job</button>

        </div>
    )
}

export default JobUpload
