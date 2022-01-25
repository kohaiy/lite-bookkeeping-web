import { GetBillTagsRespDatum } from "../../../apis/modules/bill-tag/get-bill-tags";

interface Props {
    list: GetBillTagsRespDatum[];
    value?: GetBillTagsRespDatum['id'];
    onChange?: (v: GetBillTagsRespDatum) => void;
}

const BillTagList: React.FC<Props> = (props) => {
    const handleChange = (value: GetBillTagsRespDatum) => {
        props.onChange?.(value);
    }
    return <div className="flex p-4">{
        props.list.map(tag => <div key={tag.id}
            onClick={() => handleChange(tag)}
            className={`flex flex-col justify-center items-center w-16 h-16 m-4 border-solid border-2 border-gray-800 rounded-full cursor-pointer
            ${props.value === tag.id ? 'border-red-400' : ''}`}>
            <div className="w-6 h-6 bg-cyan-200"></div>
            <div className="mt-2 text-xs">{tag.name}</div>
        </div>)
    }</div>
}

export default BillTagList;
