import { useSelector, useDispatch } from 'react-redux';
import { RootState, GameState, queryNumber } from '../../store/main';
import { Button, TextField } from '@mui/material';
import List from './list';
import { useMemo, useState } from 'react';
import Scoreboard from './scoreboard';
import NumberBox from './numberBox';
import { getBlockSize } from '../utils';

const Player = () => {

    const state = useSelector((state: RootState) => state.state);
    const connected = useSelector((state: RootState) => state.connected);
    const queryList = useSelector((state: RootState) => state.queryList);
    const dispatch = useDispatch();

    const blockSize: number = useMemo(() => getBlockSize(), []);

    const [currentQueryNumber, setCurrentQueryNumber] = useState('0000');

    const queryNumberHandler = () => {
        dispatch<any>(queryNumber(currentQueryNumber));
    }

    const height = (blockSize + 2) * 9;

    const result = (
        <div className='tw-flex tw-flex-col tw-items-end tw-flex-1 tw-p-10'>
            <div className='tw-w-full tw-flex-1 tw-overflow-y-auto'>
                <div className='tw-flex tw-flex-col tw-items-end tw-pr-10 tw-sticky tw-background-default' style={{top: 0}}>
                    <TextField
                        value='####'
                        helperText=' '
                        variant="standard"
                        disabled={true}
                        inputProps={{ style: { textAlign: 'end' } }}
                    />
                </div>
                {
                    state !== GameState.Start ? <List style={{minHeight: height - 55}} queryList={queryList}></List> : null
                }
                <div style={{ height: height + blockSize, bottom: 0 }} className='tw-sticky tw-background-default tw-mr-4'>
                    {
                        state === GameState.Game ?
                        <div className='tw-flex tw-mt-8'>
                            <NumberBox value={currentQueryNumber} size={blockSize} onChange={(val) => setCurrentQueryNumber(val)} />
                            <div className='tw-ml-4'>
                                <Button size='small' onClick={queryNumberHandler} variant='contained' style={{lineHeight: `${blockSize - 8}px`}}>Submit</Button>
                            </div>
                        </div>
                        : null
                    }
                    {
                        state === GameState.Game ? <Scoreboard className='tw-mb-10' size={blockSize}/> : null
                    }
                </div>
            </div>
        </div>
    );
    return connected ? result : null;
}

export default Player;
