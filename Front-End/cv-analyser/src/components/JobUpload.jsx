import React, { useState } from 'react'

const JobUpload = () => {
    const [text, setText] = useState("");
    return (
        <div>
            <textarea
            className='border p-2 w-full'
            rows={5}
            placeholder='Paste Job Description here...'
            value={text}
            onChange={e => setText(e.target.value)}
            />
            <button className='mt-2 px-3 py-1 bg-green-500 text-white rounded cursor-pointer'>Upload Job</button>

        </div>
    )
}

export default JobUpload
