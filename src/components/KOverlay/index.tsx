import './style.scss';

interface Props {
    visible?: boolean;
    onClick?: () => void;
}

const KOverlay: React.FC<Props> = (props) => {

    return (
        <div className={`k-overlay ${props.visible ? '' : 'is-hidden'}`}
            onClick={props.onClick}></div>
    )
}
export default KOverlay;
