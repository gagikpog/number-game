import { useState } from "react";
import { getNumberItems } from "../utils";
import styles from '../../styles/numberBox.module.css';
import NumberBoxItem from "./numberBoxItem";

interface IProps {
    value: string;
    className?: string;
    onChange?: (value: string) => void;
}

interface ICol {
    val: number;
    opened: boolean;
}

const NumberBox = (props: IProps) => {

    const [cols, setCols] = useState(() => getNumberItems(4).map((val): ICol => ({val, opened: false})));
    const [items] = useState(getNumberItems);
    const blockSize = 27;
    const value = props.value.padStart(4, '0');

    const numberBoxItemClick = (val: number, col: ICol): void => {

        if (col.opened) {
            const newValue = value.split('').map((res: string, index: number): string => {
                return index === col.val ? `${val}` : res;
            }).join('');

            props.onChange?.(newValue);
        }

        const newCols = cols.map((item: ICol) => {
            return {
                ...item,
                opened: item.val === col.val ? !col.opened : false
            }
        });

        setCols(newCols);
    }

    return (
        <div className={`tw-flex ${props.className || ''}`}>
            {
                cols.map((col) => {
                    return (
                        <div key={`col-${col.val}`} data-key={`col-${col.val}`} className={`tw-relative ${styles.input} ${col.opened ? '' : 'tw-overflow-hidden'}`}>
                            <div className={`tw-flex tw-flex-col tw-z-10 tw-absolute ${styles.col}`} style={{ left: 0, top: `-${Number(value[col.val]) * blockSize}px`}}>
                                {
                                    items.map((item) => {
                                        return (
                                            <NumberBoxItem
                                                data-key={`row-${item}`}
                                                key={`row-${item}`}
                                                value={item}
                                                changeOnRightClick={true}
                                                onClick={(val) => numberBoxItemClick(val, col)}
                                                className='tw-mt-2'
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default NumberBox;
