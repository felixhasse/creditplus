import React, {useState} from 'react';
import {JobEntry} from "@/app/components/job_entry";
import {Job} from "@/app/interfaces";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";


interface JobTableProps {
    jobs: Job[],
}

const TableContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
`
const JobContainer = styled.div`
  display: grid;
  gap: 1rem;
`
const PaginationBar = styled.div`
  display: flex;
  justify-content: space-between;

  h6 {
    color: var(--gray-700);
  }
`
const PreviousPage = styled.div`
  align-items: center;
  display: flex;

  h6 {
    padding-left: 0.25rem;
  }
`
const NextPage = styled.div`
  display: flex;
  align-items: center;

  h6 {
    padding-right: 0.25rem;
  }
`
const SwitchPageIcon = styled(FontAwesomeIcon)`
  color: var(--gray-700);
`
const PageIndex = styled.div`
`

const JobTable: React.FC<JobTableProps> = ({jobs}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const entriesPerPage = 10;
    const numPages = Math.ceil(jobs.length / entriesPerPage);
    const currentJobs = jobs.slice(currentPage * entriesPerPage, (currentPage + 1) * entriesPerPage);
    return (
        <TableContainer>
            <h2>Aktuelle Jobangebote</h2>
            <JobContainer>
                {currentJobs.map((job, index) => (
                    <JobEntry job={job} key={index}/>))}</JobContainer>
            <PaginationBar>
                <PreviousPage>
                    <SwitchPageIcon icon={faArrowLeft}/>
                    <h6>Vorherige</h6>
                </PreviousPage>
                <NextPage>
                    <h6>Nächste</h6>
                    <SwitchPageIcon icon={faArrowRight}/>
                </NextPage>
            </PaginationBar>
        </TableContainer>);
};

export default JobTable;
