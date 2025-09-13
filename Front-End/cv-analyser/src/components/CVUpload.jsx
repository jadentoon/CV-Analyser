import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Trash2, NotepadText, UploadCloud } from "lucide-react";

const CVUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        const handleWindowDragOver = (e) => e.preventDefault();
        const handleWindowDrop = (e) => e.preventDefault();

        window.addEventListener("dragover", handleWindowDragOver);
        window.addEventListener("drop", handleWindowDrop);

        return () => {
            window.removeEventListener("dragover", handleWindowDragOver);
            window.removeEventListener("drop", handleWindowDrop);
        }
    }, []);

    const validateFile = (selectedFile) => {
        if (!selectedFile) return false;

        if (selectedFile.type !== "application/pdf") {
            setMessage("Please select a PDF file.");
            return false;
        }
        return true;
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (validateFile(droppedFile)) {
            setFile(droppedFile);
            setMessage("");
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0] || null;
        if (validateFile(selectedFile)) {
            setFile(selectedFile);
            setMessage("");
        }
    };

    const handleUpload = async () => {
        if (!validateFile(file)) {
            setMessage("Please select a valid PDF file.");
            return;
        }

        setMessage("");
        setIsUploading(true);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("user_id", 1)

            const res = await axios.post("http://localhost:8000/upload_cv/", formData, {
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percent);
                }
            });
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
            <label
                className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition bg-gray-50
                    ${isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-blue-400"}`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <div className='flex flex-col items-center'>
                    <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                    <p className='font-semibold text-gray-700'>Browse Files</p>
                    <p className='text-sm text-gray-500'>Drag and drop files here</p>
                </div>
                <input
                    type="file"
                    accept='.pdf'
                    className='hidden'
                    onChange={handleFileChange}
                />
            </label>

            {file && (
                <div className='flex items-center justify-between bg-blue-50 p-3 rounded-lg'>
                    <div className='flex items-center gap-2'>
                        <span className='bg-blue-200 w-6 h-6 flex items-center justify-center rounded'>
                            <NotepadText className="w-4 h-4" />
                        </span>
                        <div>
                            <p className='text-gray-800 font-medium'>{file.name}</p>
                            <p className='text-gray-500 text-sm'>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setFile(null);
                            setMessage("");
                        }}
                        className='p-2 rounded hover:bg-red-100 transition cursor-pointer'
                        aria-label="Remove File"
                    >
                        <Trash2 className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors" />
                    </button>

                </div>
            )}

            <div className='flex flex-col gap-2'>
                <button
                    onClick={handleUpload}
                    disabled={isUploading || !file}
                    className={`px-4 py-2 rounded-lg text-white font-medium transition
                    ${isUploading || !file ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`}
                >
                    {isUploading ? `Uploading ${uploadProgress}%` : "Upload CV"}
                </button>

                {isUploading && (
                    <div className='w-full bg-gray-200 rounded-lg h-4 overflow-hidden'>
                        <div 
                            className='bg-blue-500 h-4 transition-all duration-300 ease-in-out'
                            style={{width: `${uploadProgress}%`}}
                        />
                    </div>
                )}
            </div>

            {message && (
                <p className={`text-sm text-center ${message.startsWith("✔️") ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </p>
            )}
        </div>
    )
}

export default CVUpload
