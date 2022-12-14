import { MouseEvent, useState } from 'react';
import { defaultBlockSize, NumberItemState } from '../utils';
import styles from '../../styles/numberBoxItem.module.css';

function getNextState(current: NumberItemState): NumberItemState {
    return {
        [NumberItemState.unset]: NumberItemState.on,
        [NumberItemState.on]: NumberItemState.off,
        [NumberItemState.off]: NumberItemState.unknown,
        [NumberItemState.unknown]: NumberItemState.unset,
    }[current] || NumberItemState.unset;
}

interface IProps {
    value: number;
    className?: string;
    onClick?: (value: number) => void;
    changeOnRightClick?: boolean;
    size?: number;
}

const NumberBoxItem = (props: IProps) => {

    const [state, setState] = useState(NumberItemState.unset);
    const itemClasses = `tw-flex tw-p-2 tw-mr-2 tw-items-center tw-justify-center tw-cursor-pointer tw-no-select tw-relative ${styles.item} ${props.className} ${styles[`item-${state}`]}`;

    const onClick = (event: MouseEvent, fromMenu: boolean = false): void => {
        event.preventDefault();
        if (fromMenu || !props.changeOnRightClick) {
            setState(getNextState(state));
        } else {
            props.onClick?.(props.value);
        }
    };

    const size: number = props.size || defaultBlockSize;

    const style = {
        width: `${size}px`,
        height: `${size}px`
    };

    return (
        <div className={itemClasses} onClick={(event) => onClick(event)} onContextMenu={(event) => onClick(event, true)} style={style}>
            {props.value}
        </div>
    );
}

export default NumberBoxItem;
