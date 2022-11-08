import { useState } from "react";
import { defaultBlockSize, getNumberItems } from "../utils";
import NumberBoxItem from "./numberBoxItem";

interface IProps {
    className: string;
    size?: number;
}

const Scoreboard = (props: IProps) => {
    const [items] = useState(getNumberItems);
    const size = props.size || defaultBlockSize;

    const style = {
        width: `${(size + 2) * 5 }px`,
        height: `${(size + 2) * 2 }px`
    };

    return (
        <div className={`tw-grid tw-grid-cols-5 ${props.className || '' }`} style={style}>
            {
                items.map((value) => {
                    return <NumberBoxItem key={value} value={value} size={props.size}/>
                })
            }
        </div>
    );
}

export default Scoreboard;
