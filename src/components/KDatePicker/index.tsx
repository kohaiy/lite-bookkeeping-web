import { useMemo } from "react";
import KPopover from "../KPopover";
import DatePopover from "./DatePopver";

interface Props {
    value?: Date;
    onChange?: (d: Date) => void;
    weekFirstDay?: number;
    popoverPlacement?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
}

const KDatePicker: React.FC<Props> = (props) => {
    const date = useMemo(() => {
        const d = props.value ? new Date(props.value) : new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, [props.value]);
    return (
        <KPopover content={(
            <DatePopover defaultDate={date} weekFirstDay={props.weekFirstDay} onChange={props.onChange} />
        )} placement={props.popoverPlacement}>{props.children}</KPopover>
    )
}

export default KDatePicker;
