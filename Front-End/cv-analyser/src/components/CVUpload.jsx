import React, { useState } from 'react';
import axios from "axios";

const CVUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files?.[0] || null);
        setMessage("");
    }

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        const extension = file.name.split(".").pop().toLowerCase();
        if (extension != 'pdf') {
            setMessage("Please select a PDF file.");
            return;
        }

        setMessage("");
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("user_id", 1)

            const res = await axios.post("http://localhost:8000/upload_cv/", formData);
            setMessage(`✔️ Uploaded: ${res.data.filename}`);
            setFile(null);
        } catch (err) {
            setMessage("❌ Upload failed. Try Again.");
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition bg-gray-50'>
                <p className='text-gray-500'>
                    {file ? `Selected file: ${file.name}` : "Drag & drop a PDF here of click to select"}
                </p>
                <input
                    type="file"
                    accept='.pdf'
                    className='hidden'
                    onChange={handleFileChange}
                />
            </label>

            <button
                onClick={handleUpload}
                disabled={isUploading}
                className={`px-4 py-2 rounded-lg text-white font-medium transition
                    ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`}
            >
                {isUploading ? "Uploading..." : "Upload CV"}
            </button>
            
            {message && (
                <p className={`text-sm ${message.startsWith("✔️") ? "text-green-600" : "text-red-600"} >`}>
                    {message}
                </p>
            )}
        </div>
    )
}

export default CVUpload
