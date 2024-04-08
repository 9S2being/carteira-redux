import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { TransactionForm } from '../components/transactionForm/Transactions';
import { TransactionsLog } from '../components/transactionLogs/Logs'


 const router = createBrowserRouter([
  {
    path: '/',
    element: <TransactionForm />,
  },
  {
    path: '/Logs',
    element: <TransactionsLog />,
  },
]);  


const RouterApp: React.FC = () => {
    return <RouterProvider router={router} />
    }
    
    export default RouterApp

