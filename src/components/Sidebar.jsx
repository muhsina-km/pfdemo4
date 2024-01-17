import React from 'react';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Sidebar = () => {
    
    return (
        <div className="sidebar">

            <ul>
                <a href='/home'><li className='list-item'> 
                <HomeIcon className='icon'/> HOME </li></a>
            </ul>
            <br />
            <div className='list-item'>
                <EditNoteIcon className='icon' fontSize='large'/> Registrations
            </div>
            <ul>
                <a href='/plant'><li>Plant Details</li></a>
                <a href='/planttype'><li>Plant Type</li></a>
            </ul>
            <div className='list-item'>
                <VisibilityIcon className='icon'/> View
            </div>
            <ul>
                <a href="/plantdetailsview"><li>Plant Details View</li></a>
                <a href="/planttypeview"><li>Plant Type View</li></a>

            </ul>

        </div>
    );
};

export default Sidebar;