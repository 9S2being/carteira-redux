import { AppBar, Toolbar, IconButton, Box, Typography, Icon } from '@mui/material';
import { AccountBalanceWallet, History, MonetizationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux';
import { selectTotalAmount } from '../../redux/slices/transactionsSlice';

export const Header = () => {
    const totalAmount: number = useAppSelector(selectTotalAmount);

    return (
        <AppBar position="static" sx={{ backgroundColor: 'purple', color: 'black', minWidth: '100%', marginBottom: '3px' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginTop: '2px' }}>
                        <Icon style={{ marginRight: '10px' }}>
                            <MonetizationOn style={{ color: '#FFD700' }} />
                        </Icon>
                        R${totalAmount.toFixed(2)}
                    </Typography>
                </Box>
                <IconButton color="inherit" aria-label="wallet" component={Link} to="/">
                    <AccountBalanceWallet />
                </IconButton>
                <IconButton color="inherit" aria-label="history" component={Link} to="/Logs">
                    <History />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
