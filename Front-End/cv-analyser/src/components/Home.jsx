import CVUpload from './CVUpload'
import JobUpload from './JobUpload'
import MatchJobCV from './MatchJobCV'

const Home = () => {
    return (
        <main className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-10 flex justify-center'>
            <div className='w-full max-w-3xl'>
                <h1 className='font-bold text-4xl text-gray-800 mb-10 text-center'>
                    CV Analyser
                </h1>

                <div className='flex flex-col gap-8'>
                    <div className='bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition'>
                        <h2 className='text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2'>
                            📑 Upload your CV
                        </h2>
                        <CVUpload />
                    </div>

                    <div className='bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition'>
                        <h2 className='text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2'>
                            💼 Paste Job Description here
                        </h2>
                        <JobUpload />
                    </div>

                    <div className='bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition'>
                        <h2 className='text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2'>
                            Match CV to Job
                        </h2>
                        <MatchJobCV />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home
