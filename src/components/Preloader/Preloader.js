import React from 'react';

const Preloader = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary mt-3" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
};

export default Preloader;