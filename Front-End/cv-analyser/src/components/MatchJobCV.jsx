import React, { useEffect, useState } from 'react';
import axios from "axios";


const MatchJobCV = () => {
    const [cvs, setCvs] = useState([]);
    const [matchResult, setMatchResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [matchProgress, setMatchProgress] = useState(0);
    const userId = 1;

    useEffect(() => {
        axios.get(`http://localhost:8000/cvs/${userId}`).then((res) => setCvs(res.data))
    }, [])

    const handleMatch = async () => {
        try {
            setMessage("");
            setLoading(true);
            const formData = new FormData();
            formData.append("user_id", 1);
            const res = await axios.post("http://localhost:8000/match/", formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setMatchProgress(percent);
                    }
                }
            );
            setMatchResult(res.data);
        } catch (error) {
            setMessage("❌ Failed to match Job Description with CV.");
        } finally {
            setLoading(false);
            setTimeout(() => setMatchProgress(0), 500);
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <p className='mb-4 text-gray-600'>
                Click below to calculate match score between your latest CV and job posting.
            </p>

            <div className='flex flex-col gap-2'>
                <button
                    className='bg-blue-500 hover:bg-blue-600 text-white font-medium 
                    transition px-4 py-2 rounded w-full cursor-pointer'
                    onClick={handleMatch}
                    disabled={loading}
                >
                    {loading ? "Calculating..." : "Match Now"}
                </button>

                {loading && (
                    <div className='w-full bg-gray-200 rounded-lg h-4 overflow-hidden'>
                        <div
                            className='bg-blue-500 h-4 transition-all duration-300 ease-in-out'
                            style={{width: `${matchProgress}%`}}
                        />

                    </div>
                )}
            </div>


            {matchResult && (
                <div className='mt-4 p-3 border rounded bg-gray-50'>
                    {matchResult.error ? (
                        <p className='text-red-500'>{matchResult.error}</p>
                    ) : (
                        <>
                            <p className='text-lg font-semibold text-gray-800'>
                                Match Score: <span className='text-blue-500'>{matchResult.score}%</span>
                            </p>
                            <p className='text-sm text-gray-600 mt-1'>
                                CV Filename: <span className='font-semibold'>{matchResult.cv_filename}</span> | Job Title: <span className='font-semibold'>{matchResult.job_title}</span>
                            </p>
                        </>
                    )}

                </div>
            )}
            {message && (
                <p
                    className='text-sm mt-1 text-center text-red-600'>
                    {message}
                </p>
            )}
        </div>
    )
}

export default MatchJobCV
