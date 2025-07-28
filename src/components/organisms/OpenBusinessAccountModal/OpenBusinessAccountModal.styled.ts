import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '520px',
    borderRadius: '8px',
    padding: theme.spacing(5),
  },
}));
