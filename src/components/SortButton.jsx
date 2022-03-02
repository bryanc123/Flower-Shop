import { useState } from 'react';

const SortButton = ({ children, handleSort, isActive }) => {
    return (
        <button onClick={handleSort} className={isActive ? 'products__sort-button--active' : 'products__sort-button'}>
            {children}
        </button>
    );
};

export default SortButton;