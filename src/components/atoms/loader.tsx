import React from "react";
import { ThreeDots } from "react-loader-spinner"

export default function Loader() {
    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    visible={true}
                />
            </div>
        </div>);
}
