import "../styles/globals.css";
import { ThemeProvider } from "theme-ui";
import theme from "@hackclub/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
