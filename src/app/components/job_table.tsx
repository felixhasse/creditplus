import React, {useState} from 'react';
import {JobEntry} from "@/app/components/job_entry";
import {Job} from "@/app/interfaces";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";


interface JobTableProps {
    jobs: Job[],
}

interface PageItemProps {
    isSelected: boolean,
    isClickable: boolean
}

const TableContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-items: start;
  flex-direction: column;
  align-items: center;
  width: 352px;

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
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;

  h6 {
    color: var(--gray-700);
  }
`
const PreviousPage = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;

  h6 {
    display: none;
    padding-left: 0.25rem;
  }
`
const PageItem = styled.div<PageItemProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.isSelected ? 'var(--primary-75)' : 'white'};
  color: ${props => props.isSelected ? 'var(--primary-600)' : 'var(--gray-700)'};
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  text-align: center;
  line-height: 40px;
`

const NextPage = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  h6 {
    display: none;
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
    const entriesPerPage: number = 10;
    const numPages = Math.ceil(jobs.length / entriesPerPage);
    const [paginationBarIndexes, setPaginationBarIndexes] = useState([0, 1, 2, 3, 4, 5, 6])
    const currentJobs = jobs.slice(currentPage * entriesPerPage, (currentPage + 1) * entriesPerPage);

    const handlePreviousClick = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextClick = () => {
        if (currentPage < numPages - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <TableContainer>
            <h2>Aktuelle Jobangebote</h2>
            <JobContainer>
                {currentJobs.map((job, index) => (
                    <JobEntry job={job} key={index}/>))}</JobContainer>
            <PaginationBar>
                <PreviousPage onClick={handlePreviousClick}>
                    <SwitchPageIcon icon={faArrowLeft}/>
                    <h6>Vorherige</h6>
                </PreviousPage>
                {paginationBarIndexes.map((pageNumber, index) => {
                    if (pageNumber === 0 || pageNumber === currentPage || pageNumber === numPages - 1 ||
                        pageNumber === 1 && (currentPage === numPages - 1 || currentPage === 0)) {
                        return (
                            <PageItem onClick={() => setCurrentPage(pageNumber)} isClickable={true} isSelected={pageNumber === currentPage}
                                      key={index}>{pageNumber + 1}</PageItem>)
                    }
                    if (Math.abs(pageNumber - currentPage) === 1 || currentPage === 0 && pageNumber === 2) {
                        return (
                            <PageItem isClickable={false} isSelected={false}
                                      key={index}>{"..."}</PageItem>
                        )
                    }
                })}
                <NextPage onClick={handleNextClick}>
                    <h6>Nächste</h6>
                    <SwitchPageIcon icon={faArrowRight}/>
                </NextPage>
            </PaginationBar>
        </TableContainer>);
};

export default JobTable;
