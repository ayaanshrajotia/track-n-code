import React from "react";

const companies = [
    "Google",
    "Facebook",
    "Amazon",
    "Microsoft",
    "Adobe",
    "Uber",
    "Apple",
    "Netflix",
    "Paypal",
    "LinkedIn",
    "Twitter",
    "Salesforce",
];

export default function InfiniteScroll() {
    return (
        <div
            className="scroll"
            style={{ "--time": "20s" } as React.CSSProperties}
        >
            <div>
                {companies.map((company, idx) => (
                    <span
                        key={idx}
                        className="bg-tnc-black text-white p-1.5 px-4 rounded-full text-sm cursor-pointer mx-1.5 hover:bg-[#f46b45] transition-all"
                    >
                        {company}
                    </span>
                ))}
            </div>
            <div>
                {companies.map((company, idx) => (
                    <span
                        key={idx}
                        className="bg-tnc-black text-white p-1.5 px-4 rounded-full text-sm cursor-pointer mx-1.5 hover:bg-[#f46b45] transition-all"
                    >
                        {company}
                    </span>
                ))}
            </div>
        </div>
    );
}
