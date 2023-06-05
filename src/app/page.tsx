"use client";

import Dropdown from "@/app/components/dropdown_menu";
import {useState} from "react";
import JobTable from "@/app/components/job_table";
import {getAllJobs} from "@/app/util/contentful";
import {Job} from "@/app/interfaces";

export default function Home() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    getAllJobs().then((result) => {
        for (const entry of result) {
            console.log(entry.department.title)
            const job: Job = {
                title: entry.title,
                location: entry.locationsCollection.items[0].city,
                type: entry.type.title,
                department: entry.department.title
            }
            setJobs(jobs => [...jobs, job])
        }
    })
    return (
        <main>
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", padding: "1rem"}}>
                <Dropdown options={["Karlsruhe", "Stuttgart", "Berlin", "München"]}
                          setSelectedOption={setSelectedOption} selectedOption={selectedOption}
                          menuText={"Wähle einen Standort"}></Dropdown>

                <Dropdown options={["Karlsruhe", "Stuttgart", "Berlin", "München"]}
                          setSelectedOption={setSelectedOption} selectedOption={selectedOption}
                          menuText={"Wähle einen Standort"}></Dropdown>

                <Dropdown options={["Karlsruhe", "Stuttgart", "Berlin", "München"]}
                          setSelectedOption={setSelectedOption} selectedOption={selectedOption}
                          menuText={"Wähle einen Standort"}></Dropdown>
                <JobTable jobs={jobs}></JobTable>
            </div>
        </main>
    )
}