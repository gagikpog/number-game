import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { RootState, connectTo } from '../../store/main';


const Connection = () => {

    const [anotherPeersId, setAnotherPeersId] = useState('');
    const dispatch = useDispatch();
    const pickId = useSelector((state: RootState) => state.pickId);

    return (
        <div className='tw-p-8'>
            <TextField
                onChange={(event) => setAnotherPeersId(event.target.value)}
                value={anotherPeersId}
                variant="standard"
            />
            <span className='tw-ml-10'>
                <Button variant='contained' onClick={() => dispatch(connectTo(anotherPeersId))}>Connect</Button>
            </span>
            <span className='tw-ml-10'>{pickId}</span>
        </div>
    );
}

export default Connection;
