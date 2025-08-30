import React, { useState } from 'react'

const CVUpload = () => {
    const [file, setFile] = useState(null);


    return (
        <div>
            <input 
            type="file" 
            onChange={e => setFile(e.target.files?.[0] || null)}/>
            <button className='px-3 py-1 bg-blue-500 text-white rounded cursor-pointer'>Upload CV</button>
        </div>
    )
}

export default CVUpload
