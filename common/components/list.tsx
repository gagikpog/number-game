
import { IQueryItem } from '../utils';

interface IListProps {
    queryList: IQueryItem[];
    align?: 'start' | 'end' | 'center';
    className?: string;
    style?: object;
}

const List = (props: IListProps) => {
    return (
        <div className={props.className} style={props.style}>
            {
                props.queryList.map((item, index) => {
                    return (
                        <div key={`${item.number}-${index}`} className={`tw-flex tw-items-baseline tw-justify-${props.align || 'start'}`}>
                            <div className='tw-mr-6'>{index}&#41;</div>
                            <div>{item.number}</div>
                            <div className='tw-ml-4 tw-mr-4'>{ item.queryRes } </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default List;
