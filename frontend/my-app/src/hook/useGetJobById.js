import { setSingleJob } from '@/components/Redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/components/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetJobById =  (JobId) => {
    const dispatch = useDispatch();

    useEffect(() => {
console.log("ji")
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${JobId}`, { withCredentials: true });
                if (res.data.success) { 
                    dispatch(setSingleJob(res.data.Job));
                }
            } catch (error) {
                console.log(error)
            }
        }
       
     if (JobId) {
      fetchSingleJob();
    }
    }, [JobId,dispatch])
}
export default useGetJobById;