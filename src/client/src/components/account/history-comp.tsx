import axios from 'axios';
import React, { useEffect } from 'react';

const HistoryComp: React.FC = () => {
    useEffect(() => {
        axios.get("/api/user/get-user-history", { withCredentials: true }).then((res) => {
            console.log(res.data);
        })
    })
    return (
        <div>
            <h1>HISTORY</h1>
        </div>
    );
}

export default HistoryComp;