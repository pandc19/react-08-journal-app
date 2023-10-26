import { IconButton, Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';

export const JournalPage = () => {
    return (
        <JournalLayout>

            {/* <Typography>Reprehenderit dolor proident laboris culpa nostrud laboris magna. Labore est fugiat anim enim. Mollit excepteur est do commodo incididunt dolore. Et veniam dolor aute sunt duis irure irure enim cupidatat ipsum laboris. Velit consectetur id officia incididunt ad non dolor voluptate nisi id velit laborum elit.</Typography> */}


            {/* NothingSelected */}
            <NothingSelectedView />

            <IconButton
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


            {/* NoteView */}
            {/* <NoteView /> */}
        </JournalLayout>
    );
}
