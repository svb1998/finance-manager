import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css'
import { useEffect, useState } from 'react';
import { ArrowLeftRight, Bolt, LayoutDashboard } from 'lucide-react';
import { setActivePage } from '../../../redux/states';
import Item from './components/Item/Item';

interface Props {
    className?: string;
    id?: string;
}

export default function Sidebar({className, id}: Props) {

    const listIndex = {
        dashboard: "dashboard",
        transactions: "transactions",
        categories: "categories", 
        settings: "settings",
    }

    const dispatch = useDispatch();

    const sidebarStatus = useSelector(store => store.sidebar)

    const activePage = sidebarStatus.activePage

    const [sidebarClassname, setsidebarClassname] = useState<string>(sidebarStatus.isOpen ? 'sidebar-expanded' : 'sidebar-collapsed');

    useEffect(() => {
        setsidebarClassname(sidebarStatus.isOpen ? 'sidebar-expanded' : 'sidebar-collapsed');
    }, [sidebarStatus]);

    return (
        <aside className={`${className}  sidebar-container ${sidebarClassname}`} id={`${id}`}>

            <ul className='sidebar-list items-group'>
                <Item pageTitle="Dashboard" isActive={activePage == listIndex.dashboard} onClick={() => dispatch(setActivePage(listIndex.dashboard))} icon={LayoutDashboard} />
                <Item pageTitle="Transactions" isActive={activePage == listIndex.transactions} onClick={() => dispatch(setActivePage(listIndex.transactions))} icon={ArrowLeftRight}/>
                
            </ul>
            <ul className='sidebar-list '>
                <Item pageTitle='Settings' isActive={activePage == listIndex.settings} onClick={() => dispatch(setActivePage(listIndex.settings))} icon={Bolt}/>
            </ul>
            
            
        </aside>
    );
}
