
import { IQueryItem } from '../utils';
import NumberInput from './numberInput';

interface IListProps {
    queryList: IQueryItem[];
}

const List = (props: IListProps) => {
    return (
        <div>
            {
                props.queryList.map((item) => {
                    return (
                        <div key={ item.number } className='tw-flex tw-items-baseline'>
                            <NumberInput value={item.number} disabled={true}></NumberInput>
                            <div className='tw-ml-4'>{ item.queryRes} </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default List;
