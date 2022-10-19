import { useSelector, useDispatch } from 'react-redux';
import { RootState, setPrivateNumber, GameState, setGameState, generatePrivateNumber, queryNumber } from '../../store/main';
import { Button } from '@mui/material';
import NumberInput, { INumberInputRef } from './numberInput';
import List from './list';
import { ChangeEvent, useRef, useState } from 'react';
import { Replay } from '@mui/icons-material';

const Player = () => {

    const privateNumber = useSelector((state: RootState) => state.privateNumber);
    const state = useSelector((state: RootState) => state.state);
    const connected = useSelector((state: RootState) => state.connected);
    const queryList = useSelector((state: RootState) => state.queryList);
    const dispatch = useDispatch();

    const [currentQueryNumber, setCurrentQueryNumber] = useState('');

    const currentQueryNumberChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentQueryNumber(event.target.value);
    }


    const privateNumberRef = useRef<INumberInputRef>(null);
    const currentQueryNumberRef = useRef<INumberInputRef>(null);

    const onStartGame = () => {
        if (privateNumberRef.current?.isValid()) {
            dispatch(setGameState(GameState.Game));
        }
    }

    const queryNumberHandler = () => {
        if (currentQueryNumberRef.current?.isValid()) {
            dispatch(queryNumber(currentQueryNumber));
            setCurrentQueryNumber('');
        }
    }

    const result = (
        <div className='tw-flex tw-flex-col tw-items-end tw-flex-1'>
            <div>
                {
                    state === GameState.Start ? (
                        <>
                            <Button className='tw-ml-4' variant='contained' onClick={onStartGame}>Ready</Button>
                            <Button className='tw-ml-4' onClick={() => dispatch(generatePrivateNumber())}>
                                <Replay></Replay>
                            </Button>
                        </>
                    ) : null
                }

                <NumberInput
                    ref={privateNumberRef}
                    onChange={(event) => dispatch(setPrivateNumber(event.target.value))}
                    value={privateNumber}
                    unique={true}
                    disabled={state !== GameState.Start}
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
