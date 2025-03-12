interface Props {
    className?: string;
    id?: string;
}

export default function Footer(props: Props) {
    return (
        <footer className={`${props.className} `} id={`${props.id}`}>
            Footersss
        </footer>
    );
}
