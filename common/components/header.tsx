import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { RootState, connectTo } from '../../store/main';


const Header = () => {

    const [anotherPeersId, setAnotherPeersId] = useState('');
    const dispatch = useDispatch();
    const pickId = useSelector((state: RootState) => state.pickId);

    return (
        <div className='tw-flex tw-items-center tw-p-8'>
            <TextField
                onChange={(event) => setAnotherPeersId(event.target.value)}
                value={anotherPeersId}
                variant="standard"
            />
            <Button className='tw-ml-4' variant='contained' onClick={() => dispatch(connectTo(anotherPeersId))}>Connect</Button>
            <div className='tw-ml-10'>{pickId}</div>
        </div>
    );
}

export default Header;
