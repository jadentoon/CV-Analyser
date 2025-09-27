import React, { useState } from 'react';
import axios from "axios";


const MatchJobCV = () => {
    const [matchResult, setMatchResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleMatch = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("user_id", 1);
            const res = await axios.post("http://localhost:8000/match/", formData);

            setMatchResult(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error matching CV and Job:", error);
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <p className='mb-4 text-gray-600'>
                Click below to calculate match score between your latest CV and job posting.
            </p>

            <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-medium 
                    transition px-4 py-2 rounded w-full cursor-pointer'
                onClick={handleMatch}
                disabled={loading}
            >
                {loading ? "Calculating..." : "Match Now"}
            </button>

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
                                CV ID: {matchResult.cv_id} | Job ID: {matchResult.job_id}
                            </p>
                        </>
                    )}

                </div>
            )}
        </div>
    )
}

export default MatchJobCV
