import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { RootState, connectTo, showMessage } from '../../store/main';
import { useQRCode } from 'react-qrcodes';
import { ContentCopy, ContentPaste  }from '@mui/icons-material';
import { getPickIdFromClipboard } from '../utils';

const Connection = () => {

    const dispatch = useDispatch();
    const pickId = useSelector((state: RootState) => state.pickId);

    const pickUrl = `https://numgame.gagikpog.ru?pickId=${pickId}`;

    const [qrRef] = useQRCode({
        text: pickUrl,
        options: {
            level: 'H',
            margin: 2,
            scale: 8,
            width: 256,
            color: {
                dark: '#ffffff',
                light: '#242424',
            }
        }
    });

    const copy = () => {
        navigator.clipboard.writeText(pickUrl).then(() => {
            dispatch(showMessage({
                text: 'Copying to clipboard was successful!',
                type: 'success'
            }));
        }).catch((error: Error) => {
            dispatch(showMessage({
                text: `Could not copy text: ${error.message}`,
                type: 'error'
            }));
        });
    }

    const paste = () => {
        getPickIdFromClipboard().then((anotherPeersId: string) => {
            dispatch(connectTo(anotherPeersId));
        }).catch((error: Error) => {
            dispatch(showMessage({text: error.message, type: 'error'}));
        });
    }

    return (
        <div className='tw-p-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full'>
            <div>
                <div className='tw-flex tw-w-full tw-justify-around'>
                    <div className='tw-flex tw-flex-col tw-items-center'>
                        copy
                        <IconButton className='tw-m-10' color="primary" onClick={copy}>
                            <ContentCopy />
                        </IconButton>
                    </div>
                    <div className='tw-flex tw-flex-col tw-items-center'>
                        paste
                        <IconButton className='tw-m-10' color="primary" onClick={paste}>
                            <ContentPaste />
                        </IconButton>
                    </div>
                </div>

                {/* @ts-ignore */}
                <canvas ref={qrRef}></canvas>
            </div>

        </div>
    );
}

export default Connection;
