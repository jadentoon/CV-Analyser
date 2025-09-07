import React, { useState } from 'react';
import axios from "axios";

const CVUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!file) return;
        const extension = file.name.split(".").pop().toLowerCase();
        if (extension != 'pdf') {
            setMessage("Please select a PDF file.")
        } else {
            setMessage("")
            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post("http://localhost:8000/upload_cv/", formData);
            setMessage(`Uploaded: ${res.data.filename}`);
        }
    }

    return (
        <div>
            <input
                type="file"
                accept='.pdf'
                onChange={e => setFile(e.target.files?.[0] || null)} />
            <button className='px-3 py-1 bg-blue-500 text-white rounded cursor-pointer' onClick={handleUpload}>Upload CV</button>
            <p>{message}</p>
        </div>
    )
}

export default CVUpload
