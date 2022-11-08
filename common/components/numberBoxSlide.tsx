import { RefObject, UIEvent, useEffect, useRef, useState } from "react";
import { defaultBlockSize, getNumberItems, throttle } from "../utils";
import styles from '../../styles/numberBox.module.css';
import NumberBoxItem from "./numberBoxItem";

interface IProps {
    value: string;
    opened: boolean;
    className?: string;
    onChange?: (value: string) => void;
    onOpenChange?: (value: boolean) => void;
    size?: number;
}

const NumberBoxSlide = (props: IProps) => {
    const [items] = useState(getNumberItems);
    const ref = useRef(null);
    const size = props.size || defaultBlockSize;
    const blockSize = size + 2;
    const value = props.value || '0';

    useEffect(() => {
        const rootDiv = ref.current as unknown as HTMLDivElement;
        if (rootDiv) {
            rootDiv.scrollTop = Number(value) * blockSize;
            const scrollHandler = throttle<UIEvent>((event: UIEvent) => {
                const target = event.target as unknown as HTMLDivElement;
                const val = Math.round(target.scrollTop / blockSize);
                props.onChange?.(`${val}`);
            }, 250);

            const mouseWell = (event: WheelEvent) => {
                event.preventDefault();
                const val = event.deltaY > 0 ? Number(value) + 1 : Number(value) - 1;
                props.onChange?.(`${(10 + val) % 10}`);
            }

            rootDiv.addEventListener('scroll', scrollHandler as () => void);
            rootDiv.addEventListener('wheel', mouseWell);

            return () => {
                rootDiv.removeEventListener('scroll', scrollHandler as () => void);
                rootDiv.removeEventListener('wheel', mouseWell);
            };
        }
    })

    const numberBoxItemClick = (val: number): void => {
        if (props.opened) {
            props.onChange?.(`${val}`);
        }
        props.onOpenChange?.(!props.opened);
    }

    const style = {
        left: 0,
        top: `-${Number(value) * blockSize}px`
    };

    const inputStyle = {
        height: `${blockSize}px`,
        width: `${blockSize}px`
    };

    return (
        <div ref={ref as RefObject<HTMLDivElement>} style={inputStyle} className={`tw-relative ${styles.input} ${props.opened ? '' : 'tw-overflow-y-scroll'}`}>
            <div className={`tw-flex tw-flex-col tw-z-10 ${props.opened ? 'tw-absolute' : ''} ${styles.col}`} style={style}>
                {
                    items.map((item) => {
                        return (
                            <NumberBoxItem
                                data-key={`row-${item}`}
                                size={size}
                                key={`row-${item}`}
                                value={item}
                                changeOnRightClick={true}
                                onClick={(val) => numberBoxItemClick(val)}
                                className={`tw-mb-2 ${styles.item}`}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default NumberBoxSlide;
