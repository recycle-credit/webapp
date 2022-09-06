import JWT_DECODE from "jwt-decode";
// routes
import { useNavigate } from 'react-router-dom';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';



// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();
  // Check for token

  const aa= "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob3NzYW0iLCJUb2tlblR5cGUiOiJCZWFyZXIiLCJyb2xlIjoiQURNSU4iLCJpc0FkbWluIjp0cnVlLCJFbXBsb3llZUlkIjoxLCJleHAiOjE2MTI5NDA2NTksImlhdCI6MTYxMjkzNzA1OX0.8f0EeYbGyxt9hjggYW1vR5hMHFVXL4ZvjTA6XgCCAUnvacx_Dhbu1OGh8v5fCsCxXQnJ8iAIZDIgOAIeE55LUw"
  
  if(localStorage.token) {
  
    const token = localStorage.getItem("token");
 
    const decode = JWT_DECODE(token);
    const currentTime = Date.now() / 1000;
    

    if (decode.exp < currentTime) {
        localStorage.clear();
        
        console.log('Time Expired');
    } 
     /* localStorage.clear(); */
    
  }
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
