import { useSelector, useDispatch } from 'react-redux';
import { RootState, setPrivateNumber, GameState, setGameState, generatePrivateNumber } from '../../store/main';
import { Button } from '@mui/material';
import NumberInput, { INumberInputRef } from './numberInput';
import List from './list';
import { useRef } from 'react';
import { Replay } from '@mui/icons-material';

const Rival = () => {

    const privateNumber = useSelector((state: RootState) => state.privateNumber);
    const state = useSelector((state: RootState) => state.state);
    const connected = useSelector((state: RootState) => state.connected);
    const rivalQueryList = useSelector((state: RootState) => state.rivalQueryList);
    const dispatch = useDispatch();

    const privateNumberRef = useRef<INumberInputRef>(null);

    const onStartGame = () => {
        if (privateNumberRef.current?.isValid()) {
            dispatch(setGameState(GameState.Game));
        }
    }

    const result = (
        <div className='tw-flex tw-flex-col tw-items-end tw-flex-1 tw-p-10'>
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
                    state !== GameState.Start ? <List queryList={rivalQueryList}></List> : null
                }
            </div>
        </div>
    );
    return connected ? result : null;
}

export default Rival;
