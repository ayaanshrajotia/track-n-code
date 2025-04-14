/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export default function InfiniteScroll({
    data,
}: {
    className?: string;
    data: any[];
}) {
    return (
        <div
            className="scroll"
            style={{ "--time": "20s" } as React.CSSProperties}
        >
            <div>
                {data?.map((data) => (
                    <span
                        key={data.tag_id}
                        className="bg-tnc-black text-white p-1.5 px-4 rounded-full text-sm cursor-pointer mx-1.5 hover:bg-[#f46b45] transition-all"
                    >
                        {data.tag_name}
                    </span>
                ))}
            </div>
            <div>
                {data?.map((data) => (
                    <span
                        key={data.tag_id}
                        className="bg-tnc-black text-white p-1.5 px-4 rounded-full text-sm cursor-pointer mx-1.5 hover:bg-[#f46b45] transition-all"
                    >
                        {data.tag_name}
                    </span>
                ))}
            </div>
        </div>
    );
}
