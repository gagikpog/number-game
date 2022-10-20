import { useState } from "react";
import styles from '../../styles/scoreboard.module.css';

interface IProps {
    className: string;
}

enum ItemState {
    on = 'on',
    off = 'off',
    unknown = 'unknown'
}

interface IItem {
    value: number;
    state: ItemState
}

function getItems(): IItem[] {
    return Array(10).fill(null).map((_, index): IItem => {
        return {
            value: index,
            state: ItemState.unknown
        };
    });
}

function getNextState(current: ItemState): ItemState {
    return {
        [ItemState.unknown]: ItemState.on,
        [ItemState.on]: ItemState.off,
        [ItemState.off]: ItemState.unknown
    }[current] || ItemState.unknown;
}

const Scoreboard = (props: IProps) => {
    const [items, setItems] = useState(getItems);

    const onClick = (item: IItem): void => {
        const newItems = [...items];
        newItems[item.value] = {
            value: item.value,
            state: getNextState(item.state)
        };

        setItems(newItems);
    };

    const itemClasses = `tw-flex tw-p-2 tw-mr-4 tw-items-center tw-justify-center tw-cursor-pointer tw-no-select tw-relative ${styles.item}`;

    return (
        <div className={`tw-flex ${props.className || '' }`}>
            {
                items.map((item) => {
                    return (
                        <div key={item.value} className={`${itemClasses} ${styles[`item-${item.state}`]}`} onClick={() => onClick(item)}>
                            {item.value}
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Scoreboard;
