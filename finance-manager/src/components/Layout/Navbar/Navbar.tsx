import "./Navbar.css";


interface Props {
    className?: string;
    id?: string;
}

export default function Navbar(props: Props) {
   
    return (
        <nav
            className={`${props.className} navbar-container`}
            id={`${props.id}`}
        >
           
           
        </nav>
    );
}
