import { useState } from "react";
import { getNumberItems } from "../utils";
import styles from '../../styles/numberBox.module.css';
import NumberBoxItem from "./numberBoxItem";
import NumberBoxSlide from "./numberBoxSlide";

interface IProps {
    value: string;
    className?: string;
    onChange?: (value: string) => void;
    size?: number;
}

interface ICol {
    val: number;
    opened: boolean;
}

const NumberBox = (props: IProps) => {

    const [cols, setCols] = useState(() => getNumberItems(4).map((val): ICol => ({val, opened: false})));
    const value = props.value.padStart(4, '0');

    const numberBoxItemClick = (val: string, col: ICol): void => {
        const newValue = value.split('').map((res: string, index: number): string => {
            return index === col.val ? val : res;
        }).join('');

        props.onChange?.(newValue);
    }

    const openChanged = (opened: boolean, col: ICol): void => {
        const newCols = cols.map((item: ICol) => {
            return {
                ...item,
                opened: item.val === col.val ? opened : false
            }
        });

        setCols(newCols);
    }

    return (
        <div className={`tw-flex ${props.className || ''}`}>
            {
                cols.map((col) => {
                    return (
                        <NumberBoxSlide
                            size={props.size}
                            key={`col-${col.val}`}
                            data-key={`col-${col.val}`}
                            value={value[col.val]}
                            opened={col.opened}
                            onChange={(val) => numberBoxItemClick(val, col)}
                            onOpenChange={(opened) => openChanged(opened, col)}
                        />
                    )
                })
            }
        </div>
    );
}

export default NumberBox;
