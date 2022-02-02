import DatePopover from "./DatePopver";

const KDatePicker: React.FC = (props) => {
    return (
        <div>
            {props.children}
            <DatePopover defaultDate={new Date(2022, 0, 15)} weekFirstDay={1}/>
        </div>
    )
}

export default KDatePicker;
