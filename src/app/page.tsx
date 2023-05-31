"use client";

import JobEntry from "@/app/components/job_entry";

export default function Home() {
    return (
        <main>
            <div style={{display: "flex", justifyContent: "center", padding: "1rem"}}>
                <JobEntry job={{
                    title: "(Junior) Fullstack Developer (m/w/d)",
                    location: "Stuttgart",
                    type: "Vollzeit",
                    department: "IT & Projektmanagement"
                }}></JobEntry>
            </div>
        </main>
    )
}