import React from "react"

interface OverlayProps {
    children: React.ReactNode
}

export function Overlay(props: OverlayProps) {
    const { children } = props;
    return <div className="group hidden absolute h-full w-full hover:bg-gray-800 hover:bg-opacity-60 transition-colors md:flex flex-row justify-center items-center">
        <a
            className="hidden group-hover:flex transition-all  items-center bg-store-bg-100 px-2 py-1 mx-2"
            href=""
        >
            <span className="text-[6pt] md:text-base">
                {children}
            </span>
        </a>
    </div>

}