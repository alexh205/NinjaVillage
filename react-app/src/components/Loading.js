import React from "react";
import { MutatingDots } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            <MutatingDots
                height="100"
                width="100"
                color="rgb(245 158 11)"
                secondaryColor="#015f41"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                visible={true}
            />
        </div>
    );
};

export default Loading;
