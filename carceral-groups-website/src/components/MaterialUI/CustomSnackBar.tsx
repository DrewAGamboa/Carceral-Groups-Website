import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


type CustomizedSnackbarProps = {
    handleClose: () => void;
    open: boolean;
    message: string;
}

export default function CustomizedSnackbar(props: CustomizedSnackbarProps) {
    const { handleClose, message, open } = props;

    return (
        <div>
            <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
