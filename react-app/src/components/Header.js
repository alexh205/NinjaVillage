import React from "react";

const Header = () => {
    return (
        <header>
            <div style={{display: 'flex', alignItems: 'center', backgroundColor: 'blue', padding: '2px',}}>
                <div>
                    <img
                        src="https://links.papareact.com/f90"
                        style={{
                            width: "150px",
                            height: "40px",
                            objectFit: "contain",
                            cursor: "pointer",
                        }}
                    />
                    {/* top nav */}
                </div>
                <div>{/* bottom nav */}</div>
            </div>
        </header>
    );
};

export default Header;
