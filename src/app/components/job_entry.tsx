import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUpRightFromSquare, faClock, faLocationDot} from '@fortawesome/free-solid-svg-icons'
import {Job} from "@/app/interfaces";

export interface JobEntryProps {
    job: Job,
}

const JobContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  border: 1px solid var(--gray-200);
  padding: 1.5rem;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  
  :hover {
    background-color: var(--gray-75);
  }

`
const JobDepartment = styled.h6`
  grid-row-start: 1;
  grid-column-start: span 2;

`
const JobTitle = styled.h3`
  grid-row-start: 2;
  grid-column-start: span 2;
`
const JobProperty = styled.div`
  grid-row-start: 3;
  font-weight: lighter;
  display: flex;
  align-items: center;
  grid-column-start: span 1;
`
const JobLink = styled.div`
  grid-row-start: 1;
  justify-self: end;
  align-items: center;
  display: flex;
  grid-column-start: 3;
  
  h6 {
    display: none;
    @media(min-width: 481px) {
      display: block;
    }
  }
`
const JobPropertyIcon = styled(FontAwesomeIcon)`
  color: var(--gray-700);
  font-weight: var(--fa-font-light);
  margin-right: 0.5rem;
  font-size: 16px;
`
const JobLinkIcon = styled(FontAwesomeIcon)`
  color: var(--primary-600);
  padding-left: 1rem;
  font-size: 14px;
`
/**
 * Component that displays a single job entry.
 * @component
 * @param {Job} job - The job object containing the job details.
 */
export const JobEntry: React.FC<JobEntryProps> = ({job}) => {
    return (
        <JobContainer>
            <JobDepartment>{job.department}</JobDepartment>
            <JobLink>
                <h6>Stelle Anzeigen</h6>
            <JobLinkIcon icon={faArrowUpRightFromSquare}/>
            </JobLink>
            <JobTitle>{job.title}</JobTitle>
            <JobProperty><JobPropertyIcon icon={faLocationDot}/><h4>{job.location}</h4></JobProperty>
            <JobProperty><JobPropertyIcon icon={faClock}/><h4>{job.type}</h4></JobProperty>
        </JobContainer>
    )
};

