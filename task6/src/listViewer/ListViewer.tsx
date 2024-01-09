import { FunctionComponent } from "react";

interface ListViewerProps {
    list: string[]
    setList: Function
}
 
const ListViewer: FunctionComponent<ListViewerProps> = ({ list, setList }: ListViewerProps) => {
    return ( 
    <div tabIndex={0} className="bg-[#e6eaee] peer/tags p-2 relative flex gap-2 flex-wrap rounded-lg cursor-pointer shadow-sm h-28 overflow-auto focus:outline outline-2 outline-[#226ee0]">
    { list.map((item, i) => (
        <div key={`${i}-${item}-listItem`} className="p-1 px-2 bg-[#a1d9fa] rounded-md flex w-fit gap-2 items-center h-8">
            <div>{item}</div>
            <button
                type="button"
                onClick={() => setList(list.filter(x => x !== item))}
            >
                ✕
            </button>
        </div>
    ))}
    </div> 
    );
}
 
export default ListViewer;