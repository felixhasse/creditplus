import React, {useState} from 'react';
import {JobEntry} from "@/app/components/job_entry";
import {Job} from "@/app/interfaces";


interface JobTableProps {
    jobs: Job[];
}

const JobTable: React.FC<JobTableProps> = ({jobs}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const entriesPerPage = 10;
    const numPages = Math.ceil(jobs.length / entriesPerPage);
    const currentJobs = jobs.slice(currentPage * entriesPerPage, (currentPage + 1) * entriesPerPage);
    return (
        <div>
            {currentJobs.map((job, index) => (
                <JobEntry job={job} key={index}>
                </JobEntry>))}</div>);
};

export default JobTable;
