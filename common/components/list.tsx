
import { IQueryItem } from '../utils';

interface IListProps {
    queryList: IQueryItem[];
    align?: 'start' | 'end' | 'center';
}

const List = (props: IListProps) => {
    return (
        <div className='tw-overflow-y-auto' style={{maxHeight: 'calc(100vh - 192px)'}}>
            {
                props.queryList.map((item, index) => {
                    return (
                        <div key={`${item.number}-${index}`} className={`tw-flex tw-items-baseline tw-justify-${props.align || 'start'}`}>
                            <div>{item.number}</div>
                            <div className='tw-ml-4'>{ item.queryRes } </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default List;
