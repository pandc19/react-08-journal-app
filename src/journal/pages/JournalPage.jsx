import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

    const { isSaving, active } = useSelector(state => state.journal);

    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch(startNewNote());
    }

    return (
        <JournalLayout>

            {/* <Typography>Reprehenderit dolor proident laboris culpa nostrud laboris magna. Labore est fugiat anim enim. Mollit excepteur est do commodo incididunt dolore. Et veniam dolor aute sunt duis irure irure enim cupidatat ipsum laboris. Velit consectetur id officia incididunt ad non dolor voluptate nisi id velit laborum elit.</Typography> */}

            {
                (!!active)
                    ? <NoteView />
                    : <NothingSelectedView />
            }

            <IconButton
                onClick={onClickNewNote}
                disabled={isSaving}
                size="large"
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >

                <AddOutlined sx={{ fontSize: 30 }} />

            </IconButton>

        </JournalLayout>
    );
}
