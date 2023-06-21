"use client";

import Dropdown from "@/app/components/dropdown_menu";
import {useEffect, useState} from "react";
import JobTable from "@/app/components/job_table";
import {getAllJobs} from "@/app/util/contentful";
import {Job} from "@/app/interfaces";
import styled from "styled-components";

const CareerHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 4rem 1rem 3rem 1rem;
  align-items: center;
  flex-direction: column;
  background-color: var(--gray-75);
  text-align: center;

  h6 {
    align-content: center;
  }
`

const DropdownWrapper = styled.div`
    display: flex;
    flex-direction: column;
  
  @media(min-width: 769px) {
    flex-direction: row;
  }   
  `;
const MainPage = styled.div`
  display: flex;
  max-width: 100vw;
  flex-direction: column;
  align-items: center;
}
  `
export default function Home() {
    const [locationOptions, setLocationOptions] = useState<Set<string>>(new Set());
    const [departmentOptions, setDepartmentOptions] = useState<Set<string>>(new Set());
    const [levelOptions, setLevelOptions] = useState<Set<string>>(new Set());
    const [selectedLocationOption, setSelectedLocationOption] = useState<string | undefined>(undefined);
    const [selectedDepartmentOption, setSelectedDepartmentOption] = useState<string | undefined>(undefined);
    const [selectedLevelOption, setSelectedLevelOption] = useState<string | undefined>(undefined);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

    useEffect(() => {
            const newFilteredJobs = jobs.filter((job) => {
                return (!selectedLocationOption || job.location === selectedLocationOption) &&
                    (!selectedDepartmentOption || job.department === selectedDepartmentOption) &&
                    (!selectedLevelOption || job.level === selectedLevelOption);
            });
            setFilteredJobs(newFilteredJobs);

        }, [selectedLocationOption, selectedDepartmentOption, selectedLevelOption]
    )

    useEffect(() => {
        getAllJobs(
        ).then((result) => {
            const newLocationOptions: Set<string> = new Set();
            const newDepartmentOptions: Set<string> = new Set();
            const newLevelOptions: Set<string> = new Set();
            const newJobs: Job[] = [];
            for (const entry of result) {
                const job: Job = {
                    title: entry.title,
                    location: entry.locationsCollection.items[0].city,
                    type: entry.type.title,
                    department: entry.department.title,
                    level: entry.levelsCollection.items[0].title,
                }
                newLocationOptions.add(job.location);
                newDepartmentOptions.add(job.department);
                newLevelOptions.add(job.level);
                newJobs.push(job);
            }
            setJobs(newJobs);
            setFilteredJobs(newJobs);
            setLocationOptions(newLocationOptions);
            setDepartmentOptions(newDepartmentOptions);
            setLevelOptions(newLevelOptions)
        })
    }, []);

    return (
        <main>
            <MainPage>
                <CareerHeader>
                    <h6>{`${jobs.length} offene Stellen bei Creditplus`}</h6>
                    <h2>Hier beginnt deine Zukunft</h2>
                    <DropdownWrapper>
                    <Dropdown options={locationOptions}
                              setSelectedOption={setSelectedLocationOption} selectedOption={selectedLocationOption}
                              menuText={"Stadt"}></Dropdown>

                    <Dropdown options={departmentOptions}
                              setSelectedOption={setSelectedDepartmentOption} selectedOption={selectedDepartmentOption}
                              menuText={"Bereich"}></Dropdown>

                    <Dropdown options={levelOptions}
                              setSelectedOption={setSelectedLevelOption} selectedOption={selectedLevelOption}
                              menuText={"Erfahrungslevel"}></Dropdown>
                    </DropdownWrapper>
                </CareerHeader>
                <JobTable jobs={filteredJobs}></JobTable>
            </MainPage>
        </main>
    )
}