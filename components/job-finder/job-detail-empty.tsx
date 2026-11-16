import {BriefcaseBusiness} from 'lucide-react';
export default function JobDetailEmpty({loading}:{loading:boolean}){
 return <div className="detail-empty" role="status"><BriefcaseBusiness size={36}/><h3>A fresh start is out there.</h3><p>{loading?'Checking employer career pages…':'Choose an opportunity to see its details and application link.'}</p></div>;
}
