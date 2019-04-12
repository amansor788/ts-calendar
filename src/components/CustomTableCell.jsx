import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

export default withStyles(theme => ({  
            head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,    
            fontSize: '1.20rem',
            align: 'center',
            textAlign: 'center',
            padding: '0px',
            },
            body: {
            fontSize: '1.00rem',
            align: 'center',
            textAlign: 'center',
            padding: '0px',
            },
        }))(TableCell)
;