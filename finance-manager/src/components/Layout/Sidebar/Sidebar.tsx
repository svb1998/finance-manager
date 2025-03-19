import { useSelector } from 'react-redux';
import './Sidebar.css'
import { useEffect, useState } from 'react';
import { LayoutDashboard } from 'lucide-react';

interface Props {
    className?: string;
    id?: string;
}

export default function Sidebar({className, id}: Props) {

    const sidebarStatus = useSelector(store => store.sidebar)

    const [sidebarClassname, setsidebarClassname] = useState<string>(sidebarStatus.isOpen ? 'sidebar-expanded' : 'sidebar-collapsed');

    useEffect(() => {
  
        setsidebarClassname(sidebarStatus.isOpen ? 'sidebar-expanded' : 'sidebar-collapsed');
    }, [sidebarStatus]);

    return (
        <aside className={`${className}  sidebar-container ${sidebarClassname}`} id={`${id}`}>

            <ul className='sidebar-list'>
                <li className='sidebar-item'>
                    <LayoutDashboard className='glow-icon' strokeWidth={2} stroke='greenyellow' size={24} />
                </li>
            </ul>
            
            
        </aside>
    );
}
