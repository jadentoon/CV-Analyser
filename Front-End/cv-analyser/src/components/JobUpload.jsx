import React, { useState } from 'react'
import axios from "axios";
import { Loader2 } from "lucide-react"


const JobUpload = () => {
    const [jobText, setJobText] = useState("");
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleUpload = async () => {
        if (!jobText.trim()) {
            setMessage("Job Description cannot be empty.");
            return;
        }

        try {
            setMessage("");
            setIsUploading(true);
            setUploadProgress(0);

            await axios.post("http://localhost:8000/upload_job/",
                {
                    user_id: 1,
                    job_text: jobText
                },
                {
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percent);
                    }
                });
            setMessage("✔️ Job Description uploaded successfully.");
            setJobText("");
        } catch (err) {
            setMessage("❌ Failed to upload job description");
        } finally {
            setIsUploading(false);
            setTimeout(() => setUploadProgress(0), 500);
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <textarea
                className='border border-gray-300 rounded-lg p-3 w-full resize-none shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                        placeholder-gray-400 text-gray-700 transition'
                rows={6}
                placeholder='Paste Job Description here...'
                value={jobText}
                onChange={e => setJobText(e.target.value)}
            />
            <div className='flex flex-col gap-2'>
                <button
                    onClick={handleUpload}
                    disabled={isUploading || !jobText.trim()}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded font-medium text-white transition
                    ${isUploading || !jobText.trim()
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 cursor-pointer"
                        }`}
                >
                    {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isUploading ? "Uploading..." : "Upload Job"}
                </button>

                {isUploading && (
                    <div className='w-full bg-gray-200 rounded-lg h-4 overflow-hidden'>
                        <div
                            className='bg-blue-500 h-4 transition-all duration-300 ease-in-out'
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}
            </div>

            {message && (
                <p
                    className={`text-sm mt-1 text-center ${message.startsWith("✔️") ? "text-green-600" : "text-red-600"
                        }`}>
                    {message}
                </p>
            )}

        </div>
    )
}

export default JobUpload
