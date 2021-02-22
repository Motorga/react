import React from 'react';
import { GiFullMotorcycleHelmet } from "react-icons/gi";

const MarkerCustomIcon = ({ bgColor }) => (
    <div
        className="d-flex align-items-center justify-content-center text-white rounded-circle"
        style={{
            width: "30px",
            height: "30px",
            marginTop: "-10px",
            marginLeft: "-10px",
            backgroundColor: bgColor ? bgColor : "#3B82F6"
        }}
    >
        <GiFullMotorcycleHelmet size={18} />
    </div>
)

export default MarkerCustomIcon;