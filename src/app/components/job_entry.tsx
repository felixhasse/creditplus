import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons'
import {faClock} from '@fortawesome/free-solid-svg-icons'
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons'

import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface Job {
    title: String,
    type: String,
    location: String,
    department: String
}

interface JobEntryProps {
    job: Job,
    faClock: IconProp
}

const JobContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  border: 1px solid var(--gray-200);
  padding: 1.5rem;
  border-radius: 10px;
  width: 352px;

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
  grid-column-start: span 1;
`
const JobPropertyIcon = styled(FontAwesomeIcon)`
  color: var(--gray-700);
  font-weight: var(--fa-font-light);
  margin-right: 0.5rem;
  font-size: 16px;
`
const JobLinkIcon = styled(FontAwesomeIcon)`
    color: var(--primary-600);
    grid-column-start: 3;
    font-size: 14px;
`

const JobEntry: React.FC<JobEntryProps> = ({ job}) => {
    return (
        <JobContainer>
            <JobDepartment>{job.department}</JobDepartment>
            <JobLinkIcon icon={faArrowUpRightFromSquare}/>
            <JobTitle>{job.title}</JobTitle>
            <JobProperty><JobPropertyIcon icon={faLocationDot}/><h4>{job.location}</h4></JobProperty>
            <JobProperty><JobPropertyIcon icon={faClock}/><h4>{job.type}</h4></JobProperty>
        </JobContainer>
    )
};

export default JobEntry;