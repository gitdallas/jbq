import React from "react";

export function Reference({ children }) {
    return (
        <a target="_blank" href={`https://www.biblegateway.com/passage/?search=${children}&version=NIV`}>
            {children}
        </a>
    );
}
export function Answer({ answer, reference }) {
    return (
        <span>({answer}){' '}{reference && (<Reference>{reference}</Reference>)}</span>
    );
}