import { setSingleCompany } from '@/components/Redux/companySlice'
import { COMPANY_API_ENDPOINT } from '@/components/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById =  (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, { withCredentials: true });
                if (res.data.success) { 
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error)
            }
        }
       
     if (companyId) {
      fetchSingleCompany();
    }
    }, [companyId,dispatch])
}
export default useGetCompanyById;