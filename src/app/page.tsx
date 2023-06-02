"use client";

import JobEntry from "@/app/components/job_entry";
import Dropdown from "@/app/components/dropdown_menu";

export default function Home() {
    return (
        <main>
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", padding: "1rem"}}>
                <JobEntry job={{
                    title: "(Junior) Fullstack Developer (m/w/d)",
                    location: "Stuttgart",
                    type: "Vollzeit",
                    department: "IT & Projektmanagement"
                }}></JobEntry>
                <Dropdown options={["Karlsruhe", "Stuttgart", "Berlin", "München"]} selectedOption={"Karlsruhe"}
                          menuText={"Wähle einen Standort"}></Dropdown>
            </div>
        </main>
    )
}