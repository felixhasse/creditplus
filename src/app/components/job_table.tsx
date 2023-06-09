import React, {useEffect, useState} from 'react';
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
  width: 100%;
  max-width: 842px;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
  }

  @media (min-width: 481px) {
    padding: 1rem 4rem;
  }
`
const JobContainer = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
`
const PaginationBar = styled.div`
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
  padding: 0 0.5rem;

  :hover {
    background-color: var(--gray-75);
    border-radius: 10px;
  }

  h6 {
    display: none;
    color: var(--gray-600);
    padding-left: 0.5rem;
    @media (min-width: 481px) {
      display: block;
    }
  }
`;
const PageItem = styled.div<PageItemProps>`
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.isSelected ? 'var(--primary-75)' : 'white'};
  color: ${props => props.isSelected ? 'var(--primary-600)' : 'var(--gray-600)'};
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  text-align: center;
  line-height: 40px;

  :hover {
    background: ${props => props.isClickable ? props.isSelected ? 'var(--primary-75)' : 'var(--gray-75)' : 'white'};
  }
`;
const PageItemWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const NextPage = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 0.5rem;

  :hover {
    background-color: var(--gray-75);
    border-radius: 10px;
    
  }
  h6 {
    display: none;
    color: var(--gray-600);
    padding-right: 0.5rem;
    @media (min-width: 481px) {
      display: block;
    }
  }
`;
const SwitchPageIcon = styled(FontAwesomeIcon)`
  color: var(--gray-600);
  font-size: 14px;

`;
const Divider = styled.hr`
  height: 1px;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  width: 100%;
  background-color: var(--gray-200);
  border: none;
`;
/**
 * Functional component that displays a table of jobs. Includes a pagination bar to navigate through pages
 * of job entries.
 * @component
 * @param {Job[]} jobs - An array of job objects to be displayed.
 */
const JobTable: React.FC<JobTableProps> = ({jobs}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const entriesPerPage: number = 10;
    const numPages = Math.ceil(jobs.length / entriesPerPage);
    const currentJobs = jobs.slice(currentPage * entriesPerPage, (currentPage + 1) * entriesPerPage);

    useEffect(() => {
        setCurrentPage(0);
    }, [jobs]);


    const handlePreviousClick = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    };
    const handleNextClick = () => {
        if (currentPage < numPages - 1) {
            setCurrentPage(currentPage + 1)
        }
    };
    return (
        <TableContainer>
            <h2>Aktuelle Jobangebote</h2>
            <JobContainer>
                {currentJobs.map((job, index) => (
                    <JobEntry job={job} key={index}/>))}</JobContainer>
            <Divider/>
            <PaginationBar>
                <PreviousPage onClick={handlePreviousClick}>
                    <SwitchPageIcon icon={faArrowLeft}/>
                    <h6>Vorherige</h6>
                </PreviousPage>
                <PageItemWrapper>
                    {Array.from({length: numPages}).map((_, index) => {
                        if (index === 0 || index === currentPage || index === numPages - 1 ||
                            index === 1 && (currentPage === numPages - 1 || currentPage === 0)) {
                            return (
                                <PageItem onClick={() => setCurrentPage(index)} isClickable={true}
                                          isSelected={index === currentPage}
                                          key={index}>{index + 1}</PageItem>);
                        }
                        if (Math.abs(index - currentPage) === 1 || currentPage === 0 && index === 2) {
                            return (
                                <PageItem isClickable={false} isSelected={false}
                                          key={index}>{"..."}</PageItem>
                            );
                        }
                    })}
                </PageItemWrapper>
                <NextPage onClick={handleNextClick}>
                    <h6>Nächste</h6>
                    <SwitchPageIcon icon={faArrowRight}/>
                </NextPage>
            </PaginationBar>
        </TableContainer>);
};

export default JobTable;
