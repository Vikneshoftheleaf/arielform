// pages/_app.js
import { AuthContextProvider } from "../context/auth-context";
function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      
        <Component {...pageProps} />
      </AuthContextProvider>
  );
}

export default MyApp;