import { setAllJobs } from '@/components/Redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/components/utils/constant';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function useGetAllJobs() {
    const dispatch = useDispatch();
    const {searchQuery}=useSelector(store=>store.job)
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [])
}
