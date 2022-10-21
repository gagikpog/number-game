import { useSelector, useDispatch } from 'react-redux';
import { RootState, GameState, setGameState, queryNumber } from '../../store/main';
import { Button, TextField } from '@mui/material';
import List from './list';
import { useState } from 'react';
import Scoreboard from './scoreboard';
import NumberBox from './numberBox';

const Player = () => {

    const state = useSelector((state: RootState) => state.state);
    const connected = useSelector((state: RootState) => state.connected);
    const queryList = useSelector((state: RootState) => state.queryList);
    const dispatch = useDispatch();

    const [currentQueryNumber, setCurrentQueryNumber] = useState('0000');

    const queryNumberHandler = () => {
        dispatch<any>(queryNumber(currentQueryNumber));
        setCurrentQueryNumber('0000');
    }

    const result = (
        <div className='tw-flex tw-flex-col tw-items-end tw-flex-1 tw-p-10'>
            <div>
                <TextField
                    value='####'
                    helperText=' '
                    variant="standard"
                    disabled={true}
                    inputProps={{ style: { textAlign: 'end' } }}
                />
            </div>
            <div className='tw-w-full'>
                {
                    state === GameState.Game ? <Scoreboard className='tw-mb-10'/> : null
                }
                {
                    state !== GameState.Start ? <List queryList={queryList}></List> : null
                }
                {
                    state === GameState.Game ?
                    <div className='tw-flex tw-mt-8'>
                        <NumberBox value={currentQueryNumber} className='tw-mb-10' onChange={(val) => setCurrentQueryNumber(val)} />
                        <Button onClick={queryNumberHandler} className='tw-ml-4' variant='contained'>Submit</Button>
                    </div>
                    : null
                }
            </div>
        </div>
    );
    return connected ? result : null;
}

export default Player;
