interface Props {
    className?: string;
    id?: string;
}

export default function Sidebar(props: Props) {
    return (
        <aside className={`${props.className} `} id={`${props.id}`}>
            Sidebar
        </aside>
    );
}
