import { useState } from "react";
import { getNumberItems } from "../utils";
import NumberBoxItem from "./numberBoxItem";

interface IProps {
    className: string;
}

const Scoreboard = (props: IProps) => {
    const [items] = useState(getNumberItems);

    return (
        <div className={`tw-flex ${props.className || '' }`}>
            {
                items.map((value) => {
                    return <NumberBoxItem key={value} value={value} />
                })
            }
        </div>
    );
}

export default Scoreboard;
