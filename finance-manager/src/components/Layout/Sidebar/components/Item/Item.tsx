import { ElementType } from "react";
import './Item.css'

interface Props {
   
    pageTitle: string;
    isActive: boolean;
    onClick?: () => void;
    icon?: ElementType;
}

export default function Item({ pageTitle, isActive, onClick, icon: Icon}: Props) {


  return (
    <li className='sidebar-item' onClick={onClick}>
                {Icon && <Icon className={`sidebar-icon ${isActive ? 'sidebar-icon-active' : ''}`} size={24} />}
                    <span className={` ${isActive ? 'sidebar-item-title-active' : 'sidebar-item-title'} `} >{pageTitle}</span>
                </li>
  )
}
