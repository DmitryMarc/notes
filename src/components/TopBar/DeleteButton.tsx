import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';

type PropsType = {
    selectedNote: number,
    deleteSelected: (noteId: number) => void
}

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeleteButton: FC<PropsType> = ({ selectedNote, deleteSelected }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        handleClose();
        deleteSelected(selectedNote);
    }

    return (
        <div>
            <Tooltip title="Delete">
                <IconButton
                    sx={{ ':focus': { outline: 'none' } }}
                    onClick={handleOpen}
                >
                    <DeleteOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Warning
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, mb: 3 }}
                    >
                        Are you sure you want to delete the selected note?
                    </Typography>
                    <Box
                        position={'absolute'}
                        right={0}
                        bottom={'5px'}
                    >
                        <Button
                            sx={{ ':focus': { outline: 'none' } }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            sx={{ ':focus': { outline: 'none' } }}
                            onClick={handleConfirm}
                        >
                            OK
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default DeleteButton 