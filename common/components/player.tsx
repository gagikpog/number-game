import { useSelector, useDispatch } from 'react-redux';
import { RootState, GameState, setGameState, queryNumber } from '../../store/main';
import { Button, TextField } from '@mui/material';
import NumberInput, { INumberInputRef } from './numberInput';
import List from './list';
import { ChangeEvent, useRef, useState } from 'react';

const Player = () => {

    const state = useSelector((state: RootState) => state.state);
    const connected = useSelector((state: RootState) => state.connected);
    const queryList = useSelector((state: RootState) => state.queryList);
    const dispatch = useDispatch();

    const [currentQueryNumber, setCurrentQueryNumber] = useState('');

    const currentQueryNumberChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentQueryNumber(event.target.value);
    }

    const currentQueryNumberRef = useRef<INumberInputRef>(null);

    const queryNumberHandler = () => {
        if (currentQueryNumberRef.current?.isValid()) {
            dispatch(queryNumber(currentQueryNumber));
            setCurrentQueryNumber('');
        }
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
                    state !== GameState.Start ? <List queryList={queryList}></List> : null
                }
                {
                    state === GameState.Game ?
                    <div>
                        <NumberInput
                            ref={currentQueryNumberRef}
                            onChange={currentQueryNumberChanged}
                            value={currentQueryNumber}
                        />
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
